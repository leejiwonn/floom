import styled from '@emotion/styled';

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

const AudioControlsStyled = styled.div``;

const AudioControlButton = styled.button`
  padding: 0 10px;
`;

const AudioSoundControl = styled.input``;

export default AudioControls;
