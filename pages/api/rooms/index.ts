import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { createRoom, findAllRooms } from '~/server/db';
import { toRoom, toRoomSimple } from '~/server/dto/room';
import { getUserFromRequest } from '~/server/utils';
import { CreateRoomData } from '~/types/Room';

async function listRooms(req: Request, res: Response) {
  const categoryName = req.query.categoryName as string | undefined;
  const rooms = await findAllRooms({
    filters: { categoryName },
  });

  const response = rooms.map(toRoomSimple);

  res.status(200).send(response);
}

async function postRoom(req: Request, res: Response) {
  const payload = req.body as CreateRoomData;
  const user = getUserFromRequest(req);

  const room = await createRoom({
    ...payload,
    user,
  });

  res.status(200).send(toRoom(room));
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
  .post(authorize, postRoom);

export default handler;
