import { Complaint, ComplaintStatus, Department, Category, Language } from '../types';

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Poor road conditions in Colombo',
    description: 'The roads in central Colombo are in terrible condition with potholes everywhere. This has been the case for months with no repairs.',
    location: 'Colombo Central',
    isGovernment: true,
    department: 'transport',
    photos: [
      'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
      'https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg'
    ],
    status: 'approved' as ComplaintStatus,
    createdAt: '2023-04-15T08:30:00Z',
    votes: 45,
    language: 'en' as Language,
    replies: [
      {
        id: '101',
        complaintId: '1',
        content: 'I face the same issue every day. It damages vehicles and causes accidents.',
        createdAt: '2023-04-15T10:15:00Z',
        votes: 12
      },
      {
        id: '102',
        complaintId: '1',
        content: 'The local government promised to fix this last year but nothing has been done.',
        createdAt: '2023-04-16T14:20:00Z',
        votes: 8
      }
    ]
  },
  {
    id: '2',
    title: 'Irregular garbage collection in Kandy',
    description: 'The garbage in our neighborhood hasn\'t been collected for two weeks. The area is starting to smell and it\'s attracting pests.',
    location: 'Kandy, Peradeniya Road',
    isGovernment: true,
    department: 'local-government',
    photos: [
      'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg'
    ],
    status: 'approved' as ComplaintStatus,
    createdAt: '2023-04-18T16:45:00Z',
    votes: 32,
    language: 'en' as Language,
    replies: [
      {
        id: '201',
        complaintId: '2',
        content: 'This is a health hazard. The local council needs to act immediately.',
        createdAt: '2023-04-19T09:30:00Z',
        votes: 7
      }
    ]
  },
  {
    id: '3',
    title: 'Unannounced water cuts in Negombo',
    description: 'We\'ve been experiencing water cuts almost daily without any prior announcement. This is causing significant disruption to daily life.',
    location: 'Negombo, Sea Street area',
    isGovernment: true,
    department: 'other',
    photos: [],
    status: 'approved' as ComplaintStatus,
    createdAt: '2023-04-20T11:20:00Z',
    votes: 28,
    language: 'en' as Language,
    replies: []
  },
  {
    id: '4',
    title: 'Privacy concerns with new CCTV installations',
    description: 'The new CCTV cameras installed in our residential area seem to be pointing directly into private homes. This is a serious privacy concern.',
    location: 'Dehiwala',
    isGovernment: false,
    category: 'safety',
    photos: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg'
    ],
    status: 'pending' as ComplaintStatus,
    createdAt: '2023-04-21T14:10:00Z',
    votes: 15,
    language: 'en' as Language,
    replies: []
  },
  {
    id: '5',
    title: 'Harassment at government office',
    description: 'I experienced harassment when trying to get my documents processed at the passport office. The officials demanded extra payments to expedite the process.',
    location: 'Battaramulla, Passport Office',
    isGovernment: true,
    department: 'other',
    photos: [],
    status: 'pending' as ComplaintStatus,
    createdAt: '2023-04-22T09:50:00Z',
    votes: 37,
    language: 'en' as Language,
    replies: []
  }
];

export const departments: Record<Department, { en: string; si: string; ta: string }> = {
  'health': {
    en: 'Health',
    si: 'සෞඛ්‍ය',
    ta: 'சுகாதாரம்'
  },
  'education': {
    en: 'Education',
    si: 'අධ්‍යාපන',
    ta: 'கல்வி'
  },
  'transport': {
    en: 'Transport',
    si: 'ප්‍රවාහන',
    ta: 'போக்குவரத்து'
  },
  'police': {
    en: 'Police',
    si: 'පොලිස්',
    ta: 'காவல்துறை'
  },
  'local-government': {
    en: 'Local Government',
    si: 'පළාත් පාලන',
    ta: 'உள்ளாட்சி'
  },
  'finance': {
    en: 'Finance',
    si: 'මුදල්',
    ta: 'நிதி'
  },
  'other': {
    en: 'Other',
    si: 'වෙනත්',
    ta: 'மற்றவை'
  }
};

export const categories: Record<Category, { en: string; si: string; ta: string }> = {
  'infrastructure': {
    en: 'Infrastructure',
    si: 'යටිතල පහසුකම්',
    ta: 'உட்கட்டமைப்பு'
  },
  'corruption': {
    en: 'Corruption',
    si: 'දූෂණය',
    ta: 'ஊழல்'
  },
  'public-service': {
    en: 'Public Service',
    si: 'පොදු සේවා',
    ta: 'பொதுச் சேவை'
  },
  'environment': {
    en: 'Environment',
    si: 'පරිසරය',
    ta: 'சுற்றுச்சூழல்'
  },
  'safety': {
    en: 'Safety',
    si: 'ආරක්ෂාව',
    ta: 'பாதுகாப்பு'
  },
  'discrimination': {
    en: 'Discrimination',
    si: 'වෙනස්කම්',
    ta: 'பாகுபாடு'
  },
  'other': {
    en: 'Other',
    si: 'වෙනත්',
    ta: 'மற்றவை'
  }
};

export const languageNames = {
  'en': {
    en: 'English',
    si: 'ඉංග්‍රීසි',
    ta: 'ஆங்கிலம்'
  },
  'si': {
    en: 'Sinhala',
    si: 'සිංහල',
    ta: 'சிங்களம்'
  },
  'ta': {
    en: 'Tamil',
    si: 'දෙමළ',
    ta: 'தமிழ்'
  }
};