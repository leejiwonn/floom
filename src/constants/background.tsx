export type Background = 'RAIN' | 'SNOW' | 'SUNNY' | 'BLUR' | 'NIGHT';

type BackgroundAssets = Record<Background, string>;

const BACKGROUND: BackgroundAssets = {
  RAIN: '/assets/images/background/rain.gif',
  SNOW: '/assets/images/background/snow.gif',
  SUNNY: '/assets/images/background/sunny.gif',
  BLUR: '/assets/images/background/blur.gif',
  NIGHT: '/assets/images/background/night.gif',
};

export default BACKGROUND;
