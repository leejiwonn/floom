import Lottie from 'react-lottie';

import FINGER_JSON from '../../public/assets/lotties/finger.json';

import RAIN_JSON from '../../public/assets/lotties/background/rain.json';
import SNOW_JSON from '../../public/assets/lotties/background/snow.json';
import SUNNY_JSON from '../../public/assets/lotties/background/sunny.json';
import NIGHT_JSON from '../../public/assets/lotties/background/night.json';

interface Props {
  animationData: any;
  loop?: boolean;
  autoPlay?: boolean;
}

export const getDefaultOptions = ({
  animationData,
  loop = true,
  autoPlay = true,
}: Props) => {
  return {
    loop: loop,
    autoplay: autoPlay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
};

/* Default */

export type LottieList = 'FINGER';
type LottieAssets = Record<LottieList, React.ReactNode>;

export const LOTTIE: LottieAssets = {
  FINGER: (
    <Lottie
      options={getDefaultOptions({ animationData: FINGER_JSON })}
      width="8em"
    />
  ),
} as const;

/* Weather */

export type Weather = 'RAIN' | 'SNOW' | 'SUNNY' | 'NIGHT';
type WeatherAssets = Record<Weather, React.ReactNode>;

export const WEATHER: WeatherAssets = {
  RAIN: (
    <Lottie
      options={getDefaultOptions({ animationData: RAIN_JSON })}
      height="100%"
      width="100%"
    />
  ),
  SNOW: (
    <Lottie
      options={getDefaultOptions({ animationData: SNOW_JSON })}
      height="100%"
      width="100%"
    />
  ),
  SUNNY: (
    <Lottie
      options={getDefaultOptions({ animationData: SUNNY_JSON })}
      height="100%"
      width="100%"
    />
  ),
  NIGHT: (
    <Lottie
      options={getDefaultOptions({ animationData: NIGHT_JSON })}
      height="100%"
      width="100%"
    />
  ),
} as const;
