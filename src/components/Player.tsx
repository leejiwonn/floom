import ReactPlayer from 'react-player';

interface Props {
  url: string;
}

// TODO : 커스텀 형태로 변경 필요
const Player = ({ url }: Props) => {
  return (
    <ReactPlayer
      width="160px"
      height="40px"
      controls
      url={url}
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload',
          },
        },
      }}
    />
  );
};

export default Player;
