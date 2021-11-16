import styled from '@emotion/styled';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

import Lottie from '~/components/Lottie';
import Typography from '~/components/Typography';
import { GATE_EMOJI } from '~/constants/emoji';
import { BasicColor, GradientColor } from '~/utils/color';
import { FontType } from '~/utils/font';

import WhiteLogoIcon from '../../public/assets/icons/icon-logo-white.svg';

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  /* horizontal scroll */
  const panels = useRef<HTMLElement[]>([]);
  const panelsContainer = useRef<HTMLInputElement>(null);

  const createPanelsRefs = (panel: HTMLElement, index: number) => {
    panels.current[index] = panel;
  };

  useEffect(() => {
    const totalPanels = panels.current.length;

    gsap.to(panels.current, {
      xPercent: -100 * (totalPanels - 1),
      ease: 'ease-in',
      scrollTrigger: {
        trigger: panelsContainer.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + panelsContainer.current?.offsetWidth,
      },
    });
  }, []);

  /* scroll animation */
  const prev = useRef(0);
  const scrolling = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const elem = scrolling.current;
    const listener = () => {
      if (elem == null) {
        return;
      }

      const scrollY = window.scrollY;
      const diff = (prev.current - scrollY) * 0.45;

      const x = Number(elem.getAttribute('data-rotate') ?? '0');
      const y = x - diff;

      elem.style.transform = `rotate(${y}deg)`;
      elem.setAttribute('data-rotate', y.toString());

      prev.current = scrollY;
    };

    window.addEventListener('scroll', listener, true);

    return () => {
      window.removeEventListener('scroll', listener, true);
    };
  }, []);

  return (
    <IntroStyled ref={panelsContainer}>
      <LogoStyled>
        <WhiteLogoIcon width="8.3em" height="1.9em" />
      </LogoStyled>
      <ScrollImageStyled
        ref={scrolling}
        src="/assets/images/image-gate-scroll.png"
      />
      <IntroSection ref={(e: HTMLElement) => createPanelsRefs(e, 0)}>
        <IndexEmojiStyled>{GATE_EMOJI.ONE}</IndexEmojiStyled>
        <IntroInfo>
          <Typography
            font={FontType.EXTRA_BOLD_GATE_HEAD_01}
            color={BasicColor.BLACK}
            marginBottom={2}
          >
            우리는 특별한 순간들이 모여
            <br />
            삶을 만족스럽게 채운다고 믿습니다.
          </Typography>
          <Typography
            font={FontType.BOLD_GATE_HEAD_02}
            color={BasicColor.WHITE}
          >
            플룸을 통해 당신의 삶이 특별함
            {GATE_EMOJI.SPARKLE}으로
            <br /> 가득 채워지기를 바래요.
          </Typography>
        </IntroInfo>
        <IntroLottieStyled>
          <Lottie
            src="/assets/lotties/gate/gate1.json"
            loop={false}
            delay={500}
            css={{
              width: '100%',
              height: '100%',
            }}
          />
        </IntroLottieStyled>
      </IntroSection>
      <IntroSection ref={(e: HTMLElement) => createPanelsRefs(e, 1)}>
        <IntroInfo>
          <IndexEmojiStyled>{GATE_EMOJI.TWO}</IndexEmojiStyled>
          <Typography
            font={FontType.EXTRA_BOLD_GATE_HEAD_01}
            color={BasicColor.BLACK}
            marginBottom={2}
          >
            순간의 몰입을 차곡 차곡 모아
            <br />
            만족스러운 삶을 만들어봐요.
          </Typography>
          <Typography
            font={FontType.BOLD_GATE_HEAD_02}
            color={BasicColor.WHITE}
          >
            플룸은 당신이 한 가지 일{GATE_EMOJI.LAPTOP}에 온전히 ‘몰입
            {GATE_EMOJI.EYES}’ 할 수 있는
            <br />
            분위기{GATE_EMOJI.LIGHT}를 만들도록 도와줍니다.
          </Typography>
        </IntroInfo>
        <IntroLottieStyled>
          <Lottie
            src="/assets/lotties/gate/gate2.json"
            loop={false}
            impressionOptions={{
              areaThreshold: 0.4,
              timeThreshold: 233,
            }}
            css={{
              width: '100%',
              height: '100%',
            }}
          />
        </IntroLottieStyled>
      </IntroSection>
      <IntroSection ref={(e: HTMLElement) => createPanelsRefs(e, 2)}>
        <IntroInfo>
          <IndexEmojiStyled>{GATE_EMOJI.THREE}</IndexEmojiStyled>
          <Typography
            font={FontType.EXTRA_BOLD_GATE_HEAD_01}
            color={BasicColor.BLACK}
            marginBottom={2}
          >
            쉽고 재미있게
            <br />
            몰입할 수 있는 공간을 탐방하며,
          </Typography>
          <Typography
            font={FontType.BOLD_GATE_HEAD_02}
            color={BasicColor.WHITE}
          >
            몰입{GATE_EMOJI.EYES}의 즐거움을 경험해보세요!
            <br />
            플룸과 함께라면 당신의 순간{GATE_EMOJI.CLOCK}은 더 특별해질 거예요.
          </Typography>
        </IntroInfo>
        <ButtonStyled>
          <LinkButton
            href="https://floom.vercel.app/"
            target="_self"
            aria-label="메인 페이지로 이동하기"
          >
            <Typography
              tag="span"
              font={FontType.EXTRA_BOLD_TITLE_01}
              color={BasicColor.WHITE}
            >
              플룸 체험하러 가기
            </Typography>
          </LinkButton>
          <DownloadButton
            onClick={() => window.open('/assets/Floom.pdf', '_blank')}
          >
            <Typography
              tag="span"
              font={FontType.EXTRA_BOLD_TITLE_01}
              color={BasicColor.WHITE}
            >
              플룸이 궁금하신가요?
            </Typography>
          </DownloadButton>
        </ButtonStyled>
        <IntroLottieStyled>
          <Lottie
            src="/assets/lotties/gate/gate3.json"
            autoPlay={true}
            loop={true}
            css={{
              width: '100%',
              height: '100%',
            }}
          />
        </IntroLottieStyled>
      </IntroSection>
    </IntroStyled>
  );
};

const IntroStyled = styled.div`
  width: 300%;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  background: ${GradientColor.BLUE};
`;

const LogoStyled = styled.div`
  width: 9em;
  position: fixed;
  top: 5em;
  left: 5em;
  opacity: 0.3;
  z-index: 999;
`;

const ScrollImageStyled = styled.img`
  width: 12em;
  position: fixed;
  left: 5em;
  bottom: 5em;
  z-index: 999;
`;

const IntroSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  top: 0;
  left: 0;
`;

const IndexEmojiStyled = styled.div`
  width: 4em;
  height: 4em;
  position: absolute;
  top: 24%;
  left: 12%;
`;

const IntroInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 12%;
  padding-left: 15%;
`;

const IntroLottieStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const ButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 15%;
  bottom: 8%;
`;

const LinkButton = styled.a`
  width: 24em;
  height: 6em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.GREEN100};
  border: 3px solid ${BasicColor.GREEN120};
  border-radius: 1em;
`;

const DownloadButton = styled.button`
  width: 24em;
  height: 6em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${BasicColor.BLUE80};
  border-radius: 1em;
  margin-top: 2em;
`;

export default Intro;
