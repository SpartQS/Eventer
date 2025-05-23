import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from '@/pages/StartPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const App = () => {
  return (
    <BrowserRouter>
      <main style={{ padding: '1rem' }}>
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<StartPage />} />

          {/* Профиль */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Страница "О нас" */}
          <Route path="/about" element={<AboutPage />} />

          {/* Страница контактов */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Редирект на главную страницу, если маршрут не найден */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};