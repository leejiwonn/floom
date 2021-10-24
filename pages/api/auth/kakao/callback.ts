import 'reflect-metadata';
import { Request, Response } from 'express';
import nc from 'next-connect';
import { getUserFromRequest } from '~/server/utils';

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
      res.redirect(
        `/login-success?authToken=${getUserFromRequest(req).authToken}`,
      );
    },
  );

export default handler;
