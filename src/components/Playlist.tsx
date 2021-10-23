import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import MUSIC from '~/constants/music';

import { BasicColor } from '~/utils/color';
import { visuallyHidden } from '~/utils/css';
import { FontType } from '~/utils/font';
import PlaylistControls from './PlaylistControls';
import Typography from './Typography';

import PlayIcon from '../../public/assets/icons/icon-play.svg';
import PauseIcon from '../../public/assets/icons/icon-pause.svg';

interface Props {
  playlist: Array<keyof typeof MUSIC>;
  viewHeight: number;
  controls?: boolean;
  autoplay?: boolean;
  size?: 'big' | 'small';
}

// 저전력 모드 등에서는 play 재생 시에 오류 발생함
const playAudioSafely = async (audio?: HTMLAudioElement) => {
  if (audio == null) {
    return;
  }

  try {
    await audio.play();
  } catch (error) {
    console.warn(error);
  }
};

const formatTime = (currentTime: number) => {
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const currentsSeconds = seconds >= 10 ? seconds : '0' + (seconds % 60);

  const formatTime = minutes + ':' + currentsSeconds;

  return formatTime;
};

const Playlist = ({
  playlist,
  controls,
  autoplay,
  viewHeight,
  size = 'big',
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<HTMLAudioElement>(null);

  const timelineRef = useRef(null);
  const playheadRef = useRef(null);

  useEffect(() => {
    autoplay && setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      playAudioSafely(playerRef.current);
    } else {
      playerRef.current?.pause();
    }
  }, [isPlaying]);

  const updatePlayer = (index: number) => {
    const currentMusic = MUSIC[playlist[index]];

    if (playerRef.current != null) {
      playerRef.current.src = currentMusic.url;
      playerRef.current.load();
    }
  };

  const handlePrevButtonClick = () => {
    setCurrentIndex((prev) => (prev + playlist.length - 1) % playlist.length);
    updatePlayer(currentIndex);
    setIsPlaying(true);
    playAudioSafely(playerRef.current);
  };

  const handleNextButtonClick = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    updatePlayer(currentIndex);
    setIsPlaying(true);
    playAudioSafely(playerRef.current);
  };

  useEffect(() => {
    const audio = playerRef.current;

    if (audio == null) {
      return;
    }

    const timeUpdate = () => {
      if (audio == null) {
        return;
      }

      if (controls) {
        const duration = audio.duration;
        const playPercent = 100 * (audio.currentTime / duration);
        audio.style.width = playPercent + '%';
      }
      const currentTime = formatTime(parseInt(String(audio.currentTime)));
      setCurrentTime(currentTime);

      if (currentTime === MUSIC[playlist[currentIndex]].duration) {
        handleNextButtonClick();
      }
    };

    audio.addEventListener('timeupdate', timeUpdate, false);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdate, false);
    };
  }, []);

  return (
    <PlaylistStyled size={size}>
      <audio
        ref={playerRef}
        src={MUSIC[playlist?.[0]]?.url}
        css={visuallyHidden}
      />
      {controls && (
        <PlaylistControls
          music={MUSIC[playlist[currentIndex]]}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlayPauseClick={() => setIsPlaying((prev) => !prev)}
          onPrevButtonClick={handlePrevButtonClick}
          onNextButtonClick={handleNextButtonClick}
          timelineRef={timelineRef}
          playheadRef={playheadRef}
        />
      )}
      <PlaylistView controls={controls} viewHeight={viewHeight}>
        {playlist?.map((value, index) => (
          <PlaylistItem
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              updatePlayer(index);
              setIsPlaying((prev) => !prev);
            }}
            last={playlist.length !== index + 1}
          >
            <PlaylistLeftView>
              <PlayPauseButton>
                {isPlaying && currentIndex === index ? (
                  <PauseIcon fill={BasicColor.BLUE100} />
                ) : (
                  <PlayIcon fill={BasicColor.BLUE100} />
                )}
              </PlayPauseButton>
              <PlaylistItemInfo>
                <Typography
                  font={
                    size === 'big' ? FontType.BOLD_TITLE_02 : FontType.BOLD_BODY
                  }
                  marginBottom={5}
                >
                  {MUSIC[value].name}
                </Typography>
                <Typography
                  font={
                    size === 'big'
                      ? FontType.REGULAR_BODY
                      : FontType.REGULAR_CAPTION
                  }
                  color={BasicColor.DARK70}
                >
                  {MUSIC[value].author}
                </Typography>
              </PlaylistItemInfo>
            </PlaylistLeftView>
            <Typography
              font={FontType.REGULAR_CAPTION}
              color={BasicColor.DARK40}
            >
              {currentIndex === index ? currentTime : MUSIC[value].duration}
            </Typography>
          </PlaylistItem>
        ))}
      </PlaylistView>
    </PlaylistStyled>
  );
};

const PlaylistStyled = styled.div<{ size: 'big' | 'small' }>`
  width: ${({ size }) => (size === 'big' ? '340px' : '240px')};
  height: auto;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const PlaylistView = styled.div<{ controls: boolean; viewHeight: number }>`
  width: 100%;
  height: ${({ viewHeight }) => viewHeight + 'vh'};
  overflow: auto;
  background-color: ${({ controls }) => controls && BasicColor.DARK10};
  border: ${({ controls }) =>
    controls ? `1px solid ${BasicColor.GRAY70}` : 'none'};
  padding: ${({ controls }) => (controls ? '15px' : 0)};
`;

const PlaylistItem = styled.button<{ last: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: ${({ last }) =>
    last ? `1px solid ${BasicColor.GRAY70}` : 'none'};
`;

const PlaylistLeftView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PlayPauseButton = styled.div`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.BLUE10};
  border-radius: 50%;
  margin-right: 20px;
  pointer-events: none;
`;

const PlaylistItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Playlist;
