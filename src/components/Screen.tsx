import styled from '@emotion/styled';
import { BasicColor } from '~/utils/color';

import CloseIcon from '../../public/assets/icons/icon-close.svg';

interface Props {
  type: string;
  url: string;
  isFull?: boolean;
  onFullButtonClick?: () => void;
}

const Screen = ({ isFull = true, onFullButtonClick, type, url }: Props) => {
  return (
    <ScreenStyled isFull={isFull}>
      {type === 'image' && <ImageScreen url={url} />}
      {onFullButtonClick && (
        <ScreenButton onClick={onFullButtonClick}>
          <CloseIcon stroke={BasicColor.WHITE} />
        </ScreenButton>
      )}
    </ScreenStyled>
  );
};

const ScreenStyled = styled.div<{ isFull: boolean }>`
  width: 100%;
  height: 100%;
  display: ${({ isFull }) => (isFull ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 97;
`;

const ImageScreen = styled.img<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

const ScreenButton = styled.button`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 50px;
  background-color: rgba(236, 241, 250, 0.6);
  border: 2px solid ${BasicColor.BLUE10};
  border-radius: 50%;
  z-index: 999;
`;

export default Screen;
