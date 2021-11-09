import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { LoaderSpinner } from '~/components/Loader';
import Screen from '~/components/Screen';
import Typography from '~/components/Typography';
import Sidebar from '~/components/Sidebar';
import MyFloom from '~/components/MyFloom';
import { useRooms } from '~/hooks/useRoom';
import { useUserProfile } from '~/hooks/useUser';
import { RoomCategory } from '~/types/RoomCategory';
import { removeAuthTokenInLocalStorage } from '~/utils/auth';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';

import CreateIcon from '../../public/assets/icons/icon-create.svg';

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
      <Sidebar
        categories={categories}
        category={category}
        setCategory={(value) => setCategory(value)}
        onLogoutButtonClick={handleLogoutButtonClick}
      />
      {category.name !== 'myFloom' ? (
        <RoomsStyled>
          <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={4}>
            {user && `${user?.displayName}님, `}
            {category?.name}하실 방을 선택해주세요!
          </Typography>
          <RoomStyled>
            {!!!rooms ? (
              <LoaderSpinner />
            ) : (
              rooms?.map((room) => (
                <Link key={room.id} href={`/detail?roomId=${room.id}`}>
                  <RoomItem>
                    <ScreenStyled>
                      <Screen type="thumbnail" assets={room.assets} />
                    </ScreenStyled>
                    <Typography
                      font={FontType.BOLD_TITLE_02}
                      marginTop={1}
                      textOverflow
                    >
                      {room.title}
                    </Typography>
                    <Typography font={FontType.LIGHT_CAPTION}>
                      {room.creator.displayName}
                    </Typography>
                  </RoomItem>
                </Link>
              ))
            )}
          </RoomStyled>
        </RoomsStyled>
      ) : (
        <MyFloom />
      )}
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

const RoomsStyled = styled.div`
  width: 80%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 6em;
  padding-top: 10em;
  background-color: ${BasicColor.WHITE};
  z-index: 2;
`;

const RoomStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const RoomItem = styled.a`
  width: 30%;
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
