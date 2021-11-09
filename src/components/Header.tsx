import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AudioPlayer from '~/components/AudioPlayer';
import { BasicColor, GradientColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import Typography from './Typography';

import MusicIcon from '../../public/assets/icons/icon-music.svg';
import CloseNoiseIcon from '../../public/assets/icons/icon-close-noise.svg';
import WhiteLogoIcon from '../../public/assets/icons/icon-logo-white.svg';
import BlueLogoIcon from '../../public/assets/icons/icon-logo-blue.svg';

const Header = () => {
  const [show, setShow] = useState(false);
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setShow(false),
  });

  const router = useRouter();

  useEffect(() => {
    const listener = () => {
      setShow(false);
    };

    router.events.on('routeChangeComplete', listener);

    return () => {
      router.events.off('routeChangeComplete', listener);
    };
  }, [router]);

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
        <NoiseStyled ref={modalRef}>
          <NoiseButton onClick={() => setShow((prev) => !prev)}>
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.DARK100}
              marginLeft={1.4}
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
            <Typography font={FontType.EXTRA_BOLD_TITLE_01} marginBottom={2.4}>
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
              marginBottom={8}
            >
              볼륨을 조절하며 원하는 소리를 찾아보세요!
            </Typography>
            <AudioPlayer title="타닥타닥 모닥불" url="/audio/wood-fire.mp3" />
            <AudioPlayer title="쏴아쏴아 파도" url="/audio/ocean.mp3" />
            <AudioPlayer title="추적추적 빗소리" url="/audio/rain.mp3" />
            <AudioPlayer title="웅성웅성 사람들" url="/audio/people.mp3" />
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
  left: 4em;
  right: 5em;
  z-index: 998;
`;

const Logo = styled.a`
  width: 9em;
`;

const RightStyled = styled.div`
  display: flex;
  flex-direction: row;
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
  padding: 0.6em 0;
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
  margin-right: 0.6em;
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
