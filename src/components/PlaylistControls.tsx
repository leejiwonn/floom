import styled from '@emotion/styled';

import { Music } from '~/types/Music';
import { BasicColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import { formatDuration } from '~/utils/format';
import Typography from './Typography';

import NextIcon from '../../public/assets/icons/icon-next.svg';
import PauseIcon from '../../public/assets/icons/icon-pause.svg';
import PlayIcon from '../../public/assets/icons/icon-play.svg';
import PrevIcon from '../../public/assets/icons/icon-prev.svg';
import VolumeIcon from '../../public/assets/icons/icon-volume.svg';

interface Props {
  music: Music;
  isPlaying: boolean;
  currentTime: string;
  onPlayPauseClick: () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  volume: number;
  onVolumeControl: (value: number) => void;
}

const PlaylistControls = ({
  music,
  isPlaying,
  currentTime,
  onPlayPauseClick,
  onPrevButtonClick,
  onNextButtonClick,
  volume,
  onVolumeControl,
}: Props) => {
  return (
    <PlaylistControlsStyled>
      <PlayInfoStyled>
        <Typography font={FontType.BOLD_TITLE_02} align={Align.CENTER}>
          {music.name}
        </Typography>
        <PlayInfo>
          <Typography font={FontType.REGULAR_CAPTION} color={BasicColor.DARK70}>
            {music.author}
          </Typography>
          <CurrentTime>
            <Typography
              font={FontType.BOLD_CAPTION_X}
              color={BasicColor.BLUE100}
              marginRight={0.4}
            >
              {currentTime}
            </Typography>
            <Typography
              font={FontType.LIGHT_CAPTION_X}
              color={BasicColor.BLUE80}
            >
              / {formatDuration(music.duration)}
            </Typography>
          </CurrentTime>
        </PlayInfo>
      </PlayInfoStyled>
      <MusicControls>
        <VolumeControlInputStyled>
          <VolumeIcon />
          <VolumeControlInput
            type="range"
            value={volume}
            step="1"
            min="0"
            max="100"
            onChange={(e) => onVolumeControl(Number(e.target.value))}
            volume={volume}
          />
        </VolumeControlInputStyled>
        <MusicControlButtonStyled>
          <MusicControlButton onClick={onPrevButtonClick}>
            <PrevIcon width="1.2em" height="1.2em" />
          </MusicControlButton>
          {isPlaying ? (
            <MusicControlButton onClick={onPlayPauseClick}>
              <PauseIcon width="4em" height="4em" fill={BasicColor.BLUE100} />
            </MusicControlButton>
          ) : (
            <MusicControlButton onClick={onPlayPauseClick}>
              <PlayIcon width="4em" height="4em" fill={BasicColor.BLUE100} />
            </MusicControlButton>
          )}
          <MusicControlButton onClick={onNextButtonClick}>
            <NextIcon width="1.2em" height="1.2em" />
          </MusicControlButton>
        </MusicControlButtonStyled>
      </MusicControls>
    </PlaylistControlsStyled>
  );
};

const PlaylistControlsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  padding: 2em 2.5em;
`;

const PlayInfoStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const PlayInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CurrentTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.2em;
`;

const MusicControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5em;
`;

const VolumeControlInputStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VolumeControlInput = styled.input<{ volume: number }>`
  -webkit-appearance: none;
  width: 4.5em;
  height: 0.4em;
  position: relative;
  margin-left: 0.5em;

  :focus {
    outline: none;
  }

  ::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: ${({ volume }) => volume + '%'};
    height: 0.4em;
    background-color: ${BasicColor.BLUE100};
    border-radius: 0.4em 0 0 0.4em;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.8em;
    height: 0.8em;
    position: relative;
    top: -0.2em;
    background-color: ${BasicColor.BLUE100};
    border: 1px solid ${BasicColor.WHITE};
    border-radius: 50%;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.4em;
    background: ${BasicColor.GRAY10};
    border-radius: 0 0.4em 0.4em 0;
  }
  ::-moz-range-track {
    width: 100%;
    height: 0.4em;
    background: ${BasicColor.GRAY10};
    border-radius: 0 0.4em 0.4em 0;
  }
  ::-ms-fill-upper {
    width: 100%;
    height: 0.4em;
    background: ${BasicColor.GRAY10};
    border-radius: 0 0.4em 0.4em 0;
  }
`;

const MusicControlButtonStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MusicControlButton = styled.button`
  width: 3.5em;
  height: 3.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em solid ${BasicColor.BLUE40};
  border-radius: 50%;
  margin-left: 0.6em;
`;

export default PlaylistControls;
