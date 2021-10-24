import type { MusicEntity } from '~/server/entities/MusicEntity';
import type { Music } from '~/types/Music';

export function toMusic(x: MusicEntity): Music {
  return {
    id: x.id,
    name: x.name,
    author: x.author,
    url: x.url,
    duration: x.duration,
    createdAt: x.createdAt.toISOString(),
    updatedAt: x.updatedAt.toISOString(),
  };
}
