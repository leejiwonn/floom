import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { getUserFromRequest } from '~/server/utils';
import { UserSimple } from '~/types/User';

const handler = nc<Request, Response>()
  .use(authorize)
  .get((req, res) => {
    const user = getUserFromRequest(req);
    const response: UserSimple & {
      authToken: string;
    } = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      authToken: user.authToken,
    };

    res.status(200).json(response);
  });

export default handler;
