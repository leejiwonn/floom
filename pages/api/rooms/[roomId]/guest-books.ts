import { Request, Response } from 'express';
import nc from 'next-connect';
import { optionalAuthorize } from '~/server/auth';
import {
  createRoomGuestBook,
  findAllRoomGuestBooksByPagination,
} from '~/server/db';
import { toRoomGuestBook } from '~/server/dto/room';
import { findUserFromRequest } from '~/server/utils';
import { CreateRoomGuestBookData } from '~/types/RoomGuestBook';

async function listPaginatedRoomGuestBooks(req: Request, res: Response) {
  const roomId = req.query.roomId as string | undefined;
  const limit = req.query.limit as string | undefined;
  const page = req.query.page as string | undefined;

  const result = await findAllRoomGuestBooksByPagination({
    roomId: Number(roomId),
    limit: Number(limit ?? 20),
    page: Number(page ?? 1),
  });

  res.status(200).send({
    ...result,
    items: result.items.map(toRoomGuestBook),
  });
}

async function postRoomGuestBook(req: Request, res: Response) {
  const roomId = req.query.roomId as string | undefined;
  const payload = req.body as CreateRoomGuestBookData;

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
})
  .get(listPaginatedRoomGuestBooks)
  .post(optionalAuthorize, postRoomGuestBook);

export default handler;
