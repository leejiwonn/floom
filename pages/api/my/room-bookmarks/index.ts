import { Request, Response } from 'express';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { getUserFromRequest } from '~/server/utils';
import { findAllBookmarks } from '~/server/db';
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

const handler = nc<Request, Response>({
  onError: (error, _, res) => {
    console.error(error);

    res.status(500).send({
      message: error.message,
    });
  },
}).get(authorize, myRoomBookmarks);

export default handler;
