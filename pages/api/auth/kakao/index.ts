import nc from 'next-connect';
import passport from './passport';

const handler = nc().get(
  passport.authenticate('kakao', {
    session: false,
    scope: ['account_email', 'profile_nickname', 'profile_image'],
  }),
);

export default handler;
