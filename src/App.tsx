import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Dashbord from './components/home';
import Form from './components/form';
import Single from './components/singleItem';
import i18n from '@/utils/i18n';
import Header from './components/blocks/header';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/form" element={<Form />} />
          <Route path="/details/:id" element={<Single />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;
