import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import database from '../../firebase/app';

const getCategoryRooms = async (req: NextApiRequest, res: NextApiResponse) => {
  const rooms = await database
    .collection('rooms')
    .doc('category')
    .collection(`${req.query.category}`)
    .get();
  res.status(200).json(rooms.docs.map((doc) => doc.data()));
};

const getRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  const room = await database
    .collection('rooms')
    .doc('category')
    .collection(`${req.query.category}`)
    .doc(`${req.query.id}`)
    .get();

  res.status(200).json(room.data());
};

const getRooms = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.category) {
    if (req.query.id) {
      getRoom(req, res);
    } else {
      getCategoryRooms(req, res);
    }
  }
};

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  return await getRooms(req, res);
});

export default handler;
