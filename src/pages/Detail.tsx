import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import { LoaderSpinner } from '~/components/Loader';
import Playlist from '~/components/Playlist';
import Typography from '~/components/Typography';
import EMOJI from '~/constants/emoji';
import { useReviews } from '~/hooks/useReviews';
import { useUserProfile } from '~/hooks/useUser';
import { deleteRoomBookmark, postRoomBookmark } from '~/remotes/my';
import type { Room } from '~/types/Room';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';

import BookmarkOffIcon from '../../public/assets/icons/icon-bookmark-off.svg';
import BookmarkOnIcon from '../../public/assets/icons/icon-bookmark-on.svg';

interface Props {
  room: Room;
}

const Detail = ({ room: initialRoom }: Props) => {
  const [room, setRoom] = useState(initialRoom);
  const [loading, setLoading] = useState(false);

  const { data: user } = useUserProfile();
  const { data: reviews } = useReviews(room.id);

  const handleAddBookmarkButton = async () => {
    if (loading || user === undefined) {
      return;
    }

    if (user === null) {
      // TODO: 로그인이 필요
      return;
    }

    try {
      setLoading(true);
      if (room.isBookmarked) {
        await deleteRoomBookmark(room.id);
        setRoom((x) => ({
          ...x,
          isBookmarked: false,
        }));
      } else {
        await postRoomBookmark(room.id);
        setRoom((x) => ({
          ...x,
          isBookmarked: true,
        }));
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetailStyled>
      <RoomImage url={room.roomImage} />
      <RoomInfoStyled>
        <RoomTitleStyled>
          <RoomTitleInfo>
            <Typography font={FontType.SEMI_BOLD_HEAD_03}>
              {room.category.name}
            </Typography>
            <RoomTitleInfoLine />
            <Typography font={FontType.EXTRA_BOLD_HEAD_03}>
              {room.title}
            </Typography>
          </RoomTitleInfo>
          <Typography
            font={FontType.REGULAR_BODY}
            color={BasicColor.DARK70}
            marginBottom={2.4}
          >
            {room.creator.displayName} 님의 방
          </Typography>
          <TagStyled>
            {room.tags.length > 0 ? (
              room.tags.map((tag, index) => (
                <TagItem key={tag + index}>
                  <Typography
                    font={FontType.SEMI_BOLD_BODY}
                    color={BasicColor.GREEN150}
                  >
                    {tag}
                  </Typography>
                </TagItem>
              ))
            ) : (
              <TagItem disable>
                <Typography
                  font={FontType.SEMI_BOLD_BODY}
                  color={BasicColor.DARK70}
                >
                  태그를 등록하지 않았어요.
                </Typography>
              </TagItem>
            )}
          </TagStyled>
          <CaptionStyled>
            <CaptionItem>
              <Typography
                font={FontType.REGULAR_CAPTION}
                color={BasicColor.DARK70}
              >
                방문
              </Typography>
              <Typography font={FontType.SEMI_BOLD_BODY} marginLeft={0.8}>
                {room.reviewsCount}
              </Typography>
            </CaptionItem>
            <CaptionLine />
            <CaptionItem>
              <Typography
                font={FontType.REGULAR_CAPTION}
                color={BasicColor.DARK70}
              >
                추천
              </Typography>
              <Typography font={FontType.SEMI_BOLD_BODY} marginLeft={0.8}>
                {room.recommendReviewsCount}
              </Typography>
            </CaptionItem>
          </CaptionStyled>
        </RoomTitleStyled>
        <RoomContentStyled>
          <UserListStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={3}>
              다른 사람들은 이런 일에 몰입했어요!
            </Typography>
            {reviews != null ? (
              reviews.length > 0 ? (
                <CommentStyled>
                  {reviews.map((review) => (
                    <CommentItem key={review.id}>
                      <CommentTitle>
                        <CommentTitleLeft>
                          <Typography
                            font={FontType.BOLD_BODY}
                            color={BasicColor.BLUE100}
                            marginRight={0.3}
                          >
                            {review.objective}
                          </Typography>
                          {review.recommend ? (
                            <EmojiStyled>{EMOJI.RECOMMEND}</EmojiStyled>
                          ) : null}
                        </CommentTitleLeft>
                        <Typography
                          font={FontType.LIGHT_BODY}
                          color={BasicColor.DARK70}
                        >
                          {review.author?.displayName ?? review.guestName}
                        </Typography>
                      </CommentTitle>
                      <Typography marginTop={1}>{review.comment}</Typography>
                    </CommentItem>
                  ))}
                </CommentStyled>
              ) : (
                <Typography
                  font={FontType.LIGHT_CAPTION}
                  color={BasicColor.DARK70}
                >
                  <Typography
                    tag="span"
                    font={FontType.BOLD_BODY}
                    color={BasicColor.DARK70}
                  >
                    이 방에서 아직 몰입한 사람이 없네요.
                  </Typography>
                  <br />
                  체험하기 버튼을 눌러 첫 번째 몰입을 경험해보세요 :)
                </Typography>
              )
            ) : null}
          </UserListStyled>
          <PlaylistStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={1.6}>
              플레이리스트
            </Typography>
            <Playlist playlist={room.musics} controls={false} viewHeight={44} />
          </PlaylistStyled>
        </RoomContentStyled>
      </RoomInfoStyled>
      <Link href={`/play?roomId=${room.id}`}>
        <PlayButton>
          <Typography
            tag="span"
            font={FontType.BOLD_TITLE_02}
            color={BasicColor.WHITE}
          >
            체험 해볼래요!
          </Typography>
        </PlayButton>
      </Link>
      <AddBookmarkButton
        onClick={handleAddBookmarkButton}
        active={!!room.isBookmarked}
      >
        {loading ? (
          <LoaderSpinner mode={room.isBookmarked ? 'dark' : 'light'} />
        ) : (
          <AddBookmarkButtonInfo>
            {room.isBookmarked ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
            <Typography
              font={FontType.BOLD_TITLE_02}
              color={room.isBookmarked ? BasicColor.WHITE : BasicColor.DARK70}
              marginLeft={1}
            >
              {room.isBookmarked ? '저장했어요!' : '저장할래요!'}
            </Typography>
          </AddBookmarkButtonInfo>
        )}
      </AddBookmarkButton>
    </DetailStyled>
  );
};

const DetailStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${BasicColor.GRAY20};
`;

const RoomImage = styled.img<{ url: string }>`
  width: 100%;
  height: 42vh;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
`;

const TagStyled = styled.div``;

const TagItem = styled.div<{ disable?: boolean }>`
  display: inline-flex;
  padding: 0.4em 1.2em;
  background-color: ${({ disable }) =>
    disable ? BasicColor.DARK10 : BasicColor.GREEN10};
  border: 0.1em solid
    ${({ disable }) => (disable ? BasicColor.GRAY60 : BasicColor.GREEN20)};
  box-sizing: border-box;
  border-radius: 2.4em;
  margin-right: 0.6em;
`;

const RoomInfoStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RoomTitleStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4em;
  padding-left: 5em;
`;

const RoomTitleInfo = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;
`;

const RoomTitleInfoLine = styled.div`
  width: 0.2em;
  height: 60%;
  background-color: ${BasicColor.DARK40};
  margin: 0 1.2em;
`;

const CaptionStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3.6em;
`;

const CaptionItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const CaptionLine = styled.div`
  width: 0.1em;
  height: 60%;
  background-color: ${BasicColor.GRAY60};
  margin: 0 1.5em;
`;

const RoomContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 4em;
`;

const UserListStyled = styled.div`
  border-left: 1px solid ${BasicColor.GRAY60};
  padding: 0 3em;
`;

const CommentStyled = styled.div`
  width: auto;
  height: 49vh;
  overflow: auto;
`;

const CommentItem = styled.div`
  width: 34em;
  background-color: ${BasicColor.GRAY10};
  border-radius: 0 2em 2em 2em;
  padding: 1.5em 2em;
  margin-bottom: 2em;
`;

const CommentTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentTitleLeft = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
`;

const EmojiStyled = styled.div`
  width: 1.8em;
  height: 1.8em;
  margin-left: 0.2em;
`;

const PlaylistStyled = styled.div`
  margin-right: 6em;
  border-left: 0.1em solid ${BasicColor.GRAY60};
  padding-left: 3em;
`;

const PlayButton = styled.a`
  width: 23em;
  height: 6.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 5em;
  bottom: 5vh;
  border-radius: 2em;
  background-color: ${BasicColor.BLUE100};
`;

const AddBookmarkButton = styled.button<{ active: boolean }>`
  width: 16em;
  height: 6.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 30em;
  bottom: 5vh;
  border-radius: 2em;
  background-color: ${({ active }) =>
    active ? BasicColor.GREEN100 : BasicColor.WHITE};
  border: ${({ active }) =>
    ` 2px solid ${!active ? BasicColor.DARK10 : BasicColor.GREEN100}`};
  box-sizing: border-box;
  transition: 0.2s;
`;

const AddBookmarkButtonInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Detail;
