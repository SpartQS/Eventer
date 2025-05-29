import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from '@/pages/StartPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { MainLayout } from '@/components/layouts/MainLayout';
import EventsPage from '@/pages/EventsPage';
import CertificatesPage from '@/pages/CertificatesPage';
import MyEvents from '@/pages/MyEvents';
import CreateEvent from '@/pages/CreateEvent';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from './auth/keycloak';
import { ProtectedRoute } from '@/auth/ProtectedRoute';

export const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ flow: 'standard', onLoad: 'check-sso', pkceMethod: 'S256', checkLoginIframe: false }}>
      <BrowserRouter>
        <Routes>
          {/* Открытые маршруты */}
          <Route path="/" element={<StartPage />} />

          {/* Защищенные маршруты */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/create-event" element={<CreateEvent />} />
            </Route>
          </Route>

          {/* Редирект на главную страницу, если маршрут не найден */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};