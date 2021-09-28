import styled from '@emotion/styled';
import { useState } from 'react';

import Player from '../components/Player';

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <HeaderStyled>
      <LeftStyled>Dark Mode</LeftStyled>
      <Logo href="/home">Floom</Logo>
      <RightStyled>
        <NoiseButton onClick={() => setShow((prev) => !prev)}>
          Noise
        </NoiseButton>
        <NoiseController show={show}>
          <Player url="/audio/wood-fire.mp3" />
          <Player url="/audio/ocean.mp3" />
          <Player url="/audio/rain.mp3" />
          <Player url="/audio/people.mp3" />
        </NoiseController>
      </RightStyled>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #000;
  z-index: 999;
`;

const Logo = styled.a`
  font-size: 18px;
  font-weight: bold;
`;

const LeftStyled = styled.div`
  position: absolute;
  left: 20px;
`;

const RightStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
`;

const NoiseButton = styled.button``;

const NoiseController = styled.div<{ show: boolean }>`
  width: 200px;
  height: 200px;
  position: fixed;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #000;
  background-color: #fff;
  margin-top: ${({ show }) => (show ? '0px' : '-300px')};
  padding: 10px;
`;

export default Header;
