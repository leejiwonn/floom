import { Request, Response } from 'express';
import { User } from '../types/User';
import database from '../../firebase/app';
import { NextHandler } from 'next-connect';
import { jwtSign, jwtVerify } from './jwt';

const THREE_MONTHS = 3 * 30 * 24 * 60 * 60;

export async function verifyAuthToken(authToken: string) {
  const { id } = await jwtVerify<{ id: string }>(authToken);

  return id;
}

export function createAuthToken(userId: string) {
  return jwtSign(
    {
      iss: 'https://floom.vercel.app',
      id: userId,
    },
    {
      expiresIn: THREE_MONTHS,
    },
  );
}

const HEADER_PREFIX = 'Bearer';
const userRef = database.collection('users');

export async function authorizeMiddleware(
  req: Request,
  res: Response,
  next: NextHandler,
) {
  const [headerPrefix, authToken] = req.headers.authorization?.split(' ') ?? [];

  if (headerPrefix !== HEADER_PREFIX || authToken == null) {
    res.status(401).end();
    return;
  }

  const userId = await verifyAuthToken(authToken);
  const doc = await userRef.doc(`${userId}`).get();
  const user = doc.data() as User | undefined;

  if (user == null || user.authToken !== authToken) {
    res.status(401).end();
    return;
  }

  req.user = user;
  next();
}
