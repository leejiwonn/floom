import styled from '@emotion/styled';
import { useState } from 'react';

import Header from '../components/Header';
import { useCategoryRooms } from '../hooks/useRoom';

const Home = () => {
  const [category, setCategory] = useState('work');
  const { data } = useCategoryRooms(category);

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
          {data?.map((room, i) => (
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
