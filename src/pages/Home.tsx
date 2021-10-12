import styled from '@emotion/styled';
import { useState } from 'react';

import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { useCategoryRooms } from '~/hooks/useRoom';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

const Home = () => {
  const [category, setCategory] = useState('work');
  const { data } = useCategoryRooms(category);

  const getCatecory = (category: string) => {
    if (category === 'work') {
      return '업무';
    } else if (category === 'study') {
      return '학습';
    } else if (category === 'rest') {
      return '휴식';
    }
  };

  return (
    <HomeStyled>
      <CategoryStyled>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_02}
          color={TextColor.WHITE}
          marginBottom={30}
        >
          몰입의 즐거움을
          <br />
          경험하다!
        </Typography>
        <Typography
          font={FontType.BOLD_TITLE_02}
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
              align={Align.CENTER}
            >
              업무
            </Typography>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('study')}>
            <CategoryItemIcon />
            <Typography
              font={FontType.REGULAR_TITLE_01}
              color={TextColor.WHITE}
              align={Align.CENTER}
            >
              학습
            </Typography>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('rest')}>
            <CategoryItemIcon />
            <Typography
              font={FontType.REGULAR_TITLE_01}
              color={TextColor.WHITE}
              align={Align.CENTER}
            >
              휴식
            </Typography>
          </CategoryItem>
        </CategoryList>
      </CategoryStyled>
      <RoomsStyled>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_03}
          marginTop={130}
          marginBottom={50}
        >
          {getCatecory(category)}하실 방을 선택해주세요!
        </Typography>
        <RoomStyled>
          {data?.map((room, i) => (
            <RoomItem
              href={`/detail?category=${category}&id=${room.id}`}
              key={i}
            >
              <ScreenStyled>
                <Screen type={room.screen[0]} url={room.screen[1]} />
              </ScreenStyled>
              <Typography font={FontType.BOLD_TITLE_02}>
                {room.title}
              </Typography>
              <Typography font={FontType.LIGHT_CAPTION}>
                {room.creator}
              </Typography>
            </RoomItem>
          ))}
        </RoomStyled>
      </RoomsStyled>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #6a8aff;
`;

const CategoryStyled = styled.div`
  width: 25%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  padding-top: 120px;
  z-index: 1;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const CategoryItemIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #dfe9fb;
  border-radius: 18px;
  margin-right: 10px;
`;

const RoomsStyled = styled.div`
  width: 75%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 60px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  z-index: 2;
  background-color: #fff;
`;

const RoomStyled = styled.div`
  display: flex;
  flex-direction: row;
`;

const RoomItem = styled.a`
  width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-right: 30px;
`;

const ScreenStyled = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export default Home;
