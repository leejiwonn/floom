import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';

import { Music } from '~/types/Music';
import { BasicColor } from '~/utils/color';
import PlaylistControls from './PlaylistControls';
import Typography from './Typography';

interface Props {
  playlist: Music[];
  controls?: boolean;
}

const Playlist = ({ playlist, controls }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef(
    typeof Audio !== 'undefined' && new Audio(playlist?.[0]?.url),
  );

  const timelineRef = useRef(null);
  const playheadRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [isPlaying]);

  const updatePlayer = () => {
    const currentMusic = playlist[currentIndex];
    playerRef.current.src = currentMusic.url;
    playerRef.current.load();
  };

  const handlePrevButtonClick = () => {
    setCurrentIndex((prev) => (prev + playlist.length - 1) % playlist.length);
    updatePlayer();
    setIsPlaying(true);
    playerRef.current.play();
  };

  const handleNextButtonClick = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    updatePlayer();
    setIsPlaying(true);
    playerRef.current.play();
  };

  useEffect(() => {
    playerRef.current.addEventListener('timeupdate', timeUpdate, false);
  }, [playerRef]);

  const timeUpdate = () => {
    if (controls) {
      const duration = playerRef.current.duration;
      const playPercent = 100 * (playerRef.current.currentTime / duration);
      playheadRef.current.style.width = playPercent + '%';
    }
    const currentTime = formatTime(
      parseInt(String(playerRef.current.currentTime)),
    );
    setCurrentTime(currentTime);
  };

  const formatTime = (currentTime: number) => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const currentsSeconds = seconds >= 10 ? seconds : '0' + (seconds % 60);

    const formatTime = minutes + ':' + currentsSeconds;

    return formatTime;
  };

  return (
    <PlaylistStyled>
      {controls && (
        <PlaylistControls
          music={playlist[currentIndex]}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          onPrevButtonClick={handlePrevButtonClick}
          onNextButtonClick={handleNextButtonClick}
          timelineRef={timelineRef}
          playheadRef={playheadRef}
        />
      )}
      <PlaylistView>
        {playlist?.map((value, index) => (
          <PlaylistItem
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              updatePlayer();
              setIsPlaying(true);
              playerRef.current.play();
            }}
          >
            <PlaylistItemInfo>
              <Typography>{value.name}</Typography>
              <Typography>{value.author}</Typography>
            </PlaylistItemInfo>
            <Typography>
              {currentIndex === index ? currentTime : value.duration}
            </Typography>
          </PlaylistItem>
        ))}
      </PlaylistView>
    </PlaylistStyled>
  );
};

const PlaylistStyled = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${BasicColor.WHITE};
  z-index: 99;
`;

const PlaylistView = styled.div`
  width: 100%;
  overflow: scroll;
  padding: 20px;
`;

const PlaylistItem = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PlaylistItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Playlist;
