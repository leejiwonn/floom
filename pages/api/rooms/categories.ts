import type { Request, Response } from 'express';
import nc from 'next-connect';
import { findAllRoomCategories } from '~/server/db';
import { toRoomCategory } from '~/server/dto/room';

async function listRoomCategories(_: Request, res: Response) {
  const roomCategories = await findAllRoomCategories();
  const response = roomCategories.map(toRoomCategory);

  res.status(200).send(response);
}

const handler = nc().get(listRoomCategories);

export default handler;
