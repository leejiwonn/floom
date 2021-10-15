import styled from '@emotion/styled';
import { GraphicColor } from '~/utils/color';

import Typography from './Typography';

interface Props {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  volume: number;
  onAudioSoundControl: (value: number) => void;
}

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  volume,
  onAudioSoundControl,
}: Props) => {
  return (
    <AudioControlsStyled>
      {isPlaying ? (
        <AudioControlButton onClick={onPlayPauseClick}>
          <Typography>정지</Typography>
        </AudioControlButton>
      ) : (
        <AudioControlButton onClick={onPlayPauseClick}>
          <Typography>재생</Typography>
        </AudioControlButton>
      )}
      <AudioSoundControlBox>
        <AudioSoundControlBackground />
        <AudioSoundControl
          type="range"
          value={volume}
          step="1"
          min="0"
          max="100"
          onChange={(e) => onAudioSoundControl(Number(e.target.value))}
        />
      </AudioSoundControlBox>
    </AudioControlsStyled>
  );
};

const AudioControlsStyled = styled.div`
  display: flex;
  align-items: center;
`;

const AudioControlButton = styled.button`
  padding: 0 10px;
`;

const AudioSoundControlBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AudioSoundControlBackground = styled.div`
  width: 100%;
  height: 1px;
  position: absolute;
  left: 0;
  right: 0;
  background-color: ${GraphicColor.BLACK};
  z-index: 0;
`;

const AudioSoundControl = styled.input`
  -webkit-appearance: none;
  width: 120px;
  height: 7px;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  z-index: 1;

  :focus {
    outline: none;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
    background-color: ${GraphicColor.BLACK};
    border-radius: 50%;
    box-shadow: 102px 0 0 100px ${GraphicColor.WHITE};
  }
`;

export default AudioControls;
