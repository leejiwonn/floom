import styled from '@emotion/styled';

import { BasicColor } from '~/utils/color';

import PlayIcon from '../../public/assets/icons/icon-play.svg';
import PauseIcon from '../../public/assets/icons/icon-pause.svg';

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
          <PauseIcon fill={BasicColor.BLACK} />
        </AudioControlButton>
      ) : (
        <AudioControlButton onClick={onPlayPauseClick}>
          <PlayIcon fill={BasicColor.BLACK} />
        </AudioControlButton>
      )}
      <AudioSoundControl
        type="range"
        value={volume}
        step="1"
        min="0"
        max="100"
        onChange={(e) => onAudioSoundControl(Number(e.target.value))}
        volume={volume}
      />
    </AudioControlsStyled>
  );
};

const AudioControlsStyled = styled.div`
  display: flex;
  align-items: center;
`;

const AudioControlButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;

  svg {
    pointer-events: none;
  }
`;

const AudioSoundControl = styled.input<{ volume: number }>`
  -webkit-appearance: none;
  width: 80px;
  height: 7px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  z-index: 1;

  :focus {
    outline: none;
  }

  ::before {
    position: absolute;
    content: '';
    top: 3px;
    left: 0;
    width: ${({ volume }) => volume + '%'};
    height: 1px;
    background-color: ${BasicColor.BLACK};
    cursor: pointer;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
    position: relative;
    top: -3px;
    background-color: ${BasicColor.BLACK};
    border-radius: 50%;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    background: ${BasicColor.GRAY60};
  }
  ::-moz-range-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    background: ${BasicColor.GRAY60};
  }
  ::-ms-fill-upper {
    width: 100%;
    height: 1px;
    cursor: pointer;
    background: ${BasicColor.GRAY60};
  }
`;

export default AudioControls;
