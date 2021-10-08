import styled from '@emotion/styled';

interface Props {
  type: string;
  url: string;
}

const Screen = ({ type, url }: Props) => {
  return <>{type === 'image' && <ImageScreen url={url} />}</>;
};

const ImageScreen = styled.img<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

export default Screen;
