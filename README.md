# 🛡️ Next.js + Keycloak Starter

Этот проект — пример интеграции Keycloak с приложением на Next.js. Используется `next-auth` для упрощения работы с авторизацией и аутентификацией.

## 📦 Стек технологий

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Keycloak](https://www.keycloak.org/)
- [TypeScript](https://www.typescriptlang.org/) (опционально)

---

## 🚀 Быстрый старт

### 1. Клонируй репозиторий

```bash
git clone https://github.com/ibragimoov/next-keycloak
cd next-keycloak
```

### 2. Установка зависимостей

```bash
npm install
```

# или

```bash
yarn install
```

### 3. Настройка переменных окружения

Создайте файл .env.local в корне проекта на основе .env.example:

```bash
cp .env.example .env.local
```

Заполните .env.local соответствующими значениями:

```bash
# NEXT-AUTH
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# KEYCLOAK
KEYCLOAK_URL=
KEYCLOAK_REALM=
KEYCLOAK_CLIENT_ID=
KEYCLOAK_CLIENT_SECRET=
REFRESH_TOKEN_URL=/protocol/openid-connect/token
END_SESSION_URL=/protocol/openid-connect/logout
```

### 4. Запуск приложения

```bash
npm run dev
```

#### или

```bash
yarn dev
```

### Структура проекта

```bash
.
├── app
│   ├── api
│   │   ├── auth
│   │   │   ├── [...nextauth]/route.ts      # NextAuth Keycloak конфиг
│   │   │   └── logout/route.ts             # Обработка logout
│   │   ├── http/api.ts                     # Клиент для REST API
│   │   └── query-client.ts                 # Конфигурация QueryClient
│   ├── dashboard
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Главная страница
├── components
│   └── ui/                                 # UI-компоненты
├── constants
│   └── index.ts                            # Константы
├── lib
│   ├── auth.ts                             # Опции для next-auth с Keycloak
│   └── utils.ts
├── providers
│   ├── query-provider-wrapper.tsx         # React Query provider
│   └── session-provider-wrapper.tsx       # NextAuth session provider
├── utils
│   ├── encryption.ts                       # Утилиты для шифрования
│   └── session-token-accessor.ts           # Работа с токенами сессии
├── public
│   └── favicon.ico
├── styles
│   └── globals.css                         # Стили
```