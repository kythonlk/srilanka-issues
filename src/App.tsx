import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubmitComplaintPage from './pages/SubmitComplaintPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitComplaintPage />} />
        <Route path="/complaint/:id" element={<ComplaintDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
