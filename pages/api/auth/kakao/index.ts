import nc from 'next-connect';
import passport from './passport';

const handler = nc().get(
  passport.authenticate('kakao', {
    session: false,
    scope: ['email', 'profile'],
  }),
);

export default handler;
