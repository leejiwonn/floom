import styled from '@emotion/styled';
import { LegacyRef } from 'react';

import { Music } from '~/types/Music';
import { BasicColor } from '~/utils/color';
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
      <Typography color={BasicColor.WHITE}>{music.name}</Typography>
      <Typography color={BasicColor.WHITE}>{music.author}</Typography>
      <MusicControls>
        <MusicControlButton onClick={onPrevButtonClick}>
          <Typography color={BasicColor.WHITE}>이전</Typography>
        </MusicControlButton>
        {isPlaying ? (
          <PlayButton onClick={onPlayPauseClick}>
            <Typography color={BasicColor.WHITE}>정지</Typography>
          </PlayButton>
        ) : (
          <PlayButton onClick={onPlayPauseClick}>
            <Typography color={BasicColor.WHITE}>재생</Typography>
          </PlayButton>
        )}
        <MusicControlButton onClick={onNextButtonClick}>
          <Typography color={BasicColor.WHITE}>다음</Typography>
        </MusicControlButton>
      </MusicControls>
      <PlayControls>
        <Timeline ref={timelineRef}>
          <Playhead ref={playheadRef} />
        </Timeline>
        <CurrentTime>
          <Typography color={BasicColor.WHITE}>{currentTime}</Typography>
          <Typography color={BasicColor.WHITE}>{music.duration}</Typography>
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
  background-color: ${BasicColor.BLUE100};
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
  background-color: #9cb2fb;
`;

const Playhead = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 0;
  height: 5px;
  border-radius: 5px;
  background-color: ${BasicColor.WHITE};
`;

const MusicControls = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const MusicControlButton = styled.button``;

const PlayButton = styled.button``;

export default PlaylistControls;
