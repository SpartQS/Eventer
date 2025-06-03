export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    ORGANAIZER: 'ORGANAIZER',
} as const;

export const ROLE_ACCESS = {
    [ROLES.USER]: [
        '/profile',
        '/allevents',
        '/myevents',
        '/certificates'
    ],
    [ROLES.ADMIN]: [
        '/profile',
        '/allevents',
        '/myevents',
        '/certificates',
        '/dashboard',
        '/create-event',
        '/admin'
    ],
    [ROLES.ORGANAIZER]: [
        '/profile',
        '/dashboard',
        '/createevent'
    ]
} as const; 