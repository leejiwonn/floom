export type Background = 'RAIN' | 'SNOW' | 'SUNNY' | 'BLUR' | 'NIGHT';

type BackgroundAssets = Record<Background, string>;

const BACKGROUND: BackgroundAssets = {
  RAIN: '/assets/images/background/background-rain.jpeg',
  SNOW: '/assets/images/background/background-snow.jpeg',
  SUNNY: '/assets/images/background/background-sunny.jpeg',
  BLUR: '/assets/images/background/background-blur.jpeg',
  NIGHT: '/assets/images/background/background-night.jpeg',
};

export default BACKGROUND;
