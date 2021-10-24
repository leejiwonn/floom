import { UserEntity } from '~/server/entities/UserEntity';
import type { User, UserSimple } from '~/types/User';

export function toUserSimple(x: UserEntity): UserSimple {
  return {
    id: x.id,
    username: x.username,
    displayName: x.displayName,
  };
}

export function toUser(x: UserEntity): User {
  return {
    ...toUserSimple(x),
    provider: x.provider,
    profileId: x.profileId,
    providerAccessToken: x.providerAccessToken,
    providerRefreshToken: x.providerRefreshToken,
    authToken: x.authToken,
    email: x.email,
  };
}
