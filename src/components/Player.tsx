import ReactPlayer from 'react-player';

interface Props {
  url: string;
}

const Player = ({ url }: Props) => {
  return (
    <ReactPlayer
      width="140px"
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
