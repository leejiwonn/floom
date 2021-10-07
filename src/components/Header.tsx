import styled from '@emotion/styled';
import { useState } from 'react';

import AudioPlayer from '~/components/AudioPlayer';

// TODO : 페이지 이동 시 렌더링 방지 필요 (노이즈 유지)
const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <HeaderStyled>
      <Logo href="/home">LOGO</Logo>
      <NoiseStyled>
        <NoiseButton onClick={() => setShow((prev) => !prev)}>
          Noise
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
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 44px;
  left: 48px;
  z-index: 999;
`;

const Logo = styled.a`
  font-size: 18px;
  font-weight: bold;
`;

const NoiseStyled = styled.div`
  margin-left: 32px;
`;

const NoiseButton = styled.button``;

const NoiseController = styled.div<{ show: boolean }>`
  width: 260px;
  height: 200px;
  position: fixed;
  top: 48px;
  left: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: ${({ show }) => (show ? '0px' : '-300px')};
  padding: 10px;
  border-radius: 30px;
  background-color: #f1f3f4;
`;

export default Header;
