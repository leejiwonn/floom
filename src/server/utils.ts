import { Request } from 'express';
import { User } from '~/types/User';

export function findUserFromRequest(request: Request) {
  const user = request.user;

  return user as User | undefined;
}

export function getUserFromRequest(request: Request) {
  const user = findUserFromRequest(request);

  if (user == null) {
    throw new Error(
      '인증된 사용자 정보가 없습니다. "authorizeMiddleware"를 사용하였는지 확인해주세요.',
    );
  }

  return user;
}
