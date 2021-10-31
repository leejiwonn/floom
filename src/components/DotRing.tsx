import styled from '@emotion/styled';
import { useContext } from 'react';

import useMousePosition from '~/hooks/useMousePosition';
import { MouseContext } from '~/context/mouseContext';

import MouseEmoji from '../../public/assets/emojis/emoji-mouse.svg';
import MouseHoverEmoji from '../../public/assets/emojis/emoji-mouse-hover.svg';

const DotRing = () => {
  const { cursorType } = useContext(MouseContext);
  const { x, y } = useMousePosition();

  return (
    <DotRingStyled style={{ left: `${x}px`, top: `${y}px` }}>
      {cursorType === 'hovered' ? (
        <MouseHoverEmoji width="50px" height="50px" />
      ) : (
        <MouseEmoji width="25px" height="25px" />
      )}
    </DotRingStyled>
  );
};

const DotRingStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  -webkit-transition-duration: 50ms;
  transition-duration: 50ms;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: 999;
`;

export default DotRing;
