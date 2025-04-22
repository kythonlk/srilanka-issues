import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Reply } from '../../types';
import { ChevronUp, ChevronDown, User } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

interface ReplyListProps {
  complaintId: string;
  replies: Reply[];
}

const ReplyList: React.FC<ReplyListProps> = ({ complaintId, replies }) => {
  const { theme } = useStore();
  const { t } = useTranslation();
  const { loading, error, addReplyToComplaint, voteOnReply } = useApi();
  const [replyText, setReplyText] = useState('');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (replyText.trim() === '') return;
    
    try {
      await addReplyToComplaint(complaintId, replyText);
      setReplyText('');
    } catch (err) {
      console.error('Failed to add reply:', err);
    }
  };
  
  const handleVote = async (replyId: string, increment: boolean) => {
    try {
      await voteOnReply(complaintId, replyId, increment);
    } catch (err) {
      console.error('Failed to vote on reply:', err);
    }
  };
  
  return (
    <div className="mt-6">
      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {t('details.replies')} ({replies.length})
      </h3>
      
      {/* Add reply form */}
      <form onSubmit={handleSubmitReply} className="mb-6">
        <div className="mb-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={t('details.replyPlaceholder')}
            className={`w-full p-3 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-white text-gray-800 placeholder-gray-400 border-gray-300'
            } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || replyText.trim() === ''}
          className={`px-4 py-2 rounded-md font-medium text-white ${
            loading || replyText.trim() === '' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } transition duration-150`}
        >
          {loading ? t('common.loading') : t('common.reply')}
        </button>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </form>
      
      {/* Replies list */}
      {replies.length === 0 ? (
        <p className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('details.noReplies')}
        </p>
      ) : (
        <div className="space-y-4">
          {replies.map((reply) => (
            <div 
              key={reply.id} 
              className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-start">
                {/* Anonymous user icon */}
                <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <User size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                </div>
                
                <div className="flex-1">
                  {/* Reply metadata */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Anonymous
                      </span>
                      <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                    
                    {/* Voting controls */}
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => handleVote(reply.id, true)}
                        className={`p-1 rounded-full transition-colors ${
                          theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                        }`}
                        aria-label="Upvote reply"
                      >
                        <ChevronUp size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} />
                      </button>
                      <span className={`text-sm font-medium ${reply.votes > 0 ? 'text-green-500' : reply.votes < 0 ? 'text-red-500' : ''}`}>
                        {reply.votes}
                      </span>
                      <button 
                        onClick={() => handleVote(reply.id, false)}
                        className={`p-1 rounded-full transition-colors ${
                          theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                        }`}
                        aria-label="Downvote reply"
                      >
                        <ChevronDown size={16} className={theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Reply content */}
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {reply.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReplyList;