import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import database from '../../firebase/app';

const postReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const room = await database
    .collection('rooms')
    .doc('category')
    .collection(`${req.query.category}`)
    .doc(`${req.query.id}`);

  const roomData = (await room.get()).data();
  const docData = {
    objective: req.body.objective,
    comment: req.body.comment,
    player: req.body.player,
  };
  await room.update({
    usedUsers: [docData, ...roomData.usedUsers],
    playCount: roomData.playCount + 1,
    recommendCount: req.body.recommend
      ? roomData.recommendCount + 1
      : roomData.recommendCount,
  });

  res.status(200).json((await room.get()).data());
};

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  return await postReview(req, res);
});

export default handler;
