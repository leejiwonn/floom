import type { Music } from '~/types/Music';
import type { MusicCategory } from '~/types/MusicCategory';
import api from '~/utils/api';

export async function fetchMusicCategories() {
  const { data } = await api.get<MusicCategory[]>('/api/musics/categories');

  return data;
}

export async function fetchMusics(categoryId?: number) {
  const { data } = await api.get<Music[]>(
    categoryId != null ? `/api/musics?categoryId=${categoryId}` : '/api/musics',
  );

  return data;
}
