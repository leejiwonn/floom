import { toUserSimple } from '~/server/dto/user';
import { RoomBookmarkEntity } from '~/server/entities/RoomEntity';
import type { Bookmark } from '~/types/Bookmark';

export function toBookmark(x: RoomBookmarkEntity): Bookmark {
  return {
    id: x.id,
    marker: x.marker != null ? toUserSimple(x.marker) : undefined,
    room: {
      id: x.room.id,
      title: x.room.title,
      creator: x.room.creator,
      assets: JSON.parse(x.room.assets),
      tags: x.room.tags,
    },
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}
