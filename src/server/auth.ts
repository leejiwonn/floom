import { jwtSign, jwtVerify } from './jwt';

const THREE_MONTHS = 3 * 30 * 24 * 60 * 60;

export async function verifyAuthToken(authToken: string) {
  const { id } = await jwtVerify<{ id: number }>(authToken);

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
