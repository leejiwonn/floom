import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { authorizeMiddleware } from '~/server/auth';

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(authorizeMiddleware)
  .get((req, res) => {
    const user = (req as any).user;
    console.log(user);

    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  });

export default handler;
