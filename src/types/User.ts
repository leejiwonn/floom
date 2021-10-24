export type UserProvider = 'kakao';

export type UserSimple = {
  id: number;
  username?: string;
  displayName?: string;
};

export type User = UserSimple & {
  profileId: string;
  provider: UserProvider;
  providerAccessToken: string;
  providerRefreshToken: string;
  authToken: string;
  email?: string;
};
