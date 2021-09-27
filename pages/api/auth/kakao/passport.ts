import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { createAuthToken } from '../../../../src/server/auth';
import { User, UserProvider } from '../../../../src/types/User';
import database from '../../../../firebase/app';

const userRef = database.collection('users');

const callbackURL =
  process.env.NODE_ENV === 'production'
    ? 'https://floom.vercel.app/api/auth/kakao/callback'
    : 'http://localhost:3000/api/auth/kakao/callback';

passport.use(ㄴ
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const userId = String(profile.id);

      const doc = await userRef.doc(userId).get();
      let user = doc.data() as User | undefined;

      if (user == null) {
        user = {
          id: profile.id,
          provider: profile.provider as UserProvider,
          providerAccessToken: accessToken,
          providerRefreshToken: refreshToken,
          username: profile.username,
          displayName: profile.displayName,
          authToken: await createAuthToken(userId),
          email: profile.emails?.[0]?.value,
        };

        await userRef.doc(userId).set(user);
      }

      done(null, user);
    },
  ),
);

export default passport;
