import styled from '@emotion/styled';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Music } from '~/types/Music';

import { BasicColor } from '~/utils/color';
import { visuallyHidden } from '~/utils/css';
import { FontType } from '~/utils/font';
import { formatDuration } from '~/utils/format';
import PlaylistControls from './PlaylistControls';
import Typography from './Typography';

import PauseIcon from '../../public/assets/icons/icon-pause.svg';
import PlayIcon from '../../public/assets/icons/icon-play.svg';
import AddPlaylistIcon from '../../public/assets/icons/icon-add-playlist.svg';
import CheckIcon from '../../public/assets/icons/icon-check.svg';
import TrashIcon from '../../public/assets/icons/icon-trash.svg';

interface Props {
  scrollRef?: RefObject<HTMLDivElement>;
  playlist: Music[];
  viewHeight: number;
  controls?: boolean;
  autoplay?: boolean;
  size?: 'big' | 'small';
  selectedMusics?: Music[];
  onAddButtonClick?: (value: Music) => void;
  onDeleteButtonClick?: (value: Music) => void;
  simpleMode?: boolean;
  noneText?: string;
}

// 저전력 모드 등에서는 play 재생 시에 오류 발생함
const playAudioSafely = async (audio: HTMLAudioElement | null) => {
  if (audio == null) {
    return;
  }

  try {
    await audio.play();
  } catch (error) {
    console.warn(error);
  }
};

const Playlist = ({
  scrollRef,
  playlist,
  controls,
  autoplay,
  viewHeight,
  size = 'big',
  selectedMusics,
  onAddButtonClick,
  onDeleteButtonClick,
  simpleMode = false,
  noneText = '목록이 없습니다.',
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const scroll = scrollRef?.current;
    scroll?.scrollTo(0, 0);

    if (autoplay) {
      setCurrentIndex(0);
      setIsPlaying(true);
      if (playerRef.current != null) {
        playerRef.current.volume = 0;
      }
    } else {
      if (playerRef.current != null) {
        playerRef.current.volume = 0.5;
      }
    }
  }, []);

  useEffect(() => {
    if (playerRef.current != null) {
      playerRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const fadeIn = setInterval(function () {
      if (playerRef.current != null) {
        if (playerRef.current.volume < 0.5) {
          playerRef.current.volume += 0.05;
        } else {
          clearInterval(fadeIn);
        }
      }
    }, 300);
  }, [setInterval]);

  useEffect(() => {
    if (isPlaying) {
      playAudioSafely(playerRef.current);
    } else {
      playerRef.current?.pause();
    }
  }, [isPlaying]);

  const updatePlayer = (index: number) => {
    const currentMusic = playlist[index];

    if (playerRef.current != null) {
      playerRef.current.src = currentMusic.url;
      playerRef.current.load();
    }
  };

  const handlePrevButtonClick = () => {
    const index =
      ((currentIndex === null ? 0 : currentIndex) + playlist.length - 1) %
      playlist.length;

    setCurrentIndex(index);
    updatePlayer(index);
    setIsPlaying(true);
    playAudioSafely(playerRef.current);
  };

  const handleNextButtonClick = () => {
    const index =
      ((currentIndex === null ? 0 : currentIndex) + 1) % playlist.length;

    setCurrentIndex(index);
    updatePlayer(index);
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
      setCurrentTime(formatDuration(audio.currentTime));

      if (Math.floor(audio.currentTime) === Math.floor(audio.duration)) {
        handleNextButtonClick();
      }
    };

    audio.addEventListener('timeupdate', timeUpdate, false);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdate, false);
    };
  }, [handleNextButtonClick]);

  return (
    <PlaylistStyled size={size}>
      <audio ref={playerRef} src={playlist?.[0]?.url} css={visuallyHidden} />
      {controls && (
        <PlaylistControls
          music={playlist[currentIndex === null ? 0 : currentIndex]}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlayPauseClick={() => setIsPlaying((prev) => !prev)}
          onPrevButtonClick={handlePrevButtonClick}
          onNextButtonClick={handleNextButtonClick}
          volume={volume}
          onVolumeControl={(value: number) => setVolume(value)}
        />
      )}
      <PlaylistView ref={scrollRef} controls={controls} viewHeight={viewHeight}>
        {controls && (
          <Typography font={FontType.BOLD_CAPTION} color={BasicColor.DARK40}>
            플레이리스트
          </Typography>
        )}
        {playlist.length > 0 ? (
          playlist?.map((music, index) => (
            <PlaylistItemStyled
              key={index}
              last={playlist?.length !== index + 1}
              simpleMode={simpleMode}
            >
              <PlaylistItem
                onClick={() => {
                  setCurrentIndex(index);
                  updatePlayer(index);
                  setIsPlaying((prev) =>
                    currentIndex === index ? !prev : true,
                  );
                  playAudioSafely(playerRef.current);
                }}
              >
                <PlaylistLeftView>
                  <PlayPauseButton simpleMode={simpleMode}>
                    {isPlaying && currentIndex === index ? (
                      <PauseIcon
                        width="4em"
                        height="4em"
                        fill={BasicColor.BLUE100}
                      />
                    ) : (
                      <PlayIcon
                        width="4em"
                        height="4em"
                        fill={BasicColor.BLUE100}
                      />
                    )}
                  </PlayPauseButton>
                  <PlaylistItemInfo size={size}>
                    <Typography
                      font={
                        size === 'big'
                          ? FontType.BOLD_BODY
                          : FontType.BOLD_CAPTION
                      }
                      textOverflow
                      textOverflowSize={1}
                    >
                      {music.name}
                    </Typography>
                    <Typography
                      font={
                        size === 'big'
                          ? FontType.REGULAR_CAPTION
                          : FontType.LIGHT_CAPTION_X
                      }
                      color={BasicColor.DARK70}
                      textOverflow
                      textOverflowSize={1}
                    >
                      {music.author}
                    </Typography>
                  </PlaylistItemInfo>
                </PlaylistLeftView>
                {!simpleMode && (
                  <Typography
                    font={
                      size === 'big'
                        ? FontType.REGULAR_CAPTION
                        : FontType.LIGHT_CAPTION_X
                    }
                    color={BasicColor.DARK40}
                  >
                    {currentIndex === index
                      ? currentTime
                      : formatDuration(music.duration)}
                  </Typography>
                )}
              </PlaylistItem>
              {onAddButtonClick && (
                <PlaylistIconStyled
                  onClick={() => {
                    if (selectedMusics?.includes(music)) {
                      return;
                    }
                    onAddButtonClick?.(music);
                  }}
                  disable={!!selectedMusics?.includes(music)}
                >
                  {selectedMusics?.includes(music) ? (
                    <SubmitPlaylistIconStyled>
                      <CheckIcon
                        width="1.5em"
                        height="1.3em"
                        stroke={BasicColor.WHITE}
                      />
                    </SubmitPlaylistIconStyled>
                  ) : (
                    <AddPlaylistIcon width="3.6em" height="3.6em" />
                  )}
                </PlaylistIconStyled>
              )}
              {onDeleteButtonClick && (
                <PlaylistIconStyled
                  onClick={() => onDeleteButtonClick(music)}
                  disable={false}
                >
                  <TrashIcon width="4.1em" height="3.6em" />
                </PlaylistIconStyled>
              )}
            </PlaylistItemStyled>
          ))
        ) : (
          <Typography
            font={FontType.SEMI_BOLD_BODY}
            color={BasicColor.DARK70}
            marginTop={1.5}
          >
            {noneText}
          </Typography>
        )}
      </PlaylistView>
    </PlaylistStyled>
  );
};

