import React from 'react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';

const Footer: React.FC = () => {
  const { theme } = useStore();
  const { t } = useTranslation();
  
  return (
    <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'} transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">{t('common.appName')}</span>
            <p className="text-sm mt-2">© {new Date().getFullYear()} {t('common.appName')}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-medium mb-2">Resources</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className={`hover:${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={`hover:${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className={`hover:${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Contact</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className={`hover:${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={`hover:${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className={`hover:${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors`}>
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-xs text-center">
          <p>
            This platform is intended for legitimate complaints. All submissions are reviewed before being published.
            Abuse of this platform may be reported to authorities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;