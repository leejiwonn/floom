import styled from '@emotion/styled';
import { LegacyRef } from 'react';

import { Music } from '~/types/Music';
import { BasicColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import { formatDuration } from '~/utils/format';

import NextIcon from '../../public/assets/icons/icon-next.svg';
import PauseIcon from '../../public/assets/icons/icon-pause.svg';
import PlayIcon from '../../public/assets/icons/icon-play.svg';
import PrevIcon from '../../public/assets/icons/icon-prev.svg';
import Typography from './Typography';

interface Props {
  music: Music;
  isPlaying: boolean;
  currentTime: string;
  onPlayPauseClick: () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  timelineRef: LegacyRef<HTMLDivElement>;
  playheadRef: LegacyRef<HTMLDivElement>;
}

const PlaylistControls = ({
  music,
  isPlaying,
  currentTime,
  onPlayPauseClick,
  onPrevButtonClick,
  onNextButtonClick,
  timelineRef,
  playheadRef,
}: Props) => {
  return (
    <PlaylistControlsStyled>
      <Typography
        font={FontType.BOLD_TITLE_02}
        align={Align.CENTER}
        marginBottom={5}
      >
        {music.name}
      </Typography>
      <Typography color={BasicColor.DARK70}>{music.author}</Typography>
      <MusicControls>
        <MusicControlButton onClick={onPrevButtonClick}>
          <PrevIcon />
        </MusicControlButton>
        {isPlaying ? (
          <PlayPauseButton onClick={onPlayPauseClick}>
            <PauseIcon fill={BasicColor.BLUE100} />
          </PlayPauseButton>
        ) : (
          <PlayPauseButton onClick={onPlayPauseClick}>
            <PlayIcon fill={BasicColor.BLUE100} />
          </PlayPauseButton>
        )}
        <MusicControlButton onClick={onNextButtonClick}>
          <NextIcon />
        </MusicControlButton>
      </MusicControls>
      <PlayControls>
        <Timeline ref={timelineRef}>
          <Playhead ref={playheadRef} />
        </Timeline>
        <CurrentTime>
          <Typography font={FontType.BOLD_CAPTION} color={BasicColor.BLUE100}>
            {currentTime}
          </Typography>
          <Typography font={FontType.LIGHT_CAPTION} color={BasicColor.BLUE80}>
            {formatDuration(music.duration)}
          </Typography>
        </CurrentTime>
      </PlayControls>
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
  padding: 20px;
`;

const PlayControls = styled.div`
  width: 100%;
`;

const CurrentTime = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2px;
`;

const Timeline = styled.div`
  width: 100%;
  height: 5px;
  position: relative;
  border-radius: 5px;
  background-color: ${BasicColor.DARK10};
`;

const Playhead = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 0;
  height: 5px;
  border-radius: 5px;
  background-color: ${BasicColor.BLUE100};
`;

const MusicControls = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 24px;
`;

const MusicControlButton = styled.button``;

const PlayPauseButton = styled.button`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.BLUE20};
  border: 1px solid ${BasicColor.BLUE10};
  border-radius: 50%;
`;

export default PlaylistControls;
