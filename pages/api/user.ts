import type { NextApiRequest, NextApiResponse } from 'next';
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return await getUser(req, res);
    case 'POST':
      return await postUser(req, res);
    default:
      break;
  }
};

export default handler;
