import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from '@/pages/StartPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { MainLayout } from '@/components/layouts/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная страница без сайдбара */}
        <Route path="/" element={<StartPage />} />

        {/* Страницы с сайдбаром */}
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Редирект на главную страницу, если маршрут не найден */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};