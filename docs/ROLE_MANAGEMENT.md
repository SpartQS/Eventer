# Управление ролями пользователей

## Обзор

Система управления ролями в приложении Eventer была переработана для обеспечения правильной последовательности загрузки: сначала определяется роль пользователя, затем на основе этой роли собирается sidebar и другие компоненты интерфейса.

## Архитектура

### 1. Хук useUserRole

Основной хук для работы с ролями пользователей находится в `hooks/useUserRole.ts`:

```typescript
interface UseUserRoleReturn {
  userRole: string | null
  isRoleLoaded: boolean
  status: "loading" | "authenticated" | "unauthenticated"
  isAdmin: boolean
  isUser: boolean
  isOrganizer: boolean
}
```

**Особенности:**
- Дожидается полной загрузки роли пользователя
- Предоставляет булевы флаги для каждой роли
- Возвращает статус загрузки для UI

### 2. Определение ролей

Роли определяются в `app/config/roles.ts`:

```typescript
export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    ORGANAIZER: 'ORGANAIZER',
} as const;
```

### 3. Доступ к маршрутам

Каждой роли соответствует набор доступных маршрутов:

```typescript
export const ROLE_ACCESS = {
    [ROLES.USER]: [
        '/profile',
        '/allevents',
        '/myevents',
        '/certificates',
    ],
    [ROLES.ADMIN]: [
        '/profile',
        '/allevents',
        '/myevents',
        '/certificates',
        '/dashboard',
        '/createevent',
        '/eventdashboard',
        '/admin'
    ],
    [ROLES.ORGANAIZER]: [
        '/profile',
        '/dashboard',
        '/createevent'
    ]
} as const;
```

## Компоненты

### AppSidebar

Компонент sidebar теперь:
1. Дожидается определения роли пользователя
2. Показывает индикатор загрузки во время ожидания
3. Фильтрует пункты меню на основе роли
4. Отображает индикатор текущей роли

### RoleGuard

Компонент защиты маршрутов:
1. Использует хук `useUserRole` для получения роли
2. Проверяет доступ к текущему маршруту
3. Перенаправляет на `/profile` при отсутствии доступа

### RoleIndicator

Компонент отображения роли:
1. Показывает текущую роль пользователя
2. Использует разные иконки и цвета для каждой роли
3. Отображается в sidebar

## Последовательность загрузки

1. **Аутентификация**: Пользователь входит в систему через Keycloak
2. **Получение токена**: NextAuth получает JWT токен с информацией о роли
3. **Декодирование**: Токен декодируется для извлечения роли из `resource_access['fastapi-app'].roles[0]`
4. **Сохранение в сессии**: Роль сохраняется в session.role
5. **Загрузка UI**: Хук `useUserRole` дожидается определения роли
6. **Сборка sidebar**: AppSidebar собирается на основе определенной роли

## Использование

### В компонентах

```typescript
import { useUserRole } from "@/hooks/useUserRole"

function MyComponent() {
  const { userRole, isRoleLoaded, isAdmin, isUser, isOrganizer } = useUserRole()
  
  if (!isRoleLoaded) {
    return <div>Загрузка...</div>
  }
  
  if (isAdmin) {
    return <AdminPanel />
  }
  
  if (isUser) {
    return <UserPanel />
  }
  
  return <DefaultPanel />
}
```

### Защита маршрутов

```typescript
import { RoleGuard } from "@/components/role-guard"

export default function ProtectedPage() {
  return (
    <RoleGuard>
      <div>Защищенный контент</div>
    </RoleGuard>
  )
}
```

## Отладка

Для отладки ролей используются console.log в следующих местах:
- `lib/auth.ts` - декодирование токена
- `components/role-guard.tsx` - проверка доступа к маршрутам

Логи показывают:
- Декодированный токен
- Извлеченную роль
- Доступные маршруты для роли
- Результаты проверки доступа

## Безопасность

- Роли проверяются как на клиенте, так и на сервере
- Middleware обеспечивает базовую защиту маршрутов
- RoleGuard предоставляет дополнительную проверку на уровне компонентов
- Все проверки ролей происходят после полной загрузки данных пользователя 