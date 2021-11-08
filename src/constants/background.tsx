export type Background = 'RAIN' | 'SNOW' | 'SUNNY' | 'BLUR' | 'NIGHT';

type BackgroundAssets = Record<Background, string>;

const BACKGROUND: BackgroundAssets = {
  RAIN: '/assets/images/background/rain.png',
  SNOW: '/assets/images/background/snow.png',
  SUNNY: '/assets/images/background/sunny.png',
  BLUR: '/assets/images/background/blur.png',
  NIGHT: '/assets/images/background/night.png',
};

export default BACKGROUND;
