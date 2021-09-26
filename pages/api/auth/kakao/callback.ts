import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import passport from './passport';

const handler = nc()
  .use(passport.initialize())
  .get(
    passport.authenticate('kakao', {
      session: false,
      failureRedirect: '/',
    }),
    (req: NextApiRequest, res: NextApiResponse) => {
      console.log(req, res);
    },
  );

export default handler;
