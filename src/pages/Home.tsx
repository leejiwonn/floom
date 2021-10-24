import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { useUserProfile } from '~/hooks/useUser';
import { useCategoryRooms } from '~/hooks/useRoom';
import { BasicColor, GradientColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import { removeAuthTokenInLocalStorage } from '~/utils/auth';
import { getCatecory } from '~/utils/category';
import EMOJI from '~/constants/emoji';

import LogoutIcon from '../../public/assets/icons/icon-logout.svg';
import CreateIcon from '../../public/assets/icons/icon-create.svg';

const Home = () => {
  const { data: user } = useUserProfile();
  const [category, setCategory] = useState('study');
  const { data } = useCategoryRooms(category);

  const handleLogoutButtonClick = () => {
    removeAuthTokenInLocalStorage();
    window.location.reload();
  };

  return (
    <HomeStyled>
      <CategoryStyled>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_02}
          color={BasicColor.WHITE}
          marginBottom={30}
        >
          몰입의 즐거움을
          <br />
          경험하다!
        </Typography>
        <Typography
          font={FontType.BOLD_TITLE_02}
          color={BasicColor.WHITE}
          marginBottom={55}
        >
          어떤 일에 몰입하고 싶은가요?
        </Typography>
        <CategoryList>
          <CategoryItem onClick={() => setCategory('study')}>
            <CategoryItemIcon active={category === 'study'}>
              {EMOJI.STUDY}
            </CategoryItemIcon>
            <Typography
              font={FontType.BOLD_TITLE_01}
              color={BasicColor.WHITE}
              align={Align.CENTER}
            >
              학습
            </Typography>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('work')}>
            <CategoryItemIcon active={category === 'work'}>
              {EMOJI.WORK}
            </CategoryItemIcon>
            <Typography
              font={FontType.BOLD_TITLE_01}
              color={BasicColor.WHITE}
              align={Align.CENTER}
            >
              업무
            </Typography>
          </CategoryItem>
          <CategoryItem onClick={() => setCategory('rest')}>
            <CategoryItemIcon active={category === 'rest'}>
              {EMOJI.REST}
            </CategoryItemIcon>
            <Typography
              font={FontType.BOLD_TITLE_01}
              color={BasicColor.WHITE}
              align={Align.CENTER}
            >
              휴식
            </Typography>
          </CategoryItem>
        </CategoryList>
        {user && (
          <LogoutButton onClick={handleLogoutButtonClick}>
            <LogoutIcon />
          </LogoutButton>
        )}
      </CategoryStyled>
      <RoomsStyled>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={40}>
          {getCatecory(category)}하실 방을 선택해주세요!
        </Typography>
        <RoomStyled>
          {data?.map((room) => (
            <Link
              key={`${category}-${room.id}`}
              href={`/detail?category=${category}&id=${room.id}`}
            >
              <RoomItem>
                <ScreenStyled>
                  <Screen type={room.screen[0]} url={room.screen[1]} />
                </ScreenStyled>
                <Typography font={FontType.BOLD_TITLE_02} marginTop={10}>
                  {room.title}
                </Typography>
                <Typography font={FontType.LIGHT_CAPTION}>
                  {room.creator}
                </Typography>
              </RoomItem>
            </Link>
          ))}
        </RoomStyled>
      </RoomsStyled>
      <Link href={`/create`}>
        <CreateButton>
          <CreateIcon />
        </CreateButton>
      </Link>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const CategoryStyled = styled.div`
  width: 30%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  padding-top: 100px;
  padding-right: 8%;
  background: ${GradientColor.BLUE};
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
  margin: 15px 0;

  :hover {
    div {
      background-color: ${BasicColor.BLUE20};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    }
  }
`;

const CategoryItemIcon = styled.div<{ active: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.WHITE : BasicColor.BLUE80};
  box-sizing: border-box;
  box-shadow: ${({ active }) => active && '0px 4px 4px rgba(0, 0, 0, 0.08)'};
  border-radius: 18px;
  margin-right: 15px;
  transition: 0.1s;
`;

const LogoutButton = styled.button`
  width: 55px;
  height: 55px;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  border: 1px solid ${BasicColor.BLUE80};
  background-color: ${BasicColor.BLUE90};
  transition: 0.1s;

  :hover {
    background-color: ${BasicColor.BLUE80};
  }
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
  padding-top: 110px;
  background-color: ${BasicColor.WHITE};
  z-index: 2;
`;

const RoomStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const RoomItem = styled.a`
  width: 300px;
  height: auto;
  display: inline-flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const ScreenStyled = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
`;

const CreateButton = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 999;
  background-color: ${BasicColor.GREEN100};
  border: 2px solid ${BasicColor.GREEN150};
  border-radius: 50%;
  cursor: pointer;
`;

export default Home;
