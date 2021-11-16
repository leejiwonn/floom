import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AudioPlayer from '~/components/AudioPlayer';
import { BasicColor, GradientColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import EMOJI from '~/constants/emoji';
import Typography from './Typography';

import MusicIcon from '../../public/assets/icons/icon-music.svg';
import CloseNoiseIcon from '../../public/assets/icons/icon-close-noise.svg';
import WhiteLogoIcon from '../../public/assets/icons/icon-logo-white.svg';
import BlueLogoIcon from '../../public/assets/icons/icon-logo-blue.svg';

const Header = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setShow(false),
  });

  const slideText = [
    '오른쪽 NOISE 버튼을 눌러 백색소음을 설정해보세요!',
    '휴대폰 방해금지 모드 변경 시, 더욱 몰입 가능해요.',
  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const listener = () => {
      setShow(false);
    };

    router.events.on('routeChangeComplete', listener);

    return () => {
      router.events.off('routeChangeComplete', listener);
    };
  }, [router]);

  useEffect(() => {
    const slide = setInterval(function () {
      if (slideIndex + 1 === slideText.length) {
        setSlideIndex(0);
      } else {
        setSlideIndex((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(slide);
  }, [slideIndex]);

  return (
    <HeaderStyled>
      <Link href="/">
        <Logo aria-label="메인 페이지로 이동하기">
          {router.pathname === '/detail' || router.pathname === '/play' ? (
            <WhiteLogoIcon width="8.3em" height="1.9em" />
          ) : (
            <BlueLogoIcon width="8.3em" height="1.9em" />
          )}
        </Logo>
      </Link>
      <RightStyled>
        <GuideStyled>
          <GuideTitle>
            {EMOJI.LIGHT}
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.DARK40}
              marginLeft={0.4}
            >
              TIP!
            </Typography>
          </GuideTitle>
          <GuideBox>
            <GuideTextStyled>
              <Typography font={FontType.REGULAR_CAPTION} align={Align.CENTER}>
                {slideText[slideIndex]}
              </Typography>
            </GuideTextStyled>
          </GuideBox>
        </GuideStyled>
        <NoiseStyled ref={modalRef}>
          <NoiseButton onClick={() => setShow((prev) => !prev)}>
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.DARK100}
              marginLeft={1.2}
              marginRight={0.9}
            >
              NOISE
            </Typography>
            <NoiseIcon>
              {show ? (
                <CloseNoiseIcon width="1.6em" height="1.7em" />
              ) : (
                <MusicIcon width="2.4em" height="1.8em" />
              )}
            </NoiseIcon>
          </NoiseButton>
          <NoiseController show={show}>
            <Typography font={FontType.EXTRA_BOLD_TITLE_01} marginBottom={1.2}>
              적절한{' '}
              <Typography
                tag="span"
                font={FontType.EXTRA_BOLD_TITLE_01}
                color={BasicColor.GREEN100}
              >
                백색소음
              </Typography>
              은
              <br />더 몰입할 수 있게 도와줍니다 :)
            </Typography>
            <Typography
              font={FontType.REGULAR_CAPTION}
              color={BasicColor.DARK70}
              marginBottom={4}
            >
              볼륨을 조절하며 원하는 소리를 찾아보세요!
            </Typography>
            <AudioPlayer title="타닥타닥 모닥불" url="/audio/wood-fire.mp3" />
            <AudioPlayer title="쏴아쏴아 파도" url="/audio/ocean.mp3" />
            <AudioPlayer title="추적추적 빗소리" url="/audio/rain.mp3" />
            <AudioPlayer title="웅성웅성 사람들" url="/audio/people.mp3" />
            <AudioPlayer title="시끌벅적 사무실" url="/audio/office.mp3" />
            <AudioPlayer title="사각사각 연필소리" url="/audio/writing.mp3" />
            <AudioPlayer title="찌르르르 풀벌레" url="/audio/cricket.mp3" />
          </NoiseController>
        </NoiseStyled>
      </RightStyled>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 3em;
  left: 3em;
  right: 4em;
  z-index: 998;
`;

const Logo = styled.a`
  width: 9em;
`;

const RightStyled = styled.div`
  display: flex;
  flex-direction: row;
`;

const GuideStyled = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-bottom: 0.4em;
  border: 0.2em solid ${BasicColor.GRAY10};
  border-radius: 3.4em;
  background-color: ${BasicColor.GRAY20};
`;

const GuideTitle = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 0;
  padding-left: 1em;
`;

const GuideBox = styled.div`
  width: 26vw;
  position: absolute;
  right: 0;
`;

const GuideTextStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -0.1em;
`;

const NoiseStyled = styled.div`
  margin-left: 1.8em;
  z-index: 999;
`;

const NoiseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.4em 0;
  border: 0.2em solid ${BasicColor.GRAY10};
  border-radius: 3.4em;
  background-color: ${BasicColor.GRAY20};
`;

const NoiseIcon = styled.div`
  width: 3em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3em;
  margin-right: 0.4em;
  background: ${GradientColor.GREEN};
  border: 0.2em solid ${BasicColor.GREEN100};
`;

const NoiseController = styled.div<{ show: boolean }>`
  width: 36em;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${({ show }) => (show ? '0' : '-36em')};
  transition: 0.5s;
  padding: 4em;
  border-top-left-radius: 5em;
  border-bottom-left-radius: 5em;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(1.4em);
  box-shadow: 0 2em 2.4em rgba(0, 0, 0, 0.08);
  z-index: -1;
`;

export default Header;
