import { toUserSimple } from '~/server/dto/user';
import { ReviewEntity } from '~/server/entities/RoomEntity';
import type { Review } from '~/types/Review';

export function toReview(x: ReviewEntity): Review {
  return {
    id: x.id,
    author: x.author != null ? toUserSimple(x.author) : undefined,
    guestName: x.guestName,
    objective: x.objective,
    comment: x.comment,
    recommend: x.recommend,
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}
