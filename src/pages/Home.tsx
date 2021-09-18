import styled from '@emotion/styled';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';

import Mesh from '../components/Mesh';
import Obj from '../components/Obj';

const Home = () => {
  const [user, setUser] = useState('');
  const [textInput, setTextInput] = useState(user);

  useEffect(() => {
    axios.get(`/api/user?token=user`).then((res) => {
      console.log(res.data);
      setUser(res.data.name);
    });
  }, []);

  const handleChangeInput = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handleSubmitButtonClick = () => {
    axios
      .post(`/api/user?token=user`, {
        name: textInput,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.name);
      });
  };

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
        <TextInputStyled>
          <TextInput
            type="text"
            placeholder="변경할 닉네임을 입력해주세요."
            value={textInput}
            onChange={handleChangeInput}
          />
          <SubmitButton onClick={handleSubmitButtonClick}>
            변경하기
          </SubmitButton>
        </TextInputStyled>
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

const HomeTitle = styled.p`
  font-size: 120px;
  font-weight: bold;
  z-index: 2;
`;

const UserTitle = styled.p`
  position: absolute;
  top: 50px;
  left: 50px;
`;

const TextInputStyled = styled.div`
  position: absolute;
  top: 50px;
  left: 200px;
`;

const TextInput = styled.input`
  width: 200px;
`;

const SubmitButton = styled.button``;

export default Home;
