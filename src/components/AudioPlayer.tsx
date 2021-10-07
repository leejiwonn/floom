import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';

import Typography from './Typography';
import AudioControls from './AudioControls';

interface Props {
  title: string;
  url: string;
}

// TODO : 외부 클릭 시 닫히도록 적용 필요
const AudioPlayer = ({ title, url }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const audioRef = useRef(typeof Audio !== 'undefined' && new Audio(url));

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    audioRef.current.volume = volume / 100;
  }, [isPlaying]);

  const handleAudioSoundControl = (value: number) => {
    setVolume(value);
    audioRef.current.volume = volume / 100;
  };

  return (
    <AudioPlayerStyled>
      <Typography>{title}</Typography>
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
`;

export default AudioPlayer;
