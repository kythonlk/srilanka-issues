import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { useApi } from '../hooks/useApi';
import { Complaint } from '../types';
import Layout from '../components/Layout/Layout';
import ComplaintCard from '../components/UI/ComplaintCard';
import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { theme, user } = useStore();
  const { t } = useTranslation();
  const { loading, error, getComplaintsByStatus, approveComplaint, rejectComplaint } = useApi();
  
  const [pendingComplaints, setPendingComplaints] = useState<Complaint[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  
  // Fetch pending complaints on mount
  useEffect(() => {
    const fetchPendingComplaints = async () => {
      try {
        const data = await getComplaintsByStatus('pending');
        setPendingComplaints(data);
      } catch (err) {
        console.error('Error fetching pending complaints:', err);
      }
    };
    
    fetchPendingComplaints();
  }, [getComplaintsByStatus]);
  
  // Only show admin page for admin users
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  const handleApproveComplaint = async (id: string) => {
    setSuccessMessage(null);
    setActionError(null);
    
    try {
      await approveComplaint(id);
      setPendingComplaints(pendingComplaints.filter(complaint => complaint.id !== id));
      setSuccessMessage(t('admin.approveSuccess'));
    } catch (err) {
      console.error('Error approving complaint:', err);
      setActionError(err instanceof Error ? err.message : 'Failed to approve complaint');
    }
  };
  
  const handleRejectComplaint = async (id: string) => {
    setSuccessMessage(null);
    setActionError(null);
    
    try {
      await rejectComplaint(id);
      setPendingComplaints(pendingComplaints.filter(complaint => complaint.id !== id));
      setSuccessMessage(t('admin.rejectSuccess'));
    } catch (err) {
      console.error('Error rejecting complaint:', err);
      setActionError(err instanceof Error ? err.message : 'Failed to reject complaint');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Shield className={`mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {t('admin.title')}
            </h1>
          </div>
          
          {/* Success and error messages */}
          {successMessage && (
            <div className={`mb-4 p-3 rounded-md ${
              theme === 'dark' ? 'bg-green-900/50 text-green-200' : 'bg-green-50 text-green-700'
            } flex items-center`}>
              <CheckCircle className="mr-2 flex-shrink-0" size={20} />
              <p>{successMessage}</p>
            </div>
          )}
          
          {actionError && (
            <div className={`mb-4 p-3 rounded-md ${
              theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-700'
            } flex items-center`}>
              <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
              <p>{actionError}</p>
            </div>
          )}
          
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('admin.pendingReview')}
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'} flex items-center`}>
              <AlertTriangle className={`mr-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`} />
              <p className={theme === 'dark' ? 'text-red-300' : 'text-red-700'}>
                {error}
              </p>
            </div>
          ) : pendingComplaints.length === 0 ? (
            <div className={`p-8 text-center border rounded-lg ${
              theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              <p className="text-lg mb-2">No complaints pending review</p>
              <p className="text-sm">All submitted complaints have been processed</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingComplaints.map(complaint => (
                <div key={complaint.id} className="border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                  <ComplaintCard complaint={complaint} />
                  <div className={`p-4 flex justify-end space-x-3 ${
                    theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'
                  }`}>
                    <button
                      onClick={() => handleRejectComplaint(complaint.id)}
                      className={`inline-flex items-center px-4 py-2 rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <XCircle size={18} className={`mr-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
                      {t('common.reject')}
                    </button>
                    <button
                      onClick={() => handleApproveComplaint(complaint.id)}
                      className={`inline-flex items-center px-4 py-2 rounded-md ${
                        theme === 'dark' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      } transition-colors`}
                    >
                      <CheckCircle size={18} className="mr-2 text-white" />
                      {t('common.approve')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;