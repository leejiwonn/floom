import styled from '@emotion/styled';
import { useState } from 'react';

import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { useCategoryRooms } from '~/hooks/useRoom';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

// TODO : 스크롤 유지 or 데이터 미리 불러오는 방법으로 깜빡임 해결 필요
const Home = () => {
  const [category, setCategory] = useState('work');
  const { data } = useCategoryRooms(category);

  return (
    <HomeStyled>
      <GateStyled>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_01}
          color={TextColor.PRIMARY}
        >
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_01}
            color={TextColor.SECONDARY}
          >
            몰입
          </Typography>
          의 즐거움을 <br /> 경험하다!
        </Typography>
      </GateStyled>
      <CategoryStyled>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_02}
          color={TextColor.WHITE}
          marginBottom={50}
        >
          어떤 일에 몰입하고 싶은가요?
        </Typography>
        <CategoryList>
          <CategoryItem onClick={() => setCategory('work')}>
            <CategoryItemIcon />
            <Typography
              font={FontType.REGULAR_TITLE_01}
              color={TextColor.WHITE}
            >
              업무
            </Typography>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('study')}>
            <CategoryItemIcon />
            <Typography
              font={FontType.REGULAR_TITLE_01}
              color={TextColor.WHITE}
            >
              학습
            </Typography>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('rest')}>
            <CategoryItemIcon />
            <Typography
              font={FontType.REGULAR_TITLE_01}
              color={TextColor.WHITE}
            >
              휴식
            </Typography>
          </CategoryItem>
        </CategoryList>
      </CategoryStyled>
      <RoomsStyled>
        {data?.map((room, i) => (
          <RoomStyled
            href={`/detail?category=${category}&id=${room.id}`}
            key={i}
          >
            <ScreenStyled>
              <Screen type={room.screen[0]} url={room.screen[1]} />
            </ScreenStyled>
            <Typography font={FontType.REGULAR_TITLE_01}>
              {room.title}
            </Typography>
            <Typography font={FontType.LIGHT_BODY}>{room.creator}</Typography>
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

const ScreenStyled = styled.div`
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export default Home;
