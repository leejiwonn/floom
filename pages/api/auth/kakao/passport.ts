/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reflect-metadata';
import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { createAuthToken } from '~/server/auth';
import { findUserByProfileId, saveUser } from '~/server/db';
import { UserEntity } from '~/server/entities/UserEntity';
import { UserProvider } from '~/types/User';

const callbackURL =
  process.env.NODE_ENV === 'production'
    ? 'https://floom.vercel.app/api/auth/kakao/callback'
    : 'http://localhost:3000/api/auth/kakao/callback';

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const profileId = String(profile.id);
      let user = await findUserByProfileId(profileId);

      if (user == null) {
        user = new UserEntity();

        user.profileId = profileId;
        user.provider = profile.provider as UserProvider;
        user.providerAccessToken = accessToken;
        user.providerRefreshToken = refreshToken;
        user.email = profile.emails?.[0]?.value;
        user.username = profile.username;
        user.displayName = profile.displayName;
        user.authToken = await createAuthToken(profileId);

        user = await saveUser(user);
      }

      done(null, user);
    },
  ),
);

export default passport;
