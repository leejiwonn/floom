import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { GetServerSideProps } from 'next';

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
        체험하기
      </PlayButton>
    </DetailStyled>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const category = query.category as string;
  const id = query.id as string;

  if (category == null || id == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      category,
      id,
    },
  };
};

const DetailStyled = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
`;

const TitleStyled = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const Creator = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

const ObjectStyled = styled.div`
  width: 100%;
  height: 400px;
`;

const PlayButton = styled.a`
  padding: 15px 100px;
  border: 1px solid #000;
`;

export default Detail;
