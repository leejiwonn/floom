import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { data: user, mutate: userMutate } = useUserProfile();

  const [category, setCategory] = useState(categories[0]);
  const { data: rooms } = useRooms(category.name);

  const handleLogoutButtonClick = () => {
    removeAuthTokenInLocalStorage();
    userMutate();
    router.reload();
  };

  return (
    <HomeStyled>
      <CategoryStyled>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_02}
          color={BasicColor.WHITE}
          marginBottom={3}
        >
          몰입의 즐거움을
          <br />
          경험하다!
        </Typography>
        <Typography
          font={FontType.BOLD_TITLE_02}
          color={BasicColor.WHITE}
          marginBottom={5.5}
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
            <LogoutIcon width="2.7em" height="2.7em" />
          </LogoutButton>
        ) : null}
      </CategoryStyled>
      <RoomsStyled>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={4}>
          {category?.name}하실 방을 선택해주세요!
        </Typography>
        <RoomStyled>
          {rooms?.map((room) => (
            <Link key={room.id} href={`/detail?roomId=${room.id}`}>
              <RoomItem>
                <ScreenStyled>
                  <Screen type="thumbnail" assets={room.assets} />
                </ScreenStyled>
                <Typography font={FontType.BOLD_TITLE_02} marginTop={1}>
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
          <CreateIcon width="3.2em" height="3.2em" />
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
  padding: 5em;
  padding-top: 10em;
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
  margin: 1.5em 0;

  :hover {
    div {
      background-color: ${BasicColor.BLUE20};
      box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.08);
    }
  }
`;

const CategoryItemIcon = styled.div<{ active: boolean }>`
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.WHITE : BasicColor.BLUE80};
  box-sizing: border-box;
  box-shadow: ${({ active }) => active && '0 0.4em 0.4em rgba(0, 0, 0, 0.08)'};
  border-radius: 1.8em;
  margin-right: 1.5em;
  transition: 0.1s;

  svg {
    width: 70%;
    height: 70%;
  }
`;

const LogoutButton = styled.button`
  width: 5.5em;
  height: 5.5em;
  position: absolute;
  bottom: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5.5em;
  border: 0.1em solid ${BasicColor.BLUE80};
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
  padding: 0 6em;
  padding-top: 11em;
  background-color: ${BasicColor.WHITE};
  z-index: 2;
`;

const RoomStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const RoomItem = styled.a`
  width: 30em;
  height: auto;
  display: inline-flex;
  flex-direction: column;
  margin-right: 2em;
  margin-bottom: 3em;
`;

const ScreenStyled = styled.div`
  width: 100%;
  height: 25em;
  position: relative;
  overflow: hidden;
  border-radius: 2em;
`;

const CreateButton = styled.a`
  width: 7em;
  height: 7em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 4em;
  bottom: 4em;
  z-index: 996;
  background-color: ${BasicColor.GREEN100};
  border: 0.1em solid ${BasicColor.GREEN120};
  border-radius: 50%;
  box-shadow: 0 1em 1em rgba(0, 0, 0, 0.1);
`;

export default Home;
