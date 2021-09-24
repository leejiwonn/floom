import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import { Room } from '../types/Room';

const Home = () => {
  const [category, setCategory] = useState('work');
  const [rooms, setRooms] = useState<Room[]>();

  useEffect(() => {
    axios.get(`/api/rooms?category=${category}`).then((res) => {
      setRooms(res.data);
    });
  }, [category]);

  return (
    <>
      <Header />
      <HomeStyled>
        <CategoryStyled>
          <Category onClick={() => setCategory('work')}>업무</Category>
          <Category onClick={() => setCategory('study')}>학습</Category>
          <Category onClick={() => setCategory('rest')}>휴식</Category>
        </CategoryStyled>
        <RoomsStyled>
          {rooms?.map((room, i) => (
            <RoomStyled
              href={`/detail?category=${category}&id=${room.id}`}
              key={i}
            >
              <p>{room.title}</p>
            </RoomStyled>
          ))}
        </RoomsStyled>
      </HomeStyled>
    </>
  );
};

const HomeStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryStyled = styled.div`
  margin: 50px 0;
`;

const Category = styled.button`
  padding: 10px 20px;
  border: 1px solid #000;
  margin: 0 10px;
`;

const RoomsStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
`;

const RoomStyled = styled.a`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  cursor: pointer;
  margin: 0 10px;
`;

export default Home;
