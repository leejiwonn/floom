import { Request, Response } from 'express';
import nc from 'next-connect';
import { findAllMusics, findAllMusicsByCategoryId } from '~/server/db';
import { toMusic } from '~/server/dto/music';

async function listMusics(req: Request, res: Response) {
  const categoryId = req.query.categoryId as string | undefined;

  const musics =
    categoryId != null
      ? await findAllMusicsByCategoryId(Number(categoryId))
      : await findAllMusics();
  const response = musics.map(toMusic);

  res.status(200).send(response);
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).get(listMusics);

export default handler;
