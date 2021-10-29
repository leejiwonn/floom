import { Request, Response } from 'express';
import nc from 'next-connect';
import { optionalAuthorize } from '~/server/auth';
import { createRoomGuestBook } from '~/server/db';
import { toRoomGuestBook } from '~/server/dto/room';
import { findUserFromRequest } from '~/server/utils';
import { CreateRoomGuestBookData } from '~/types/RoomGuestBook';

async function postRoomGuestBook(req: Request, res: Response) {
  const roomId = req.query.roomId as string | undefined;
  const payload = req.body as CreateRoomGuestBookData;

  console.log('???', roomId, payload);

  const guestBook = await createRoomGuestBook({
    ...payload,
    roomId: Number(roomId),
    user: findUserFromRequest(req),
  });

  res.status(201).send(toRoomGuestBook(guestBook));
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).post(optionalAuthorize, postRoomGuestBook);

export default handler;
