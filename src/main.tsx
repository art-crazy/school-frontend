import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./shared/components/Layout";
import Home from "@/pages/Home";
import Policy from "@/pages/policy";
import OfferAgreementPage from "@/pages/offerAgreementPage";
import { YandexMetrika } from "@/shared/components/Yandex/YandexMetrika.tsx";
import { AuthProvider, useAuth } from '@/shared/context/AuthContext';
import AuthModal from '@/widgets/AuthModal/AuthModal';
import VerifyEmail from './pages/VerifyEmail';
import EmailVerification from './pages/EmailVerification';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

console.log('test rules 5')
const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthModeChange = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthProvider>
      <Router>
        <YandexMetrika/>
        <Layout onAuthModeChange={handleAuthModeChange}>
          <Routes>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/oferta" element={<OfferAgreementPage />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/methods" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/services" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/reviews" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/faq" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-verification" element={<EmailVerification />} />
          </Routes>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            initialMode={authMode}
          />
        </Layout>
      </Router>
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
