import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import { LoaderBubbles } from '~/components/Loader';
import Playlist from '~/components/Playlist';
import Typography from '~/components/Typography';
import BackgroundFilter from '~/components/BackgroundFilter';
import EMOJI from '~/constants/emoji';
import { useReviews } from '~/hooks/useReviews';
import { useUserProfile } from '~/hooks/useUser';
import { deleteRoomBookmark, postRoomBookmark } from '~/remotes/my';
import type { Room } from '~/types/Room';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';

import BookmarkIcon from '../../public/assets/icons/icon-bookmark.svg';
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
      <RoomImageStyled>
        <RoomImage url={room.roomImage} />
        <BackgroundFilter wallColor={room.wallColor} light={room.light} />
      </RoomImageStyled>
      <RoomInfoStyled>
        <RoomTitleStyled>
          <RoomTitleInfoStyled>
            <RoomTitleInfo>
              <Typography font={FontType.SEMI_BOLD_HEAD_03}>
                {room.category.name}
              </Typography>
              <RoomTitleInfoLine />
              <RoomTitleHidden>
                <Typography font={FontType.EXTRA_BOLD_HEAD_03}>
                  {room.title}
                </Typography>
              </RoomTitleHidden>
            </RoomTitleInfo>
            <CaptionStyled>
              <CaptionItem>
                <EmojiStyled style={{ opacity: 0.7 }}>{EMOJI.EYES}</EmojiStyled>
                <Typography
                  font={FontType.REGULAR_CAPTION}
                  color={BasicColor.DARK70}
                  marginLeft={0.5}
                >
                  방문
                </Typography>
                <Typography font={FontType.SEMI_BOLD_CAPTION} marginLeft={0.5}>
                  {room.reviewsCount}
                </Typography>
              </CaptionItem>
              <CaptionItem>
                <EmojiStyled style={{ opacity: 0.7 }}>
                  {EMOJI.RECOMMEND}
                </EmojiStyled>
                <Typography
                  font={FontType.REGULAR_CAPTION}
                  color={BasicColor.DARK70}
                  marginLeft={0.5}
                >
                  추천
                </Typography>
                <Typography font={FontType.SEMI_BOLD_CAPTION} marginLeft={0.5}>
                  {room.recommendReviewsCount}
                </Typography>
              </CaptionItem>
            </CaptionStyled>
          </RoomTitleInfoStyled>
          {room.tags.length > 0 ? (
            <TagStyled>
              {room.tags.map((tag, index) => (
                <TagItem key={tag + index}>
                  <Typography
                    font={FontType.SEMI_BOLD_BODY}
                    color={BasicColor.GREEN150}
                  >
                    {tag}
                  </Typography>
                </TagItem>
              ))}
            </TagStyled>
          ) : null}
          <Typography font={FontType.REGULAR_BODY} marginBottom={1}>
            {room.description}
          </Typography>
          <Typography font={FontType.REGULAR_BODY} color={BasicColor.DARK70}>
            {room.creator.displayName} 님의 방
          </Typography>
        </RoomTitleStyled>
        <RoomContentStyled>
          <UserListStyled>
            <Typography font={FontType.BOLD_TITLE_02} marginBottom={2}>
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
            <Typography font={FontType.BOLD_TITLE_02} marginBottom={0.5}>
              플레이리스트
            </Typography>
            <Playlist
              playlist={room.musics}
              controls={false}
              viewHeight={56}
              noneText="음악이 없는 조용한 방이에요."
            />
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
          <LoaderBubbles mode={room.isBookmarked ? 'dark' : 'light'} />
        ) : (
          <AddBookmarkButtonInfo>
            {room.isBookmarked ? (
              <BookmarkIcon stroke={BasicColor.WHITE} />
            ) : (
              <BookmarkIcon stroke={BasicColor.GREEN100} />
            )}
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

const RoomImageStyled = styled.div`
  width: 100%;
  height: 36vh;
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

const RoomImage = styled.img<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-size: 100%;
  background-position-y: 26%;
  background-repeat: no-repeat;
`;

const TagStyled = styled.div`
  margin-bottom: 3em;
`;

const TagItem = styled.div<{ disable?: boolean }>`
  display: inline-flex;
  padding: 0.4em 1em;
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
  width: 45%;
  display: flex;
  flex-direction: column;
  margin-top: 3.2em;
  padding-left: 5em;
  box-sizing: content-box;
`;

const RoomTitleInfoStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2em;
`;

const RoomTitleInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const RoomTitleHidden = styled.div`
  width: 80%;
`;

const RoomTitleInfoLine = styled.div`
  display: flex;
  width: 0.15em;
  height: 2.2em;
  background-color: ${BasicColor.DARK40};
  margin: 0 1.2em;
  margin-top: 0.7em;
`;

const CaptionStyled = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const CaptionItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.DARK10};
  border-radius: 0.9em;
  padding: 1em;
  margin-right: 2em;
`;

const RoomContentStyled = styled.div`
  width: 55%;
  display: flex;
  flex-direction: row;
  box-sizing: content-box;
`;

const UserListStyled = styled.div`
  width: calc(100% - 35em);
  border-left: 1px solid ${BasicColor.GRAY60};
  padding: 0 2em;
  padding-top: 3em;
  box-sizing: content-box;
`;

const CommentStyled = styled.div`
  width: 100%;
  height: 61vh;
  overflow: auto;
`;

const CommentItem = styled.div`
  width: 100%;
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
  width: 35em;
  margin-right: 4em;
  border-left: 0.1em solid ${BasicColor.GRAY60};
  padding-left: 2em;
  padding-top: 3em;
  box-sizing: content-box;
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
