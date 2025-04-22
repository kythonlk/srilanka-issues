import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Language } from '../../types';
import { languageNames } from '../../data/mockData';

const Header: React.FC = () => {
  const { theme, setTheme, language, setLanguage, user } = useStore();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <span className={`font-bold text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {t('common.appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors duration-200 ${
                location.pathname === '/' 
                  ? (theme === 'dark' ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium') 
                  : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
              }`}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/submit" 
              className={`transition-colors duration-200 ${
                location.pathname === '/submit' 
                  ? (theme === 'dark' ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium') 
                  : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
              }`}
            >
              {t('navigation.submit')}
            </Link>
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`transition-colors duration-200 ${
                  location.pathname === '/admin' 
                    ? (theme === 'dark' ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium') 
                    : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                {t('navigation.admin')}
              </Link>
            )}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}
                aria-label="Change language"
              >
                <Globe size={20} />
              </button>
              
              {isLanguageMenuOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === lang 
                          ? (theme === 'dark' ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600') 
                          : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                      }`}
                    >
                      {languageNames[lang][language]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Switcher */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`md:hidden py-4 space-y-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <Link 
              to="/" 
              className={`block py-2 px-4 ${
                location.pathname === '/' 
                  ? (theme === 'dark' ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium') 
                  : (theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/submit" 
              className={`block py-2 px-4 ${
                location.pathname === '/submit' 
                  ? (theme === 'dark' ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium') 
                  : (theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.submit')}
            </Link>
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`block py-2 px-4 ${
                  location.pathname === '/admin' 
                    ? (theme === 'dark' ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium') 
                    : (theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.admin')}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;