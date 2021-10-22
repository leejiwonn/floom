import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AudioPlayer from '~/components/AudioPlayer';
import { BasicColor, GradientColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import useOutsideEvent from '~/utils/useOutsideEvent';
import { useUserProfile } from '~/hooks/useUser';
import Typography from './Typography';

import MusicIcon from '../../public/assets/icons/icon-music.svg';
import CloseNoiseIcon from '../../public/assets/icons/icon-close-noise.svg';
import WhiteLogoIcon from '../../public/assets/icons/icon-logo-white.svg';
import BlueLogoIcon from '../../public/assets/icons/icon-logo-blue.svg';

const Header = () => {
  const { data: user, isLoading } = useUserProfile();
  const [show, setShow] = useState(false);
  const { modalRef } = useOutsideEvent({
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
            <WhiteLogoIcon />
          ) : (
            <BlueLogoIcon />
          )}
        </Logo>
      </Link>
      <RightStyled>
        {!isLoading && router.pathname !== '/play' ? (
          user ? (
            <UserInfo>
              <Typography font={FontType.REGULAR_BODY}>
                안녕하세요,{' '}
                <Typography tag="span" font={FontType.BOLD_BODY}>
                  {user.name}
                </Typography>{' '}
                님!
              </Typography>
            </UserInfo>
          ) : (
            <KakaoLoginButton href="/api/auth/kakao">
              <KakaoLoginIcon src="/assets/icons/icon-kakao-login.png" />
              <Typography tag="span" font={FontType.SEMI_BOLD_BODY}>
                로그인
              </Typography>
            </KakaoLoginButton>
          )
        ) : null}
        <NoiseStyled ref={modalRef}>
          <NoiseButton onClick={() => setShow((prev) => !prev)}>
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.DARK100}
              marginLeft={14}
              marginRight={9}
            >
              NOISE
            </Typography>
            <NoiseIcon>{show ? <CloseNoiseIcon /> : <MusicIcon />}</NoiseIcon>
          </NoiseButton>
          <NoiseController show={show}>
            <Typography font={FontType.EXTRA_BOLD_TITLE_01} marginBottom={24}>
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
              marginBottom={80}
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
  top: 40px;
  left: 50px;
  right: 50px;
  z-index: 5;
`;

const Logo = styled.a`
  width: 70px;
  cursor: pointer;
`;

const RightStyled = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserInfo = styled.div`
  padding: 8px 18px;
  border: 2px solid ${BasicColor.GRAY10};
  border-radius: 34px;
  background-color: ${BasicColor.GRAY20};
`;

const KakaoLoginButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.YELLOW};
  padding: 10px 15px;
  border-radius: 34px;
`;

const KakaoLoginIcon = styled.img`
  width: 17px;
  height: 16px;
  margin-right: 8px;
`;

const NoiseStyled = styled.div`
  margin-left: 18px;
  z-index: 5;
`;

const NoiseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border: 2px solid ${BasicColor.GRAY10};
  border-radius: 34px;
  background-color: ${BasicColor.GRAY20};
`;

const NoiseIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-right: 6px;
  background: ${GradientColor.GREEN};
  border: 2px solid ${BasicColor.GREEN100};
`;

const NoiseController = styled.div<{ show: boolean }>`
  width: 360px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${({ show }) => (show ? '0px' : '-360px')};
  transition: 0.5s;
  padding: 40px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  box-shadow: 0px 20px 24px rgba(0, 0, 0, 0.08);
  z-index: -1;
`;

export default Header;
