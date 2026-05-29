import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import TripDetailPage from './pages/TripDetailPage';
import TripOverviewPage from './pages/TripOverviewPage';
import ExpensePage from './pages/ExpensePage';
import LoginPage from './pages/LoginPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="app">
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trip/:id" element={<TripDetailPage />} />
              <Route path="/trip/:id/overview" element={<TripOverviewPage />} />
              <Route path="/trip/:id/expenses" element={<ExpensePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
