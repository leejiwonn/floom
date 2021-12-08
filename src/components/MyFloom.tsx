import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { LoaderBubbles } from '~/components/Loader';
import { useMyReviews, useMyRooms, useMyRoomBookmarks } from '~/hooks/useMy';
import { BasicColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import EMOJI from '~/constants/emoji';

import TrashIcon from '../../public/assets/icons/icon-trash.svg';

const MyFloom = () => {
  const { data: myReviews } = useMyReviews();
  const { data: myRooms } = useMyRooms();
  const { data: myRoomBookmarks } = useMyRoomBookmarks();

  const [category, setCategory] = useState<'save' | 'create'>('save');

  return (
    <MyFloomStyled>
      <RoomListStyled>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={3}>
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
        <RoomList className="scrollbar">
          {category === 'save' &&
            (myRoomBookmarks ? (
              myRoomBookmarks?.length > 0 ? (
                myRoomBookmarks?.map((bookmark) => (
                  <RoomItem key={bookmark.room.id}>
                    <RoomItemImage href={`/detail?roomId=${bookmark.room.id}`}>
                      <Screen type="thumbnail" assets={bookmark.room.assets} />
                    </RoomItemImage>
                    <RoomItemTitle href={`/detail?roomId=${bookmark.room.id}`}>
                      <Typography
                        font={FontType.BOLD_BODY}
                        marginTop={1}
                        textOverflow
                      >
                        {bookmark.room.title}
                      </Typography>
                    </RoomItemTitle>
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
              <LoaderBubbles />
            ))}
          {category === 'create' &&
            (myRooms ? (
              myRooms?.length > 0 ? (
                myRooms?.map((room) => (
                  <RoomItem key={room.id}>
                    <RoomItemImage href={`/detail?roomId=${room.id}`}>
                      <Screen type="thumbnail" assets={room.assets} />
                    </RoomItemImage>
                    <RoomItemInfo>
                      <RoomItemTitle href={`/detail?roomId=${room.id}`}>
                        <Typography
                          font={FontType.BOLD_BODY}
                          marginTop={1}
                          textOverflow
                        >
                          {room.title}
                        </Typography>
                      </RoomItemTitle>
                      <DeleteButton
                        className="delete-button"
                        onClick={() => console.log('delete')}
                      >
                        <TrashIcon fill={BasicColor.WHITE} />
                      </DeleteButton>
                    </RoomItemInfo>
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
              <LoaderBubbles />
            ))}
        </RoomList>
      </RoomListStyled>
      <ReviewListStyled>
        <Typography font={FontType.BOLD_TITLE_02} marginBottom={2}>
          나의 몰입 기록
        </Typography>
        <ReviewList className="scrollbar">
          {myReviews ? (
            myReviews.length > 0 ? (
              myReviews?.map((review) => (
                <ReviewItem
                  key={review.room?.id}
                  href={`/detail?roomId=${review.room?.id}`}
                >
                  <ReviewItemLeft>
                    <ReviewItemImage>
                      <Screen type="thumbnail" assets={review.room?.assets} />
                    </ReviewItemImage>
                    <ReviewItemInfo>
                      <Typography
                        font={FontType.BOLD_TITLE_02}
                        color={BasicColor.BLUE100}
                        marginBottom={0.2}
                      >
                        {review.objective}
                      </Typography>
                      <Typography font={FontType.REGULAR_CAPTION}>
                        {review.room?.category?.name} / {review.room?.title}
                      </Typography>
                      <Typography
                        font={FontType.REGULAR_CAPTION}
                        color={BasicColor.DARK40}
                      >
                        {review.createdAt.substr(0, 10)}
                      </Typography>
                    </ReviewItemInfo>
                  </ReviewItemLeft>
                  {review.recommend ? (
                    <ReviewItemEmojiStyled>
                      {EMOJI.RECOMMEND}
                    </ReviewItemEmojiStyled>
                  ) : null}
                </ReviewItem>
              ))
            ) : (
              <NoneReview>
                <NoneReviewEmojiStyled>{EMOJI.EYES}</NoneReviewEmojiStyled>
                <NoneReviewInfo>
                  <Typography
                    font={FontType.BOLD_BODY}
                    color={BasicColor.DARK70}
                    marginBottom={0.2}
                  >
                    아직{' '}
                    <Typography
                      font={FontType.BOLD_BODY}
                      tag="span"
                      color={BasicColor.BLUE100}
                    >
                      몰입 기록
                    </Typography>
                    이 없네요.
                  </Typography>
                  <Typography
                    font={FontType.LIGHT_CAPTION}
                    color={BasicColor.DARK70}
                  >
                    아주 간단한 목표라도 괜찮으니 부담없이 체험해보세요!
                  </Typography>
                </NoneReviewInfo>
              </NoneReview>
            )
          ) : null}
        </ReviewList>
      </ReviewListStyled>
    </MyFloomStyled>
  );
};

const MyFloomStyled = styled.div`
  width: 82%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
`;

const RoomListStyled = styled.div`
  width: 65%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 35%;
  padding: 0 3em;
  padding-top: 3.5em;
`;

const RoomCategory = styled.div`
  margin-bottom: 2em;
`;

const RoomCategoryItem = styled.button``;

const RoomList = styled.div`
  width: 100%;
  height: 84%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const RoomItem = styled.div`
  width: 22%;
  height: auto;
  display: inline-flex;
  flex-direction: column;
  margin-right: 2em;
  margin-bottom: 3em;

  :hover {
    .delete-button {
      opacity: 1;
    }
  }
`;

const ReviewItemLeft = styled.div`
  display: flex;
`;

const RoomItemImage = styled.a`
  width: 100%;
  height: 15em;
  position: relative;
  overflow: hidden;
  border-radius: 2em;
`;

const RoomItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const RoomItemTitle = styled.a``;

const DeleteButton = styled.button`
  background-color: ${BasicColor.BLUE80};
  border-radius: 50%;
  margin-top: 0.8em;
  padding: 0.1em;
  opacity: 0;
  transition: 0.1s;

  svg {
    width: 2.4em;
    height: 2.4em;
    fill: ${BasicColor.WHITE};
  }
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
  width: 35%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${BasicColor.GRAY20};
  padding: 0 3em;
  padding-top: 10em;
`;

const ReviewList = styled.div`
  width: 100%;
  height: 93%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const ReviewItem = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em;
  background-color: ${BasicColor.WHITE};
  border-radius: 1em;
  margin-bottom: 2em;
`;

const ReviewItemImage = styled.div`
  width: 6.5em;
  height: 6.5em;
  position: relative;
  overflow: hidden;
  border-radius: 1.2em;
`;

const ReviewItemInfo = styled.div`
  margin-left: 1.5em;
  margin-top: -0.5em;
`;

const ReviewItemEmojiStyled = styled.div`
  width: 4em;
  height: 4em;
  margin-left: 0.2em;
  background-color: ${BasicColor.BLUE100};
  border-radius: 50%;
  padding: 0.8em;

  svg {
    margin-top: -0.2em;
  }
`;

const NoneReview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(196, 196, 196, 0.1);
  border: 1px dashed ${BasicColor.GRAY70};
  border-radius: 1em;
  padding: 2.5em 2em;
`;

const NoneReviewInfo = styled.div`
  margin-left: 1.2em;
`;

const NoneReviewEmojiStyled = styled.div`
  width: 4em;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  border-radius: 50%;
  padding: 0.8em;

  svg {
    width: 90%;
    height: 90%;
  }
`;

export default MyFloom;
