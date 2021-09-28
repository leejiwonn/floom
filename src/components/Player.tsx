import ReactPlayer from 'react-player';

interface Props {
  url: string;
}

const Player = ({ url }: Props) => {
  return <ReactPlayer width="100%" height="40px" controls url={url} />;
};

export default Player;
