import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Complaint } from '../../types';
import { ChevronUp, ChevronDown, MessageSquare, MapPin, Calendar } from 'lucide-react';
import { departments, categories } from '../../data/mockData';

interface ComplaintCardProps {
  complaint: Complaint;
  isDetailView?: boolean;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, isDetailView = false }) => {
  const { theme, voteComplaint } = useStore();
  const { t, language } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language === 'si' ? 'si-LK' : 'ta-LK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const handleVote = (increment: boolean) => {
    voteComplaint(complaint.id, increment);
  };
  
  // Get category or department name in the current language
  const getCategoryOrDepartmentName = () => {
    if (complaint.isGovernment && complaint.department) {
      return departments[complaint.department][language];
    } else if (!complaint.isGovernment && complaint.category) {
      return categories[complaint.category][language];
    }
    return '';
  };
  
  return (
    <div 
      className={`${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} 
      ${!isDetailView ? 'rounded-lg shadow transition-all duration-200 transform hover:-translate-y-1' : ''}
      ${isDetailView ? 'rounded-t-lg shadow-md' : 'shadow'}`}
    >
      {/* Card Header - Category/Department tag and Date */}
      <div className="px-4 pt-4 flex justify-between items-center">
        <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          complaint.isGovernment 
            ? (theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800') 
            : (theme === 'dark' ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800')
        }`}>
          {getCategoryOrDepartmentName()}
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={14} className="mr-1" />
          {formatDate(complaint.createdAt)}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="px-4 pt-3 pb-4">
        {/* Title */}
        {isDetailView ? (
          <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {complaint.title}
          </h1>
        ) : (
          <Link to={`/complaint/${complaint.id}`}>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:underline`}>
              {complaint.title}
            </h2>
          </Link>
        )}
        
        {/* Location */}
        <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={16} className="mr-1" />
          {complaint.location}
        </div>
        
        {/* Description - truncated in list view */}
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} ${!isDetailView && 'line-clamp-3'}`}>
          {complaint.description}
        </p>
        
        {/* Photos grid - displayed only if there are photos */}
        {complaint.photos.length > 0 && (
          <div className={`grid ${complaint.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mb-4`}>
            {complaint.photos.map((photo, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded">
                <img 
                  src={photo} 
                  alt={`Photo ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Card Footer - Voting and Replies Count */}
        <div className="flex items-center justify-between mt-2">
          {/* Voting controls */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => handleVote(true)}
              className={`p-1 rounded-full transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              aria-label="Upvote"
            >
              <ChevronUp size={20} className={theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} />
            </button>
            <span className={`font-medium ${complaint.votes > 0 ? 'text-green-500' : complaint.votes < 0 ? 'text-red-500' : ''}`}>
              {complaint.votes}
            </span>
            <button 
              onClick={() => handleVote(false)}
              className={`p-1 rounded-full transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              aria-label="Downvote"
            >
              <ChevronDown size={20} className={theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} />
            </button>
          </div>
          
          {/* Replies counter with link */}
          {!isDetailView && (
            <Link 
              to={`/complaint/${complaint.id}`}
              className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <MessageSquare size={16} className="mr-1" />
              {complaint.replies.length} {t('details.replies')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;