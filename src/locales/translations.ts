import { Language } from '../types';

type TranslationTree = {
  [key: string]: TranslationTree | Partial<Record<Language, string>>;
};

const translations: TranslationTree = {
  common: {
    appName: {
      en: 'VoiceLanka',
      si: 'හඬලංකා',
      ta: 'குரல்லங்கா'
    },
    submit: {
      en: 'Submit',
      si: 'ඉදිරිපත් කරන්න',
      ta: 'சமர்ப்பி'
    },
    cancel: {
      en: 'Cancel',
      si: 'අවලංගු කරන්න',
      ta: 'ரத்து செய்'
    },
    vote: {
      en: 'Vote',
      si: 'ඡන්දය',
      ta: 'வாக்களி'
    },
    reply: {
      en: 'Reply',
      si: 'පිළිතුරු',
      ta: 'பதில்'
    },
    loading: {
      en: 'Loading...',
      si: 'පූරණය වෙමින්...',
      ta: 'ஏற்றுகிறது...'
    },
    error: {
      en: 'Error',
      si: 'දෝෂය',
      ta: 'பிழை'
    },
    success: {
      en: 'Success',
      si: 'සාර්ථකයි',
      ta: 'வெற்றி'
    },
    viewAll: {
      en: 'View All',
      si: 'සියල්ල බලන්න',
      ta: 'அனைத்தையும் காண்க'
    },
    approve: {
      en: 'Approve',
      si: 'අනුමත කරන්න',
      ta: 'அங்கீகரிக்க'
    },
    reject: {
      en: 'Reject',
      si: 'ප්‍රතික්ෂේප කරන්න',
      ta: 'நிராகரிக்க'
    },
    status: {
      pending: {
        en: 'Pending',
        si: 'අපේක්ෂිත',
        ta: 'நிலுவையில்'
      },
      approved: {
        en: 'Approved',
        si: 'අනුමත',
        ta: 'அங்கீகரிக்கப்பட்டது'
      },
      rejected: {
        en: 'Rejected',
        si: 'ප්‍රතික්ෂේප',
        ta: 'நிராகரிக்கப்பட்டது'
      }
    }
  },
  navigation: {
    home: {
      en: 'Home',
      si: 'මුල් පිටුව',
      ta: 'முகப்பு'
    },
    submit: {
      en: 'Submit Complaint',
      si: 'පැමිණිල්ලක් ඉදිරිපත් කරන්න',
      ta: 'புகார் சமர்ப்பிக்க'
    },
    admin: {
      en: 'Admin',
      si: 'පරිපාලක',
      ta: 'நிர்வாகி'
    }
  },
  home: {
    title: {
      en: 'Anonymous Complaints Platform',
      si: 'නිර්නාමික පැමිණිලි වේදිකාව',
      ta: 'அநாமதேய புகார் தளம்'
    },
    subtitle: {
      en: 'Report issues anonymously and make your voice heard',
      si: 'නිර්නාමිකව ගැටළු වාර්තා කර ඔබේ හඬ අසන්න සලසන්න',
      ta: 'அநாமதேயமாக சிக்கல்களைப் புகாரளிக்கவும், உங்கள் குரலைக் கேட்கச் செய்யவும்'
    },
    categories: {
      en: 'Categories',
      si: 'වර්ගීකරණය',
      ta: 'வகைகள்'
    },
    latest: {
      en: 'Latest Complaints',
      si: 'නවතම පැමිණිලි',
      ta: 'சமீபத்திய புகார்கள்'
    },
    trending: {
      en: 'Trending',
      si: 'ජනප්‍රිය',
      ta: 'பிரபலமானவை'
    },
    noComplaints: {
      en: 'No complaints found',
      si: 'පැමිණිලි හමු නොවීය',
      ta: 'புகார்கள் எதுவும் கிடைக்கவில்லை'
    }
  },
  submit: {
    title: {
      en: 'Submit a Complaint',
      si: 'පැමිණිල්ලක් ඉදිරිපත් කරන්න',
      ta: 'புகார் சமர்ப்பிக்க'
    },
    form: {
      title: {
        label: {
          en: 'Title',
          si: 'මාතෘකාව',
          ta: 'தலைப்பு'
        },
        placeholder: {
          en: 'Brief description of the issue',
          si: 'ගැටළුවේ කෙටි විස්තරය',
          ta: 'சிக்கலின் சுருக்கமான விளக்கம்'
        }
      },
      description: {
        label: {
          en: 'Description',
          si: 'විස්තරය',
          ta: 'விளக்கம்'
        },
        placeholder: {
          en: 'Provide details about the issue',
          si: 'ගැටළුව පිළිබඳ විස්තර සපයන්න',
          ta: 'சிக்கல் பற்றிய விவரங்களை வழங்கவும்'
        }
      },
      location: {
        label: {
          en: 'Location',
          si: 'ස්ථානය',
          ta: 'இடம்'
        },
        placeholder: {
          en: 'Where did this occur?',
          si: 'මෙය සිදු වූයේ කොහේද?',
          ta: 'இது எங்கே நடந்தது?'
        }
      },
      isGovernment: {
        label: {
          en: 'Is this a government-related issue?',
          si: 'මෙය රජයට අදාළ ගැටළුවක්ද?',
          ta: 'இது அரசாங்கம் தொடர்பான சிக்கலா?'
        }
      },
      department: {
        label: {
          en: 'Government Department',
          si: 'රාජ්‍ය දෙපාර්තමේන්තුව',
          ta: 'அரசு துறை'
        },
        placeholder: {
          en: 'Select department',
          si: 'දෙපාර්තමේන්තුව තෝරන්න',
          ta: 'துறையைத் தேர்ந்தெடுக்கவும்'
        }
      },
      category: {
        label: {
          en: 'Category',
          si: 'ප්‍රවර්ගය',
          ta: 'வகை'
        },
        placeholder: {
          en: 'Select category',
          si: 'ප්‍රවර්ගය තෝරන්න',
          ta: 'வகையைத் தேர்ந்தெடுக்கவும்'
        }
      },
      photos: {
        label: {
          en: 'Photos (max 4)',
          si: 'ඡායාරූප (උපරිම 4)',
          ta: 'புகைப்படங்கள் (அதிகபட்சம் 4)'
        },
        add: {
          en: 'Add photo',
          si: 'ඡායාරූපය එක් කරන්න',
          ta: 'புகைப்படம் சேர்க்க'
        }
      },
      language: {
        label: {
          en: 'Complaint Language',
          si: 'පැමිණිලි භාෂාව',
          ta: 'புகார் மொழி'
        }
      },
      submit: {
        en: 'Submit Anonymously',
        si: 'නිර්නාමිකව ඉදිරිපත් කරන්න',
        ta: 'அநாமதேயமாக சமர்ப்பிக்கவும்'
      },
      success: {
        en: 'Your complaint has been submitted and is pending review',
        si: 'ඔබගේ පැමිණිල්ල ඉදිරිපත් කර ඇති අතර සමාලෝචනය සඳහා බලා සිටී',
        ta: 'உங்கள் புகார் சமர்ப்பிக்கப்பட்டு மதிப்பாய்வு நிலுவையில் உள்ளது'
      }
    }
  },
  details: {
    votes: {
      en: 'Votes',
      si: 'ඡන්ද',
      ta: 'வாக்குகள்'
    },
    replies: {
      en: 'Replies',
      si: 'පිළිතුරු',
      ta: 'பதில்கள்'
    },
    noReplies: {
      en: 'No replies yet',
      si: 'තවම පිළිතුරු නැත',
      ta: 'இதுவரை பதில்கள் இல்லை'
    },
    addReply: {
      en: 'Add a reply',
      si: 'පිළිතුරක් එක් කරන්න',
      ta: 'பதிலைச் சேர்க்கவும்'
    },
    replyPlaceholder: {
      en: 'Write your reply here',
      si: 'ඔබේ පිළිතුර මෙහි ලියන්න',
      ta: 'உங்கள் பதிலை இங்கே எழுதுங்கள்'
    }
  },
  admin: {
    title: {
      en: 'Admin Dashboard',
      si: 'පරිපාලක උපකරණ පුවරුව',
      ta: 'நிர்வாக டாஷ்போர்டு'
    },
    pendingReview: {
      en: 'Complaints Pending Review',
      si: 'සමාලෝචනය සඳහා පැමිණිලි',
      ta: 'மதிப்பாய்வு நிலுவையில் உள்ள புகார்கள்'
    },
    approveSuccess: {
      en: 'Complaint approved successfully',
      si: 'පැමිණිල්ල සාර්ථකව අනුමත කරන ලදී',
      ta: 'புகார் வெற்றிகரமாக அங்கீகரிக்கப்பட்டது'
    },
    rejectSuccess: {
      en: 'Complaint rejected successfully',
      si: 'පැමිණිල්ල සාර්ථකව ප්‍රතික්ෂේප කරන ලදී',
      ta: 'புகார் வெற்றிகரமாக நிராகரிக்கப்பட்டது'
    }
  }
};

export default translations;