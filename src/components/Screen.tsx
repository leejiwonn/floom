import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import { ScreenData } from '~/types/screen';
import { BasicColor } from '~/utils/color';

import CloseIcon from '../../public/assets/icons/icon-close.svg';
import DirectionIcon from '../../public/assets/icons/icon-direction.svg';

interface Props {
  type: 'thumbnail' | 'full';
  assets: ScreenData[];
  isFull?: boolean;
  onFullButtonClick?: () => void;
}

const Screen = ({ type, assets, isFull = true, onFullButtonClick }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevButtonClick = () => {
    setCurrentIndex((prev) => (prev + assets.length - 1) % assets.length);
  };

  const handleNextButtonClick = () => {
    setCurrentIndex((prev) => (prev + assets.length + 1) % assets.length);
  };

  const close = (e: KeyboardEvent) => {
    if (e.key === 'Ese' || e.key === 'Escape') {
      onFullButtonClick?.();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', close);
    return () => {
      window.addEventListener('keydown', close);
    };
  }, []);

  return (
    <ScreenStyled type={type} isFull={isFull}>
      <ScreenBox step={currentIndex}>
        {assets?.map((asset, index) => (
          <ScreenItem key={index}>
            {asset.type === 'image' ? (
              <ImageScreen url={asset.url} />
            ) : (
              <VideoScreen src={asset.url} loop autoPlay />
            )}
          </ScreenItem>
        ))}
      </ScreenBox>
      {onFullButtonClick && (
        <>
          <ScreenButton onClick={onFullButtonClick}>
            <CloseIcon width="2.2em" height="2.2em" stroke={BasicColor.WHITE} />
          </ScreenButton>
          {assets.length > 1 && (
            <SliderButtonStyled>
              <SliderButton onClick={handlePrevButtonClick}>
                <DirectionIcon />
              </SliderButton>
              <SliderButton onClick={handleNextButtonClick}>
                <DirectionIcon style={{ transform: 'rotate(180deg)' }} />
              </SliderButton>
            </SliderButtonStyled>
          )}
        </>
      )}
    </ScreenStyled>
  );
};

const ScreenStyled = styled.div<{ type: string; isFull: boolean }>`
  width: ${({ type }) => (type === 'full' ? '100vw' : '100%')};
  height: ${({ type }) => (type === 'full' ? '100vh' : '100%')};
  display: ${({ isFull }) => (isFull ? 'flex' : 'none')};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${BasicColor.BLACK};
  z-index: 99;
`;

const ScreenBox = styled.div<{ step: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${({ step }) => step * -100 + 'vw'};
  transition: 0.2s;
`;

const ScreenItem = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

const ImageScreen = styled.img<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

const VideoScreen = styled.video`
  width: 100%;
  height: 100%;
`;

const ScreenButton = styled.button`
  width: 4em;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5em;
  bottom: 5em;
  background-color: rgba(236, 241, 250, 0.6);
  border: 0.2em solid ${BasicColor.BLUE10};
  border-radius: 50%;
  z-index: 999;
`;

const SliderButtonStyled = styled.div`
  width: 102%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: -1%;
  right: 0;
  bottom: 0;
  padding: 0 5em;
`;

const SliderButton = styled.button`
  display: flex;
  padding: 1%;
`;

export default Screen;
