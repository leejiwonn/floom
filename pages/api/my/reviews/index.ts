import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { findUserFromRequest } from '~/server/utils';
import { findAllReviews } from '~/server/db';
import { toReview } from '~/server/dto/review';

async function myListReviews(req: Request, res: Response) {
  const user = findUserFromRequest(req);

  const reviews = await findAllReviews({
    filters: {
      authorId: user?.id != null ? Number(user.id) : undefined,
    },
  });
  const response = reviews.map(toReview);

  res.status(200).send(response);
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).get(authorize, myListReviews);

export default handler;
