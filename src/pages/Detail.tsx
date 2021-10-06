import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';

import Obj from '../components/Obj';
import { useRoom } from '../hooks/useRoom';

interface Props {
  category: string;
  id: string;
}

const Detail = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);

  return (
    <DetailStyled>
      <TitleStyled>
        <TitleDecoration />
        <Title>{data?.title}</Title>
        <Creator>{data?.creator}</Creator>
      </TitleStyled>
      <ObjectStyled>
        <Canvas
          camera={{ position: [0, 0, 240], fov: 80 }}
          style={{
            width: '100%',
            height: '100%',
            top: 40,
          }}
        >
          <ambientLight />
          <pointLight intensity={1.5} position={[200, 250, 50]} />
          <Obj url="/assets/objs/speaker.obj" position={[-240, -60, 0]} />
          <Obj url="/assets/objs/light.obj" position={[0, 0, 0]} />
          <Obj url="/assets/objs/photo.obj" position={[220, -50, 0]} />
        </Canvas>
      </ObjectStyled>
      <PlayButton href={`/play?category=${category}&id=${id}`}>
        체험해볼래요!
      </PlayButton>
    </DetailStyled>
  );
};

const DetailStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  background-color: #f5f2ed;
`;

const TitleStyled = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
`;

const TitleDecoration = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  left: -5px;
  background-color: #5ce8a4;
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const Creator = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #777;
`;

const ObjectStyled = styled.div`
  width: 100%;
  height: 400px;
`;

const PlayButton = styled.a`
  padding: 15px 60px;
  background-color: #587bfa;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export default Detail;
