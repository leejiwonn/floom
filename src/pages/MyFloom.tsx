import styled from '@emotion/styled';

import Typography from '~/components/Typography';
import { useMyReviews, useMyRooms, useMyRoomBookmarks } from '~/hooks/useMy';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';

const MyFloom = () => {
  const { data: myReviews } = useMyReviews();
  const { data: myRooms } = useMyRooms();
  const { data: myRoomBookmarks } = useMyRoomBookmarks();

  return (
    <MyFloomStyled>
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
      <SaveRoomListStyled>
        <Typography>저장 목록</Typography>
        <RoomList>
          {myRoomBookmarks?.map((bookmark, index) => (
            <RoomItem key={index}>{bookmark.room.title}</RoomItem>
          ))}
        </RoomList>
      </SaveRoomListStyled>
      <CreateRoomListStyled>
        <Typography>생성 목록</Typography>
        <RoomList>
          {myRooms?.map((room, index) => (
            <RoomItem key={index}>{room.title}</RoomItem>
          ))}
        </RoomList>
      </CreateRoomListStyled>
    </MyFloomStyled>
  );
};

const MyFloomStyled = styled.div`
  margin-top: 14em;
  padding: 0 5em;
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

const SaveRoomListStyled = styled.div``;

const CreateRoomListStyled = styled.div``;

const RoomList = styled.div``;

const RoomItem = styled.div``;

export default MyFloom;
