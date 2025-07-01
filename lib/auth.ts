import KeycloakProvider from 'next-auth/providers/keycloak';
import { encrypt } from '@/app/utils/encryption';
import { refreshAccessToken } from '@/app/api/http/api';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const keycloakProviderOptions = {
  clientId: process.env.KEYCLOAK_CLIENT_ID!,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
  issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
};

export const authOptions = {
  providers: [KeycloakProvider(keycloakProviderOptions)],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      const current_timestamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      }

      if (current_timestamp < token.expires_at) {
        return token;
      }

      try {
        const refreshedToken = await refreshAccessToken(token.refresh_token);

        token.access_token = refreshedToken.access_token;
        token.id_token = refreshedToken.id_token;
        token.refresh_token = refreshedToken.refresh_token;
        token.expires_at = current_timestamp + refreshedToken.expires_in;

        return token;
      } catch (error) {
        console.error('Error refreshing access token', error);
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      const decoded = jwtDecode<JwtPayload>(token.access_token);
      
      console.log('=== Auth Debug ===');
      console.log('Decoded token:', decoded);
      console.log('Resource access:', decoded.resource_access);
      console.log('FastAPI app roles:', decoded.resource_access?.['fastapi-app']?.roles);

      // session.access_token = encrypt(token.access_token);
      session.access_token = token.access_token;
      session.id_token = encrypt(token.id_token);
      session.role = decoded.resource_access?.['fastapi-app']?.roles?.[0] || '';
      session.error = token.error;
      session.user_id = decoded.sub;

      console.log('Session role:', session.role);

      return session;
    },
  },
};