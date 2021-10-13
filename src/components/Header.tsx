import styled from '@emotion/styled';
import { useState } from 'react';

import AudioPlayer from '~/components/AudioPlayer';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';
import LogoIcon from '../../public/assets/icons/icon-logo.svg';
import MusicIcon from '../../public/assets/icons/icon-music.svg';

// TODO : 페이지 이동 시 렌더링 방지 필요 (노이즈 유지)
const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <HeaderStyled>
      <Logo href="/">
        <LogoIcon />
      </Logo>
      <NoiseStyled>
        <NoiseButton onClick={() => setShow((prev) => !prev)}>
          <Typography
            font={FontType.LIGHT_CAPTION}
            color={TextColor.SECONDARY}
            marginLeft={16}
            marginRight={12}
          >
            백색소음
          </Typography>
          <NoiseIcon>
            <MusicIcon />
          </NoiseIcon>
        </NoiseButton>
        <NoiseController show={show}>
          <AudioPlayer title="장작소리" url="/audio/wood-fire.mp3" />
          <AudioPlayer title="파도소리" url="/audio/ocean.mp3" />
          <AudioPlayer title="빗소리" url="/audio/rain.mp3" />
          <AudioPlayer title="사람소리" url="/audio/people.mp3" />
        </NoiseController>
      </NoiseStyled>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 30px;
  left: 40px;
  right: 40px;
  z-index: 5;
`;

const Logo = styled.a``;

const NoiseStyled = styled.div`
  margin-left: 32px;
`;

const NoiseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border: 2px solid #5ce8a4;
  border-radius: 34px;
  background-color: #e8f5ef;
`;

const NoiseIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 8px;
  background-color: #5ce8a4;
`;

const NoiseController = styled.div<{ show: boolean }>`
  width: 340px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${({ show }) => (show ? '0px' : '-340px')};
  transition: 0.5s;
  padding: 40px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #f1f3f4;
  z-index: -1;
`;

export default Header;
