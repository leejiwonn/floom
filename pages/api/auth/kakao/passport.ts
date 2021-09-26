import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import database from '../../../../firebase/app';

const userRef = database.collection('users');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '',
      callbackURL: 'http://localhost:3000/api/auth/kakao/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      await userRef.doc(`${profile.id}`).set({
        id: profile.id,
        token: accessToken,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      done(null, profile);
    },
  ),
);

export default passport;
