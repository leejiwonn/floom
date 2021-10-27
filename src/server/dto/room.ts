import { toMusic } from '~/server/dto/music';
import { toReview } from '~/server/dto/review';
import { toUserSimple } from '~/server/dto/user';
import type { RoomCategoryEntity } from '~/server/entities/RoomCategoryEntity';
import type { RoomEntity } from '~/server/entities/RoomEntity';
import type { Room, RoomSimple } from '~/types/Room';
import type { RoomCategory } from '~/types/RoomCategory';

export function toRoomCategory(x: RoomCategoryEntity): RoomCategory {
  return {
    id: x.id,
    name: x.name,
  };
}

export function toRoomSimple(x: RoomEntity): RoomSimple {
  return {
    id: x.id,
    title: x.title,
    category: toRoomCategory(x.category),
    light: x.light,
    wallColor: x.wallColor,
    objectIds: JSON.parse(x.objectIds),
    background: x.background,
    assets: JSON.parse(x.assets),
    tags: x.tags,
    roomImage: x.roomImage,
    creator: toUserSimple(x.creator),
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}

export function toRoom(x: RoomEntity): Room {
  return {
    ...toRoomSimple(x),
    musics: x.musics.map(toMusic),
    reviews: x.reviews.map(toReview),
  };
}
