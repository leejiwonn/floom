import type { Request, Response } from 'express';
import nc from 'next-connect';
import { findAllMusicCategories } from '~/server/db';
import { toMusicCategory } from '~/server/dto/music';

async function listMusicCategories(_: Request, res: Response) {
  const musicCategories = await findAllMusicCategories();
  const response = musicCategories.map(toMusicCategory);

  res.status(200).send(response);
}

const handler = nc().get(listMusicCategories);

export default handler;
