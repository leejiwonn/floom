import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';

import Header from '../components/Header';
import Obj from '../components/Obj';
import { Room } from '../types/Room';

const Detail = () => {
  const router = useRouter();
  const [roomData, setRoomData] = useState<Room>();

  useEffect(() => {
    const getRooms = async (id: string, category: string) => {
      const { data } = await axios.get<Room>(
        `/api/rooms?category=${category}&id=${id}`,
      );
      setRoomData(data);
    };

    if (router.isReady && router.query.id != null) {
      getRooms(router.query.id as string, router.query.category as string);
    }
  }, [router]);

  return (
    <>
      <Header title={router.query.category as string} />
      <DetailStyled>
        <TitleStyled>
          <Title>{roomData?.title}</Title>
          <Creator>{roomData?.creator}</Creator>
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
        <PlayButton>체험하기</PlayButton>
      </DetailStyled>
    </>
  );
};

const DetailStyled = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
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

const PlayButton = styled.button`
  padding: 15px 100px;
  border: 1px solid #000;
`;

export default Detail;
