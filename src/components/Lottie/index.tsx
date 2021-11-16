import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Impression from '~/components/Impression';
import { AnimationAsset } from '~/components/Lottie/AnimationData';
import { useSimpleAsync } from '~/hooks/useAsync';
import { useCombinedRefs } from '~/hooks/useCombinedRefs';
import { importLottie } from '~/utils/lottie';
import { AnimationChain } from './AnimationChain';
import { LoopType } from './AnimationPlayer';

interface CommonProps {
  className?: string;
  /**
   * 동적으로 로띠 내의 에셋을 변경할 때 사용
   */
  assets?: AnimationAsset[];
  /**
   * 애니메이션이 반복 재생되는지 여부
   * @default false
   */
  loop?: LoopType;
  /**
   * 애니메이션이 반복 재생될 때 사이의 딜레이
   * @default 0
   */
  interval?: number;
  /**
   * 애니메이션이 화면 바깥으로 나갔을 때 애니메이션 재생을 잠시 일시정지하는지 여부
   * @default false
   */
  stopOnExit?: boolean;
  /**
   * 애니메이션 재생 딜레이 (ms)
   * @default 0
   */
  delay?: number;
  /**
   * 애니메이션 재생 속도
   * @default 1
   */
  speed?: number;
  /**
   * 자동 시작 여부
   * @default true
   */
  autoPlay?: boolean;
  impressionOptions?: any;
  onPlay?: () => void;
  onLoopComplete?: () => void;
}

interface JSONProps extends CommonProps {
  json: string;
  src?: undefined;
}

interface SRCProps extends CommonProps {
  src: string | string[];
  json?: undefined;
}

type Props = JSONProps | SRCProps;

interface LottieRef {
  start: () => void;
  stop: () => void;
}

function Lottie(
  {
    className,
    src,
    json,
    assets,
    delay: delayMs = 0,
    speed = 1,
    loop = false,
    interval = 0,
    autoPlay = true,
    onPlay,
    impressionOptions,
    onLoopComplete,
  }: Props,
  lottieRef: Ref<LottieRef>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationChainRef = useRef<AnimationChain | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const handleImpressionStart = useCallback(() => {
    setIsVisible(true);
  }, [src]);

  const isFirstPlayRef = useRef<boolean>(true);

  const animationChain = useSimpleAsync(async () => {
    if (containerRef.current == null) {
      return null;
    }

    const lottie = await importLottie();

    const animationData =
      typeof json === 'string'
        ? [{ json, assets }]
        : typeof src === 'string'
        ? [{ url: src, assets }]
        : src!.map((url) => ({ url, assets }));

    const chain = AnimationChain(animationData, {
      loop,
      interval,
      container: containerRef.current,
      lottie,
    });

    await chain.prepare();

    return chain;
  }, [loop, interval, src, json]);

  const handleContainerChange = useCallback((element: HTMLDivElement) => {
    if (isInViewport(element)) {
      // setIsVisible(true);
    }
  }, []);

  const startAnimation = useCallback(async () => {
    if (animationChain == null) {
      return;
    }

    if (isFirstPlayRef.current && delayMs > 0) {
      await delay(delayMs);
      isFirstPlayRef.current = false;
    }

    animationChain.start();
    onPlay?.();
  }, [animationChain, delayMs, onPlay]);

  const stopAnimation = useCallback(() => {
    animationChain?.destroy();
  }, [animationChain]);

  useImperativeHandle(
    lottieRef,
    () => {
      return {
        start: startAnimation,
        stop: stopAnimation,
      };
    },
    [startAnimation, stopAnimation],
  );

  useEffect(() => {
    animationChain?.showFirstFrame();
  }, [animationChain]);

  useEffect(() => {
    if (!onLoopComplete) {
      return;
    }

    animationChain?.addEventListener('loopComplete', onLoopComplete);

    return () => {
      animationChain?.removeEventListener('loopComplete', onLoopComplete);
    };
  }, [animationChain, onLoopComplete]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (!autoPlay) {
      return;
    }

    startAnimation();

    return () => {
      animationChain?.destroy();
    };
  }, [animationChain, autoPlay, isVisible, startAnimation]);

  useEffect(() => {
    animationChainRef.current?.setSpeed(speed);
  }, [speed]);

  const ref = useCombinedRefs(containerRef, handleContainerChange);

  return (
    <Impression
      key={`${loop}-${interval}-${src}-${json}`}
      className={className}
      ref={ref}
      onImpressionStart={handleImpressionStart}
      {...impressionOptions}
    />
  );
}

export default forwardRef(Lottie);

function delay(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function isInViewport(element: HTMLElement | null) {
  if (element == null) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const windowWidth = window.innerWidth ?? document.documentElement.clientWidth;
  const windowHeight =
    window.innerHeight ?? document.documentElement.clientHeight;
  return (
    rect.top <= windowHeight &&
    rect.bottom >= 0 &&
    rect.left <= windowWidth &&
    rect.right >= 0
  );
}