const PlaylistStyled = styled.div<{ size: 'big' | 'small' }>`
  width: ${({ size }) => (size === 'big' ? '34em' : '26em')};
  height: auto;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const PlaylistView = styled.div<{ controls?: boolean; viewHeight: number }>`
  width: 100%;
  height: ${({ viewHeight }) => viewHeight + 'vh'};
  overflow: auto;
  background-color: ${({ controls }) => controls && BasicColor.GRAY20};
  border: ${({ controls }) =>
    controls ? `0.1em solid ${BasicColor.GRAY70}` : 'none'};
  padding: ${({ controls }) => (controls ? '1.5em' : 0)};
`;

const PlaylistItemStyled = styled.div<{ last: boolean; simpleMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ simpleMode }) => (simpleMode ? '1em' : '1.4em 0')};
  border-bottom: ${({ last, simpleMode }) =>
    !simpleMode && last ? `0.1em solid ${BasicColor.GRAY70}` : 'none'};
  background-color: ${({ simpleMode }) => simpleMode && BasicColor.WHITE};
  border-radius: ${({ simpleMode }) => simpleMode && '1em'};
  margin-bottom: ${({ simpleMode }) => simpleMode && '1em'};
`;

const PlaylistItem = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PlaylistLeftView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PlayPauseButton = styled.div<{ simpleMode: boolean }>`
  width: 3.5em;
  height: 3.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ simpleMode }) => !simpleMode && BasicColor.BLUE10};
  border-radius: 50%;
  margin-right: ${({ simpleMode }) => (simpleMode ? '1em' : '1.5em')};
  pointer-events: none;
`;

const PlaylistItemInfo = styled.div<{ size: 'big' | 'small' }>`
  width: ${({ size }) => (size === 'big' ? '75%' : '65%')};
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
`;

const SubmitPlaylistIconStyled = styled.div`
  width: 3em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${BasicColor.BLUE100};
  margin-left: 0.6em;
`;

const PlaylistIconStyled = styled.button<{ disable: boolean }>`
  margin-left: 1.5em;
  padding-left: 0.5em;
  border-left: 0.1em solid ${BasicColor.GRAY70};
  pointer-events: ${({ disable }) => disable && 'none'};
`;

export default Playlist;
