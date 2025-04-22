import { useState } from 'react';
import { Complaint, Reply, ComplaintStatus } from '../types';
import { useStore } from '../store/useStore';

/**
 * Custom hook for API operations that simulates backend functionality
 * 
 * In a real application, this would connect to a backend API
 * Currently this uses the Zustand store as a simulation
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const store = useStore();
  
  // Simulate async behavior
  const simulateAsync = async <T>(callback: () => T): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = callback();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Get all complaints
   * @returns All complaints (filtered by status for non-admin users)
   */
  const getComplaints = async (): Promise<Complaint[]> => {
    return simulateAsync(() => {
      const { complaints, user } = store;
      // Only show approved complaints to regular users
      return user.role === 'admin' 
        ? complaints 
        : complaints.filter(complaint => complaint.status === 'approved');
    });
  };
  
  /**
   * Get complaints by status
   * @param status - The status to filter by
   * @returns Filtered complaints
   */
  const getComplaintsByStatus = async (status: ComplaintStatus): Promise<Complaint[]> => {
    return simulateAsync(() => {
      const { complaints } = store;
      return complaints.filter(complaint => complaint.status === status);
    });
  };
  
  /**
   * Get a single complaint by ID
   * @param id - Complaint ID
   * @returns The complaint or null if not found
   */
  const getComplaintById = async (id: string): Promise<Complaint | null> => {
    return simulateAsync(() => {
      const { complaints, user } = store;
      const complaint = complaints.find(c => c.id === id);
      
      // Ensure non-admin users can only see approved complaints
      if (!complaint || (user.role !== 'admin' && complaint.status !== 'approved')) {
        return null;
      }
      
      return complaint;
    });
  };
  
  /**
   * Submit a new complaint
   * @param complaintData - Complaint data
   * @returns The created complaint
   */
  const submitComplaint = async (
    complaintData: Omit<Complaint, 'id' | 'createdAt' | 'status' | 'votes' | 'replies'>
  ): Promise<Complaint> => {
    return simulateAsync(() => {
      store.addComplaint(complaintData);
      // Get the last complaint (the one we just added)
      return store.complaints[store.complaints.length - 1];
    });
  };
  
  /**
   * Vote on a complaint
   * @param id - Complaint ID
   * @param increment - True to upvote, false to downvote
   */
  const voteOnComplaint = async (id: string, increment: boolean): Promise<void> => {
    return simulateAsync(() => {
      store.voteComplaint(id, increment);
    });
  };
  
  /**
   * Add a reply to a complaint
   * @param complaintId - Complaint ID
   * @param content - Reply content
   * @returns The created reply
   */
  const addReplyToComplaint = async (
    complaintId: string, 
    content: string
  ): Promise<Reply> => {
    return simulateAsync(() => {
      store.addReply(complaintId, content);
      // Get the complaint
      const complaint = store.complaints.find(c => c.id === complaintId);
      if (!complaint) {
        throw new Error('Complaint not found');
      }
      // Get the last reply (the one we just added)
      return complaint.replies[complaint.replies.length - 1];
    });
  };
  
  /**
   * Vote on a reply
   * @param complaintId - Complaint ID
   * @param replyId - Reply ID
   * @param increment - True to upvote, false to downvote
   */
  const voteOnReply = async (
    complaintId: string, 
    replyId: string, 
    increment: boolean
  ): Promise<void> => {
    return simulateAsync(() => {
      store.voteReply(complaintId, replyId, increment);
    });
  };
  
  /**
   * Approve a complaint (admin only)
   * @param id - Complaint ID
   */
  const approveComplaint = async (id: string): Promise<void> => {
    return simulateAsync(() => {
      const { user } = store;
      if (user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can approve complaints');
      }
      store.approveComplaint(id);
    });
  };
  
  /**
   * Reject a complaint (admin only)
   * @param id - Complaint ID
   */
  const rejectComplaint = async (id: string): Promise<void> => {
    return simulateAsync(() => {
      const { user } = store;
      if (user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can reject complaints');
      }
      store.rejectComplaint(id);
    });
  };
  
  return {
    loading,
    error,
    getComplaints,
    getComplaintsByStatus,
    getComplaintById,
    submitComplaint,
    voteOnComplaint,
    addReplyToComplaint,
    voteOnReply,
    approveComplaint,
    rejectComplaint
  };
};