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
      <AudioSoundControl
        type="range"
        value={volume}
        step="1"
        min="0"
        max="100"
        onChange={(e) => onAudioSoundControl(Number(e.target.value))}
      />
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

const AudioSoundControl = styled.input`
  -webkit-appearance: none;
  width: 120px;
  height: 4px;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;

  :focus {
    outline: none;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 4px;
    height: 4px;
    background: ${GraphicColor.BLUE1_D};
    border-radius: 50%;
    box-shadow: -102px 0 0 100px ${GraphicColor.BLUE2_D};
  }
`;

export default AudioControls;
