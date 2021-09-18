import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';

import Mesh from '../components/Mesh';
import Obj from '../components/Obj';

const Home = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios
      .get('/api/user')
      .then((res) => {
        console.log(res.data);
        setUser(res.data.name);
      })
      .catch((e) => console.warn(e));
  }, []);

  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <pointLight intensity={1.5} position={[2, 3, 5]} />
        <Mesh position={[-1.2, 0, 0]} scale={[1, 1, 1]} />
        <Obj url="/assets/objs/desk.obj" position={[0, -14, -20]} />
      </Canvas>
      <HomeStyled>
        <UserTitle>Hi, {user}!</UserTitle>
        <HomeTitle>Floom</HomeTitle>
      </HomeStyled>
    </>
  );
};

const HomeStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserTitle = styled.p`
  position: absolute;
  top: 50px;
  left: 50px;
`;

const HomeTitle = styled.p`
  font-size: 120px;
  font-weight: bold;
  z-index: 2;
`;

export default Home;
