import React from 'react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Department, Category } from '../../types';
import { departments, categories } from '../../data/mockData';

interface CategoryFilterProps {
  selectedDepartment: Department | null;
  setSelectedDepartment: (department: Department | null) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  showGovernment: boolean;
  setShowGovernment: (show: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedCategory,
  setSelectedCategory,
  showGovernment,
  setShowGovernment
}) => {
  const { theme } = useStore();
  const { language } = useTranslation();
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => {
            setShowGovernment(true);
            setSelectedCategory(null);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            showGovernment
              ? (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
          }`}
        >
          Government
        </button>
        <button
          onClick={() => {
            setShowGovernment(false);
            setSelectedDepartment(null);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            !showGovernment
              ? (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
          }`}
        >
          Non-Government
        </button>
      </div>
      
      {showGovernment ? (
        // Government departments
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDepartment(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              selectedDepartment === null
                ? (theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
                : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            All Departments
          </button>
          
          {(Object.keys(departments) as Department[]).map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                selectedDepartment === dept
                  ? (theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
                  : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              {departments[dept][language]}
            </button>
          ))}
        </div>
      ) : (
        // Non-government categories
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              selectedCategory === null
                ? (theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') 
                : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            All Categories
          </button>
          
          {(Object.keys(categories) as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                selectedCategory === cat
                  ? (theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') 
                  : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              {categories[cat][language]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;