export type UserProvider = 'kakao';

export interface User {
  id: string;
  provider: UserProvider;
  providerAccessToken: string;
  providerRefreshToken: string;
  authToken: string;
  username?: string;
  displayName?: string;
  email?: string;
}
