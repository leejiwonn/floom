import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { getUserFromRequest } from '~/server/utils';
import { findAllBookmarks, createBookmark, deleteBookmark } from '~/server/db';
import { toBookmark } from '~/server/dto/bookmark';

async function myRoomBookmarks(req: Request, res: Response) {
  const roomId = req.query.roomId as string | undefined;
  const user = getUserFromRequest(req);

  const bookmarks = await findAllBookmarks({
    filters: {
      roomId: roomId != null ? Number(roomId) : undefined,
      markerId: user?.id != null ? Number(user.id) : undefined,
    },
  });
  const response = bookmarks.map(toBookmark);

  res.status(200).send(response);
}

async function postRoomBookmark(req: Request, res: Response) {
  const roomId = req.query.roomId as string;
  const user = getUserFromRequest(req);

  const bookmark = await createBookmark({
    roomId: Number(roomId),
    user,
  });

  res.status(201).send(toBookmark(bookmark));
}

async function deleteRoomBookmark(req: Request, res: Response) {
  const roomId = req.query.roomId as string;
  const user = getUserFromRequest(req);

  await deleteBookmark({
    roomId: Number(roomId),
    user,
  });

  res.status(200).send(true);
}

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
})
  .get(authorize, myRoomBookmarks)
  .post(authorize, postRoomBookmark)
  .delete(authorize, deleteRoomBookmark);

export default handler;
