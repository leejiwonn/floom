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
          백색소음
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
  top: 45px;
  left: 50px;
  right: 50px;
  z-index: 5;
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
