import type { MusicEntity } from '~/server/entities/MusicEntity';
import type { MusicCategoryEntity } from '~/server/entities/MusicCategoryEntity';
import type { Music } from '~/types/Music';
import type { MusicCategory } from '~/types/MusicCategory';

export function toMusicCategory(x: MusicCategoryEntity): MusicCategory {
  return {
    id: x.id,
    name: x.name,
  };
}

export function toMusic(x: MusicEntity): Music {
  return {
    id: x.id,
    category: toMusicCategory(x.category),
    name: x.name,
    author: x.author,
    url: x.url,
    duration: x.duration,
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}
