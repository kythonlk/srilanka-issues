import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useStore();
  
  // Update document theme class when theme changes
  useEffect(() => {
    // Remove both theme classes and add the current one
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    
    // Also set data-theme attribute for any components that use it
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;