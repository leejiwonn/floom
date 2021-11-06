import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { findAllRooms } from '~/server/db';
import { toRoomSimple } from '~/server/dto/room';
import { findUserFromRequest } from '~/server/utils';

async function myListRooms(req: Request, res: Response) {
  const user = findUserFromRequest(req);

  const rooms = await findAllRooms({
    filters: {
      creatorId: user?.id != null ? Number(user.id) : undefined,
    },
  });
  const response = rooms.map(toRoomSimple);

  res.status(200).send(response);
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).get(authorize, myListRooms);

export default handler;
