import { Request, Response } from 'express';
import nc from 'next-connect';
import { User } from '../../../../src/types/User';
import passport from './passport';

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
