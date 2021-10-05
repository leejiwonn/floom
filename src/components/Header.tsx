import styled from '@emotion/styled';
import { useState } from 'react';

import Player from '../components/Player';

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
          <NoiseItem>
            <NoiseTitle>장작소리</NoiseTitle>
            <Player url="/audio/wood-fire.mp3" />
          </NoiseItem>
          <NoiseItem>
            <NoiseTitle>파도소리</NoiseTitle>
            <Player url="/audio/ocean.mp3" />
          </NoiseItem>
          <NoiseItem>
            <NoiseTitle>빗소리</NoiseTitle>
            <Player url="/audio/rain.mp3" />
          </NoiseItem>
          <NoiseItem>
            <NoiseTitle>사람소리</NoiseTitle>
            <Player url="/audio/people.mp3" />
          </NoiseItem>
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
  background-color: #f1f3f4;
  margin-top: ${({ show }) => (show ? '0px' : '-300px')};
  padding: 10px;
  border-radius: 30px;
`;

const NoiseItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const NoiseTitle = styled.span``;

export default Header;
