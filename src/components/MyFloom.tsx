import styled from '@emotion/styled';
import { useState } from 'react';

import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { useMyReviews, useMyRooms, useMyRoomBookmarks } from '~/hooks/useMy';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';

const MyFloom = () => {
  const { data: myReviews } = useMyReviews();
  const { data: myRooms } = useMyRooms();
  const { data: myRoomBookmarks } = useMyRoomBookmarks();

  const [category, setCategory] = useState<'save' | 'create'>('save');

  return (
    <MyFloomStyled>
      <RoomListStyled>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={2}>
          마이 플룸
        </Typography>
        <RoomCategory>
          <RoomCategoryItem onClick={() => setCategory('save')}>
            <Typography
              font={
                category === 'save'
                  ? FontType.BOLD_TITLE_02
                  : FontType.REGULAR_TITLE_02
              }
              color={
                category === 'save' ? BasicColor.BLUE100 : BasicColor.DARK70
              }
              marginRight={2}
            >
              저장한 방
            </Typography>
          </RoomCategoryItem>
          <RoomCategoryItem onClick={() => setCategory('create')}>
            <Typography
              font={
                category === 'create'
                  ? FontType.BOLD_TITLE_02
                  : FontType.REGULAR_TITLE_02
              }
              color={
                category === 'create' ? BasicColor.BLUE100 : BasicColor.DARK70
              }
            >
              생성한 방
            </Typography>
          </RoomCategoryItem>
        </RoomCategory>
        <RoomList>
          {category === 'save'
            ? myRoomBookmarks?.map((bookmark) => (
                <RoomItem
                  key={bookmark.room.id}
                  href={`/detail?roomId=${bookmark.room.id}`}
                >
                  <ScreenStyled>
                    <Screen type="thumbnail" assets={bookmark.room.assets} />
                  </ScreenStyled>
                  <Typography
                    font={FontType.BOLD_BODY}
                    marginTop={1}
                    textOverflow
                  >
                    {bookmark.room.title}
                  </Typography>
                </RoomItem>
              ))
            : myRooms?.map((room) => (
                <RoomItem key={room.id} href={`/detail?roomId=${room.id}`}>
                  <ScreenStyled>
                    <Screen type="thumbnail" assets={room.assets} />
                  </ScreenStyled>
                  <Typography
                    font={FontType.BOLD_BODY}
                    marginTop={1}
                    textOverflow
                  >
                    {room.title}
                  </Typography>
                </RoomItem>
              ))}
        </RoomList>
      </RoomListStyled>
      <ReviewListStyled>
        <Typography font={FontType.BOLD_TITLE_02} marginBottom={2}>
          나의 몰입 기록
        </Typography>
        <ReviewList>
          {myReviews?.map((review, index) => (
            <ReviewItem key={index}>{review.objective}</ReviewItem>
          ))}
        </ReviewList>
      </ReviewListStyled>
    </MyFloomStyled>
  );
};

const MyFloomStyled = styled.div`
  width: 78%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
`;

const RoomListStyled = styled.div`
  width: 75%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 25%;
  padding: 0 3em;
  padding-top: 11em;
`;

const RoomCategory = styled.div`
  margin-bottom: 2em;
`;

const RoomCategoryItem = styled.button``;

const RoomList = styled.div`
  width: 100%;
  height: 84%;
  overflow: auto;
`;

const RoomItem = styled.a`
  width: 22%;
  height: auto;
  display: inline-flex;
  flex-direction: column;
  margin-right: 2em;
  margin-bottom: 3em;
`;

const ScreenStyled = styled.div`
  width: 100%;
  height: 15em;
  position: relative;
  overflow: hidden;
  border-radius: 2em;
`;

const ReviewListStyled = styled.div`
  width: 25%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${BasicColor.GRAY20};
  padding: 0 3em;
  padding-top: 10em;
`;

const ReviewList = styled.div``;

const ReviewItem = styled.div``;

export default MyFloom;
