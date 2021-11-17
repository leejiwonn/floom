import { RoomAsset } from '~/types/Room';

export type Background =
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR'
  | 'FIVE'
  | 'SIX'
  | 'SEVEN';

type BackgroundAssets = Record<Background, RoomAsset>;

const BACKGROUND: BackgroundAssets = {
  ONE: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/01.png',
    filename: '기본 이미지-1',
  },
  TWO: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/02.png',
    filename: '기본 이미지-2',
  },
  THREE: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/03.png',
    filename: '기본 이미지-3',
  },
  FOUR: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/04.png',
    filename: '기본 이미지-4',
  },
  FIVE: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/05.png',
    filename: '기본 이미지-5',
  },
  SIX: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/06.png',
    filename: '기본 이미지-6',
  },
  SEVEN: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/07.png',
    filename: '기본 이미지-7',
  },
};

export default BACKGROUND;
