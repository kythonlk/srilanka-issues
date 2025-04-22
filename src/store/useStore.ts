import { create } from 'zustand';
import { Language, Theme, Complaint, Reply, User, ComplaintStatus } from '../types';
import { mockComplaints } from '../data/mockData';

interface AppState {
  language: Language;
  theme: Theme;
  complaints: Complaint[];
  user: User;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status' | 'votes' | 'replies'>) => void;
  approveComplaint: (id: string) => void;
  rejectComplaint: (id: string) => void;
  voteComplaint: (id: string, increment: boolean) => void;
  addReply: (complaintId: string, content: string) => void;
  voteReply: (complaintId: string, replyId: string, increment: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  language: 'en' as Language,
  theme: 'light' as Theme,
  complaints: mockComplaints,
  user: { role: 'user' },
  
  setLanguage: (language: Language) => set({ language }),
  
  setTheme: (theme: Theme) => set({ theme }),
  
  addComplaint: (complaint) => set((state) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      votes: 0,
      replies: []
    };
    
    return { complaints: [...state.complaints, newComplaint] };
  }),
  
  approveComplaint: (id: string) => set((state) => ({
    complaints: state.complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, status: 'approved' as ComplaintStatus } 
        : complaint
    )
  })),
  
  rejectComplaint: (id: string) => set((state) => ({
    complaints: state.complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, status: 'rejected' as ComplaintStatus } 
        : complaint
    )
  })),
  
  voteComplaint: (id: string, increment: boolean) => set((state) => ({
    complaints: state.complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, votes: complaint.votes + (increment ? 1 : -1) } 
        : complaint
    )
  })),
  
  addReply: (complaintId: string, content: string) => set((state) => ({
    complaints: state.complaints.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            replies: [
              ...complaint.replies, 
              {
                id: Date.now().toString(),
                complaintId,
                content,
                createdAt: new Date().toISOString(),
                votes: 0
              }
            ] 
          } 
        : complaint
    )
  })),
  
  voteReply: (complaintId: string, replyId: string, increment: boolean) => set((state) => ({
    complaints: state.complaints.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            replies: complaint.replies.map(reply => 
              reply.id === replyId 
                ? { ...reply, votes: reply.votes + (increment ? 1 : -1) } 
                : reply
            ) 
          } 
        : complaint
    )
  }))
}));