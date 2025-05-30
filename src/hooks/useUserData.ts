import { useKeycloak } from "@react-keycloak/web";

export interface UserData {
    name: string;
    email: string;
    avatar?: string;
    id: string;
    roles: string[];
    firstName?: string;
    lastName?: string;
    username?: string;
}

export function useUserData() {
    const { keycloak } = useKeycloak();

    const userData: UserData = {
        name: keycloak.tokenParsed?.name || '',
        email: keycloak.tokenParsed?.email || '',
        id: keycloak.tokenParsed?.sub || '',
        roles: keycloak.tokenParsed?.realm_access?.roles || [],
        firstName: keycloak.tokenParsed?.given_name || '',
        lastName: keycloak.tokenParsed?.family_name || '',
        username: keycloak.tokenParsed?.preferred_username || '',
    };

    return userData;
} 