import Lottie from 'react-lottie';

import RAIN_JSON from '../../public/assets/lotties/background/rain.json';
import SNOW_JSON from '../../public/assets/lotties/background/snow.json';
import SUNNY_JSON from '../../public/assets/lotties/background/sunny.json';
import BLUR_JSON from '../../public/assets/lotties/background/blur.json';
import NIGHT_JSON from '../../public/assets/lotties/background/night.json';

export type Weather = 'RAIN' | 'SNOW' | 'SUNNY' | 'BLUR' | 'NIGHT';

type WeatherAssets = Record<Weather, React.ReactNode>;

const getDefaultOptions = (animationData: any) => {
  return {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
};

const WEATHER: WeatherAssets = {
  RAIN: (
    <Lottie options={getDefaultOptions(RAIN_JSON)} height="100%" width="100%" />
  ),
  SNOW: (
    <Lottie options={getDefaultOptions(SNOW_JSON)} height="100%" width="100%" />
  ),
  SUNNY: (
    <Lottie
      options={getDefaultOptions(SUNNY_JSON)}
      height="100%"
      width="100%"
    />
  ),
  BLUR: (
    <Lottie options={getDefaultOptions(BLUR_JSON)} height="100%" width="100%" />
  ),
  NIGHT: (
    <Lottie
      options={getDefaultOptions(NIGHT_JSON)}
      height="100%"
      width="100%"
    />
  ),
} as const;

export default WEATHER;
