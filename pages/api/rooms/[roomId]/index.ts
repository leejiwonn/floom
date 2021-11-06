import { Request, Response } from 'express';
import nc from 'next-connect';
import { optionalAuthorize } from '~/server/auth';
import { getRoomById } from '~/server/db';
import { toRoom } from '~/server/dto/room';
import { findUserFromRequest } from '~/server/utils';

async function getRoom(req: Request, res: Response) {
  const roomId = req.query.roomId as string | undefined;
  const user = findUserFromRequest(req);

  const room = await getRoomById(Number(roomId));

  res.status(200).send(toRoom(room, user?.id));
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).get(optionalAuthorize, getRoom);

export default handler;
