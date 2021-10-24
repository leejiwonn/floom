import { Request, Response } from 'express';
import nc from 'next-connect';
import { getRoomById } from '~/server/db';
import { toRoom } from '~/server/dto/room';

async function getRoom(req: Request, res: Response) {
  const roomId = req.query.roomId as string | undefined;
  const room = await getRoomById(Number(roomId));

  res.status(200).send(toRoom(room));
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).get(getRoom);

export default handler;
