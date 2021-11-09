import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { LoaderSpinner } from '~/components/Loader';
import { useMyReviews, useMyRooms, useMyRoomBookmarks } from '~/hooks/useMy';
import { BasicColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import EMOJI from '~/constants/emoji';

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
          {category === 'save' &&
            (myRoomBookmarks ? (
              myRoomBookmarks?.length > 0 ? (
                myRoomBookmarks?.map((bookmark) => (
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
              ) : (
                <NoneRoomList>
                  <EmojiExclamationMarkStyled>
                    {EMOJI.EXCLAMATION_MARK}
                  </EmojiExclamationMarkStyled>
                  <Typography font={FontType.BOLD_BODY} marginTop={1}>
                    아직{' '}
                    <Typography
                      tag="span"
                      font={FontType.BOLD_BODY}
                      color={BasicColor.BLUE100}
                    >
                      저장한 방
                    </Typography>
                    이 없어요.
                  </Typography>
                  <Typography
                    font={FontType.LIGHT_CAPTION}
                    align={Align.CENTER}
                    marginTop={0.6}
                  >
                    방을 탐방해보고 마음에 드는 방이 있다면 저장해보세요!
                  </Typography>
                </NoneRoomList>
              )
            ) : (
              <LoaderSpinner />
            ))}
          {category === 'create' &&
            (myRooms ? (
              myRooms?.length > 0 ? (
                myRooms?.map((room) => (
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
                ))
              ) : (
                <NoneRoomList>
                  <EmojiExclamationMarkStyled>
                    {EMOJI.EXCLAMATION_MARK}
                  </EmojiExclamationMarkStyled>
                  <Typography font={FontType.BOLD_BODY} marginTop={1}>
                    아직{' '}
                    <Typography
                      tag="span"
                      font={FontType.BOLD_BODY}
                      color={BasicColor.BLUE100}
                      marginBottom={0.6}
                    >
                      생성한 방
                    </Typography>
                    이 없어요.
                  </Typography>
                  <Typography
                    font={FontType.LIGHT_CAPTION}
                    align={Align.CENTER}
                    marginTop={0.6}
                    marginBottom={2}
                  >
                    방을 직접 만들러 가볼까요?
                  </Typography>
                  <Link passHref={true} href="/create">
                    <CreateButton>
                      <Typography
                        font={FontType.BOLD_BODY}
                        color={BasicColor.WHITE}
                      >
                        방 생성하기
                      </Typography>
                    </CreateButton>
                  </Link>
                </NoneRoomList>
              )
            ) : (
              <LoaderSpinner />
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
  width: 80%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
`;

const RoomListStyled = styled.div`
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 30%;
  padding: 0 3em;
  padding-top: 10em;
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

const NoneRoomList = styled.div`
  width: 100%;
  height: 84%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateButton = styled.button`
  padding: 1.2em 6em;
  background-color: ${BasicColor.GREEN100};
  border-radius: 4em;
`;

const EmojiExclamationMarkStyled = styled.div`
  width: 4em;
  height: 4em;
  margin-bottom: 0.5em;

  svg {
    width: 100%;
    height: 100%;
    fill: ${BasicColor.BLUE80};
  }
`;

const ReviewListStyled = styled.div`
  width: 30%;
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
