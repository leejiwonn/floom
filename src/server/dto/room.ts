import { toMusic } from '~/server/dto/music';
import { toUserSimple } from '~/server/dto/user';
import type { RoomCategoryEntity } from '~/server/entities/RoomCategoryEntity';
import type { RoomEntity } from '~/server/entities/RoomEntity';
import { RoomGuestBookEntity } from '~/server/entities/RoomEntity';
import type { Room, RoomSimple } from '~/types/Room';
import type { RoomCategory } from '~/types/RoomCategory';
import { RoomGuestBook } from '~/types/RoomGuestBook';

export function toRoomCategory(x: RoomCategoryEntity): RoomCategory {
  return {
    id: x.id,
    name: x.name,
  };
}

export function toRoomGuestBook(x: RoomGuestBookEntity): RoomGuestBook {
  return {
    id: x.id,
    author: x.author != null ? toUserSimple(x.author) : undefined,
    guestName: x.guestName,
    emoji: x.emoji,
    body: x.body,
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}

export function toRoomSimple(x: RoomEntity): RoomSimple {
  return {
    id: x.id,
    title: x.title,
    description: x.description,
    category: toRoomCategory(x.category),
    light: x.light,
    wallColor: x.wallColor,
    objectIds: JSON.parse(x.objectIds),
    background: x.background,
    assets: JSON.parse(x.assets),
    tags: x.tags,
    roomImage: x.roomImage,
    creator: toUserSimple(x.creator),
    guestBooksEnabled: x.guestBooksEnabled,
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}

export function toRoom(x: RoomEntity, userId?: number): Room {
  const reviewsCount = x.reviews.length;
  const recommendReviewsCount = x.reviews.filter(
    (review) => review.recommend,
  ).length;
  const isBookmarked = x.bookmarks?.some(
    (bookmark) => bookmark.marker?.id === userId,
  );
  const bookmarksCount = x.bookmarks?.length;

  return {
    ...toRoomSimple(x),
    musics: x.musics.map(toMusic),
    reviewsCount,
    recommendReviewsCount,
    isBookmarked,
    bookmarksCount,
  };
}
