import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import Screen from '~/components/Screen';
import Typography from '~/components/Typography';
import { useRooms } from '~/hooks/useRoom';
import { useUserProfile } from '~/hooks/useUser';
import { RoomCategory } from '~/types/RoomCategory';
import { removeAuthTokenInLocalStorage } from '~/utils/auth';
import { BasicColor, GradientColor } from '~/utils/color';
import { getCategoryEmoji } from '~/utils/emoji';
import { Align, FontType } from '~/utils/font';

import CreateIcon from '../../public/assets/icons/icon-create.svg';
import LogoutIcon from '../../public/assets/icons/icon-logout.svg';

type Props = {
  categories: RoomCategory[];
};

const Home = ({ categories }: Props) => {
  const { data: user } = useUserProfile();
  const [category, setCategory] = useState(categories[0]);

  const { data: rooms } = useRooms(category.name);

  const handleLogoutButtonClick = () => {
    removeAuthTokenInLocalStorage();
    location.href = '/';
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
          {categories?.map((value, index) => (
            <CategoryItem key={index} onClick={() => setCategory(value)}>
              <CategoryItemIcon active={category === value}>
                {getCategoryEmoji(value.name)}
              </CategoryItemIcon>
              <Typography
                font={FontType.BOLD_TITLE_01}
                color={BasicColor.WHITE}
                align={Align.CENTER}
              >
                {value.name}
              </Typography>
            </CategoryItem>
          ))}
        </CategoryList>
        {user != null ? (
          <LogoutButton onClick={handleLogoutButtonClick}>
            <LogoutIcon />
          </LogoutButton>
        ) : null}
      </CategoryStyled>
      <RoomsStyled>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={40}>
          {category?.name}하실 방을 선택해주세요!
        </Typography>
        <RoomStyled>
          {rooms?.map((room) => (
            <Link key={room.id} href={`/detail?roomId=${room.id}`}>
              <RoomItem>
                <ScreenStyled>
                  <Screen type={room.assets[0].type} url={room.assets[0].url} />
                </ScreenStyled>
                <Typography font={FontType.BOLD_TITLE_02} marginTop={10}>
                  {room.title}
                </Typography>
                <Typography font={FontType.LIGHT_CAPTION}>
                  {room.creator.displayName}
                </Typography>
              </RoomItem>
            </Link>
          ))}
        </RoomStyled>
      </RoomsStyled>
      <Link passHref={true} href={user != null ? '/create' : '/api/auth/kakao'}>
        <CreateButton aria-label="방 생성하기">
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

const CreateButton = styled.a`
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
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export default Home;
