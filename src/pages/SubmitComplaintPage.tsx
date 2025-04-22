import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { useApi } from '../hooks/useApi';
import { Department, Category, Language } from '../types';
import Layout from '../components/Layout/Layout';
import PhotoUploader from '../components/UI/PhotoUploader';
import { departments, categories, languageNames } from '../data/mockData';
import { AlertCircle, CheckCircle } from 'lucide-react';

const SubmitComplaintPage: React.FC = () => {
  const { theme, language } = useStore();
  const { t } = useTranslation();
  const { loading, error, submitComplaint } = useApi();
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isGovernment, setIsGovernment] = useState(true);
  const [department, setDepartment] = useState<Department | ''>('');
  const [category, setCategory] = useState<Category | ''>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  
  // Success/error feedback
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Basic validation
    if (!title.trim() || !description.trim() || !location.trim()) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (isGovernment && !department) {
      setFormError('Please select a government department');
      return;
    }
    
    if (!isGovernment && !category) {
      setFormError('Please select a category');
      return;
    }
    
    try {
      await submitComplaint({
        title,
        description,
        location,
        isGovernment,
        department: isGovernment ? department as Department : undefined,
        category: !isGovernment ? category as Category : undefined,
        photos,
        language: selectedLanguage
      });
      
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setFormError(err instanceof Error ? err.message : 'Failed to submit complaint');
    }
  };
  
  if (success) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className={`max-w-lg mx-auto p-6 rounded-lg shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="text-green-500" size={48} />
            </div>
            <h2 className={`text-2xl font-bold text-center mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {t('common.success')}
            </h2>
            <p className={`text-center ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('submit.form.success')}
            </p>
            <div className="mt-6 text-center">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Redirecting to home page...
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('submit.title')}
          </h1>
          
          <form onSubmit={handleSubmit} className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-md p-6`}>
            {/* Show form errors */}
            {(formError || error) && (
              <div className={`mb-4 p-3 rounded-md ${
                theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-600'
              } flex items-center`}>
                <AlertCircle className="mr-2 flex-shrink-0" size={20} />
                <p>{formError || error}</p>
              </div>
            )}
            
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('submit.form.title.label')} *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('submit.form.title.placeholder')}
                required
                className={`w-full px-3 py-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                    : 'bg-white text-gray-800 placeholder-gray-400 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            
            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('submit.form.description.label')} *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('submit.form.description.placeholder')}
                required
                rows={5}
                className={`w-full px-3 py-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                    : 'bg-white text-gray-800 placeholder-gray-400 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            
            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('submit.form.location.label')} *
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('submit.form.location.placeholder')}
                required
                className={`w-full px-3 py-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                    : 'bg-white text-gray-800 placeholder-gray-400 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            
            {/* Government/Non-government toggle */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('submit.form.isGovernment.label')} *
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="government-yes"
                    name="isGovernment"
                    checked={isGovernment}
                    onChange={() => setIsGovernment(true)}
                    className={`mr-2 ${
                      theme === 'dark' ? 'text-blue-500' : 'text-blue-600'
                    }`}
                  />
                  <label htmlFor="government-yes" className={
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }>
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="government-no"
                    name="isGovernment"
                    checked={!isGovernment}
                    onChange={() => setIsGovernment(false)}
                    className={`mr-2 ${
                      theme === 'dark' ? 'text-blue-500' : 'text-blue-600'
                    }`}
                  />
                  <label htmlFor="government-no" className={
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }>
                    No
                  </label>
                </div>
              </div>
            </div>
            
            {/* Department (if government) */}
            {isGovernment && (
              <div className="mb-4">
                <label htmlFor="department" className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('submit.form.department.label')} *
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  required
                  className={`w-full px-3 py-2 rounded-md ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-800 border-gray-300'
                  } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">{t('submit.form.department.placeholder')}</option>
                  {(Object.keys(departments) as Department[]).map(dept => (
                    <option key={dept} value={dept}>
                      {departments[dept][language]}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Category (if non-government) */}
            {!isGovernment && (
              <div className="mb-4">
                <label htmlFor="category" className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('submit.form.category.label')} *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  required
                  className={`w-full px-3 py-2 rounded-md ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-800 border-gray-300'
                  } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">{t('submit.form.category.placeholder')}</option>
                  {(Object.keys(categories) as Category[]).map(cat => (
                    <option key={cat} value={cat}>
                      {categories[cat][language]}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Photos */}
            <div className="mb-4">
              <PhotoUploader 
                photos={photos}
                setPhotos={setPhotos}
                maxPhotos={4}
              />
            </div>
            
            {/* Language selection */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('submit.form.language.label')} *
              </label>
              <div className="flex space-x-4">
                {(Object.keys(languageNames) as Language[]).map(lang => (
                  <div key={lang} className="flex items-center">
                    <input
                      type="radio"
                      id={`lang-${lang}`}
                      name="language"
                      checked={selectedLanguage === lang}
                      onChange={() => setSelectedLanguage(lang)}
                      className={`mr-2 ${
                        theme === 'dark' ? 'text-blue-500' : 'text-blue-600'
                      }`}
                    />
                    <label htmlFor={`lang-${lang}`} className={
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }>
                      {languageNames[lang][language]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-md text-white font-medium ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition duration-150`}
              >
                {loading ? t('common.loading') : t('submit.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitComplaintPage;