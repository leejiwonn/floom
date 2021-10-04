import styled from '@emotion/styled';
import { useState } from 'react';

import { useCategoryRooms } from '../hooks/useRoom';

const Home = () => {
  const [category, setCategory] = useState('work');
  const { data } = useCategoryRooms(category);

  return (
    <HomeStyled>
      <GateStyled>
        <GateTitle>
          <span>몰입</span>의 즐거움을 <br /> 경험하다!
        </GateTitle>
      </GateStyled>
      <CategoryStyled>
        <CategoryTitle>어떤 일에 몰입하고 싶은가요?</CategoryTitle>
        <CategoryList>
          <CategoryItem onClick={() => setCategory('work')}>
            <CategoryItemIcon />
            <CategoryItemText>업무</CategoryItemText>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('study')}>
            <CategoryItemIcon />
            <CategoryItemText>학습</CategoryItemText>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('rest')}>
            <CategoryItemIcon />
            <CategoryItemText>휴식</CategoryItemText>
          </CategoryItem>
        </CategoryList>
      </CategoryStyled>
      <RoomsStyled>
        {data?.map((room, i) => (
          <RoomStyled
            href={`/detail?category=${category}&id=${room.id}`}
            key={i}
          >
            <RoomThumbnail src={room.screen} />
            <RoomTitle>{room.title}</RoomTitle>
            <RoomSubTitle>{room.creator}</RoomSubTitle>
          </RoomStyled>
        ))}
      </RoomsStyled>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding-bottom: 50px;
`;

const GateStyled = styled.div`
  width: 100%;
  height: 400px;
  padding-top: 140px;
  padding-left: 60px;
`;

const GateTitle = styled.p`
  font-size: 64px;
  font-weight: 800;
  color: #2e2e2e;

  span {
    color: #587bfa;
  }
`;

const CategoryStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  margin: 50px 0;
  background-color: #587bfa;
`;

const CategoryTitle = styled.p`
  font-size: 42px;
  font-weight: 800;
  color: #ffffff;
  padding-bottom: 50px;
`;

const CategoryList = styled.div``;

const CategoryItem = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
`;

const CategoryItemIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #dfe9fb;
  border-radius: 30px;
  margin-bottom: 10px;
`;

const CategoryItemText = styled.p`
  font-size: 21px;
  font-weight: 400;
  color: #fff;
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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px;
`;

const RoomThumbnail = styled.img`
  border-radius: 10px;
  margin-bottom: 10px;
`;

const RoomTitle = styled.p`
  font-size: 21px;
  font-weight: 400;
  color: #000;
`;

const RoomSubTitle = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #000;
`;

export default Home;
