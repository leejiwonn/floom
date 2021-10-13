import { Request, Response } from 'express';
import nc from 'next-connect';

import passport from './passport';
import { User } from '~/types/User';

const handler = nc()
  .use(passport.initialize())
  .get(
    passport.authenticate('kakao', {
      session: false,
      // TODO
      // failureRedirect: '/'
    }),
    (req: Request, res: Response) => {
      console.log(req.user);

      res.redirect(`/login-success?authToken=${(req.user as User).authToken}`);
    },
  );

export default handler;
