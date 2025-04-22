export type Language = 'en' | 'si' | 'ta';

export type Theme = 'light' | 'dark';

export type ComplaintStatus = 'pending' | 'approved' | 'rejected';

export type Department = 
  | 'health' 
  | 'education' 
  | 'transport' 
  | 'police' 
  | 'local-government' 
  | 'finance' 
  | 'other';

export type Category =
  | 'infrastructure'
  | 'corruption'
  | 'public-service'
  | 'environment'
  | 'safety'
  | 'discrimination'
  | 'other';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  isGovernment: boolean;
  department?: Department;
  category?: Category;
  photos: string[];
  status: ComplaintStatus;
  createdAt: string;
  votes: number;
  replies: Reply[];
  language: Language;
}

export interface Reply {
  id: string;
  complaintId: string;
  content: string;
  createdAt: string;
  votes: number;
}

export interface User {
  role: 'user' | 'admin';
}