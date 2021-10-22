import styled from '@emotion/styled';
import { useState, useRef, useEffect, memo } from 'react';

import { FontType } from '~/utils/font';
import Typography from './Typography';
import AudioControls from './AudioControls';
import { visuallyHidden } from '~/utils/css';

interface Props {
  title: string;
  url: string;
}

// 저전력 모드 등에서는 play 재생 시에 오류 발생함
const playAudioSafely = async (audio: HTMLAudioElement) => {
  try {
    await audio.play();
  } catch (error) {
    console.warn(error);
  }
};

const AudioPlayer = ({ title, url }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio == null) {
      return;
    }

    if (isPlaying) {
      playAudioSafely(audio);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current != null) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleAudioSoundControl = (value: number) => {
    setVolume(value);
  };

  return (
    <AudioPlayerStyled>
      <audio
        ref={audioRef}
        preload="auto"
        loop
        src={url}
        css={visuallyHidden}
      />
      <Typography font={FontType.BOLD_BODY} marginRight={30}>
        {title}
      </Typography>
      <AudioControls
        isPlaying={isPlaying}
        onPlayPauseClick={() => setIsPlaying((prev) => !prev)}
        volume={volume}
        onAudioSoundControl={(value) => handleAudioSoundControl(value)}
      />
    </AudioPlayerStyled>
  );
};

const AudioPlayerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export default memo(AudioPlayer);
