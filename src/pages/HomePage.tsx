import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { useApi } from '../hooks/useApi';
import { Complaint, Department, Category } from '../types';
import Layout from '../components/Layout/Layout';
import ComplaintCard from '../components/UI/ComplaintCard';
import CategoryFilter from '../components/UI/CategoryFilter';
import { AlertTriangle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { theme } = useStore();
  const { t } = useTranslation();
  const { loading, error, getComplaints } = useApi();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showGovernment, setShowGovernment] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getComplaints();
        setComplaints(data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on selected filters
  const filteredComplaints = complaints.filter(complaint => {
    // Filter by government/non-government
    if (showGovernment && !complaint.isGovernment) return false;
    if (!showGovernment && complaint.isGovernment) return false;

    // Filter by department (if showing government complaints)
    if (showGovernment && selectedDepartment && complaint.department !== selectedDepartment) return false;

    // Filter by category (if showing non-government complaints)
    if (!showGovernment && selectedCategory && complaint.category !== selectedCategory) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        complaint.title.toLowerCase().includes(query) ||
        complaint.description.toLowerCase().includes(query) ||
        complaint.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {t('home.title')}
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.subtitle')}
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full max-w-md px-4 py-3 rounded-lg shadow-sm ${theme === 'dark'
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                  : 'bg-white text-gray-800 placeholder-gray-400 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('home.categories')}
          </h2>

          {/* Category/Department filters */}
          <CategoryFilter
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showGovernment={showGovernment}
            setShowGovernment={setShowGovernment}
          />

          {/* Complaints grid */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'} flex items-center`}>
              <AlertTriangle className={`mr-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`} />
              <p className={theme === 'dark' ? 'text-red-300' : 'text-red-700'}>
                {error}
              </p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <p className="text-lg">{t('home.noComplaints')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComplaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
