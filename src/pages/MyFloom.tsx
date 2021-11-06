import styled from '@emotion/styled';
import Typography from '~/components/Typography';
import { useMyReviews } from '~/hooks/useMy';

const MyFloom = () => {
  const { data: myReviews } = useMyReviews();

  return (
    <MyFloomStyled>
      <ReviewListStyled>
        <Typography>체험 히스토리</Typography>
        <ReviewList>
          {myReviews?.map((review, index) => (
            <ReviewItem key={index}>{review.objective}</ReviewItem>
          ))}
        </ReviewList>
      </ReviewListStyled>
      <SaveRoomListStyled>
        <Typography>저장 목록</Typography>
      </SaveRoomListStyled>
      <CreateRoomListStyled>
        <Typography>생성 목록</Typography>
      </CreateRoomListStyled>
    </MyFloomStyled>
  );
};

const MyFloomStyled = styled.div`
  margin-top: 14em;
  padding: 0 5em;
`;

const ReviewListStyled = styled.div``;

const ReviewList = styled.div``;

const ReviewItem = styled.div``;

const SaveRoomListStyled = styled.div``;

const CreateRoomListStyled = styled.div``;

export default MyFloom;
