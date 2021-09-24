import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import database from '../../firebase/app';

const userRef = database.collection('users');

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.token;
  const doc = await userRef.doc(`${userId}`).get();

  res.status(200).json(doc.data());
};

const postUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.token;
  await userRef.doc(`${userId}`).set({
    name: req.body.name,
  });
  const doc = await userRef.doc(`${userId}`).get();

  res.status(200).json(doc.data());
};

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    return await getUser(req, res);
  })
  .post(async (req, res) => {
    return await postUser(req, res);
  });

export default handler;
