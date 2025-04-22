import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
// import { useTranslation } from '../hooks/useTranslation';
import { useApi } from '../hooks/useApi';
import { Complaint } from '../types';
import Layout from '../components/Layout/Layout';
import ComplaintCard from '../components/UI/ComplaintCard';
import ReplyList from '../components/UI/ReplyList';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const ComplaintDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useStore();
  // const { t } = useTranslation();
  const { loading, error, getComplaintById } = useApi();

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      if (!id) return;

      try {
        const data = await getComplaintById(id);
        if (data) {
          setComplaint(data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching complaint:', err);
      }
    };

    fetchComplaint();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className={`max-w-3xl mx-auto rounded-lg p-4 ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'} flex items-center`}>
            <AlertTriangle className={`mr-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`} size={24} />
            <p className={theme === 'dark' ? 'text-red-300' : 'text-red-700'}>
              {error}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !complaint) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Complaint Not Found
            </h1>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              The complaint you're looking for doesn't exist or may have been removed.
            </p>
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className={`inline-flex items-center text-sm ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to all complaints
            </Link>
          </div>

          {/* Complaint details */}
          <ComplaintCard complaint={complaint} isDetailView={true} />

          {/* Replies section */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } rounded-b-lg shadow p-6 mb-6`}>
            <ReplyList complaintId={complaint.id} replies={complaint.replies} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComplaintDetailPage;
