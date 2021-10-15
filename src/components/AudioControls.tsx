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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;

const AudioSoundControlBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  }
`;

const AudioSoundControlBackground = styled.div`
  width: 100%;
  height: 1px;
  position: absolute;
  left: 0;
  right: 0;
  background-color: ${BasicColor.BLACK};
  z-index: 0;
`;

const AudioSoundControl = styled.input`
  -webkit-appearance: none;
  width: 80px;
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
    background-color: ${BasicColor.BLACK};
    border-radius: 50%;
    box-shadow: 102px 0 0 100px ${BasicColor.WHITE};
  }
`;

export default AudioControls;
