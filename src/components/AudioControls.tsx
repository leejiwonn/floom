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
          <PauseIcon width="4em" height="4em" fill={BasicColor.BLACK} />
        </AudioControlButton>
      ) : (
        <AudioControlButton onClick={onPlayPauseClick}>
          <PlayIcon width="4em" height="4em" fill={BasicColor.BLACK} />
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
  padding-right: 1em;
`;

const AudioSoundControl = styled.input<{ volume: number }>`
  -webkit-appearance: none;
  width: 8em;
  height: 0.7em;
  position: relative;
  overflow: hidden;
  border-radius: 0.5em;
  background-color: transparent;
  z-index: 1;

  :focus {
    outline: none;
  }

  ::before {
    position: absolute;
    content: '';
    top: 0.3em;
    left: 0;
    width: ${({ volume }) => volume + '%'};
    height: 0.1em;
    background-color: ${BasicColor.BLACK};
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.7em;
    height: 0.7em;
    position: relative;
    top: -0.3em;
    background-color: ${BasicColor.BLACK};
    border-radius: 50%;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.1em;
    background: ${BasicColor.GRAY60};
  }
  ::-moz-range-track {
    width: 100%;
    height: 0.1em;
    background: ${BasicColor.GRAY60};
  }
  ::-ms-fill-upper {
    width: 100%;
    height: 0.1em;
    background: ${BasicColor.GRAY60};
  }
`;

export default AudioControls;
