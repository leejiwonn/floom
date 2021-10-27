import type { MusicCategory } from './MusicCategory';

export type Music = {
  id: number;
  category: MusicCategory;
  name: string;
  author: string;
  url: string;
  /** 단위: 초 */
  duration: number;
  createdAt: string;
  updatedAt: string;
};
