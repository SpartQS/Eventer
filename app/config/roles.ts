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
        '/certificates',
        '/eventdashboard', // del
        'createevent' // del
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