import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { findAllRooms } from '~/server/db';
import { toRoomSimple } from '~/server/dto/room';

async function listRooms(req: Request, res: Response) {
  const categoryName = req.query.categoryName as string | undefined;
  const rooms = await findAllRooms({
    filters: { categoryName },
  });

  const response = rooms.map(toRoomSimple);

  res.status(200).send(response);
}

async function createRoom(req: Request, res: Response) {
  res.status(500).send({
    message: '아직 API 안만들어짐',
  });
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
})
  .get(listRooms)
  .post(authorize, createRoom);

export default handler;
