import { Request, Response } from 'express';
import nc from 'next-connect';
import { findAllMusics } from '~/server/db';
import { toMusic } from '~/server/dto/music';

async function listMusics(_: Request, res: Response) {
  const musics = await findAllMusics();
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
