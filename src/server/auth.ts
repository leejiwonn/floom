import { Request, Response } from 'express';
import { NextHandler } from 'next-connect';
import { findUserByProfileId } from '~/server/db';
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

export async function optionalAuthorize(
  req: Request,
  res: Response,
  next: NextHandler,
) {
  const [headerPrefix, authToken] = req.headers.authorization?.split(' ') ?? [];

  if (headerPrefix !== HEADER_PREFIX || authToken == null) {
    next();
    return;
  }

  try {
    const profileId = await verifyAuthToken(authToken);
    const user = await findUserByProfileId(profileId);

    if (user == null || user.authToken !== authToken) {
      next();
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    next();
  }
}

export async function authorize(
  req: Request,
  res: Response,
  next: NextHandler,
) {
  const [headerPrefix, authToken] = req.headers.authorization?.split(' ') ?? [];

  if (headerPrefix !== HEADER_PREFIX || authToken == null) {
    res.status(401).end();
    return;
  }

  try {
    const profileId = await verifyAuthToken(authToken);
    const user = await findUserByProfileId(profileId);

    if (user == null || user.authToken !== authToken) {
      res.status(401).end();
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send({
      message: (error as Error).message,
    });
  }
}
