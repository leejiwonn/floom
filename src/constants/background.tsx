import { RoomAsset } from '~/types/Room';

export type Background = 'RAIN' | 'SNOW' | 'SUNNY' | 'BLUR' | 'NIGHT';

type BackgroundAssets = Record<Background, RoomAsset>;

const BACKGROUND: BackgroundAssets = {
  RAIN: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/rain.png',
    filename: '기본 이미지-0',
  },
  SNOW: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/snow.png',
    filename: '기본 이미지-1',
  },
  SUNNY: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/sunny.png',
    filename: '기본 이미지-2',
  },
  BLUR: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/blur.png',
    filename: '기본 이미지-3',
  },
  NIGHT: {
    type: 'image',
    url: 'https://floom-upload.s3.ap-northeast-2.amazonaws.com/night.png',
    filename: '기본 이미지-4',
  },
};

export default BACKGROUND;
