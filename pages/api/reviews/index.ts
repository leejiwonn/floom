import type { Request, Response } from 'express';
import nc from 'next-connect';
import { optionalAuthorize } from '~/server/auth';
import { createReview } from '~/server/db';
import { toReview } from '~/server/dto/review';
import { findUserFromRequest } from '~/server/utils';
import type { CreateReviewData } from '~/types/Review';

async function postReview(req: Request, res: Response) {
  const body = req.body as CreateReviewData;
  const user = findUserFromRequest(req);

  const review = await createReview({
    ...body,
    user,
  });

  res.status(201).send(toReview(review));
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).post(optionalAuthorize, postReview);

export default handler;
