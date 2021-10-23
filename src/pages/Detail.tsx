import styled from '@emotion/styled';
import Link from 'next/link';

import Typography from '~/components/Typography';
import Playlist from '~/components/Playlist';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { getCatecory } from '~/utils/category';
import { useRoom } from '~/hooks/useRoom';
import EMOJI from '~/constants/emoji';

interface Props {
  category: string;
  id: string;
}

const Detail = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);

  return (
    <DetailStyled>
      <RoomImageStyled>
        <RoomImage url={data?.roomImage} />
        <ThumImage url={data?.screen[1]} />
      </RoomImageStyled>
      <RoomInfoStyled>
        <RoomTitleStyled>
          <RoomTitleInfo>
            <Typography font={FontType.SEMI_BOLD_HEAD_03}>
              {getCatecory(category)}
            </Typography>
            <RoomTitleInfoLine />
            <Typography font={FontType.EXTRA_BOLD_HEAD_03}>
              {data?.title}
            </Typography>
          </RoomTitleInfo>
          <Typography
            font={FontType.REGULAR_BODY}
            color={BasicColor.DARK70}
            marginBottom={24}
          >
            {data?.creator} 님의 방
          </Typography>
          <TagStyled>
            {data?.tags.map((tag, index) => (
              <TagItem key={index}>
                <Typography
                  font={FontType.SEMI_BOLD_BODY}
                  color={BasicColor.GREEN150}
                >
                  {tag}
                </Typography>
              </TagItem>
            ))}
          </TagStyled>
          <CaptionStyled>
            <CaptionItem>
              <Typography
                font={FontType.REGULAR_CAPTION}
                color={BasicColor.DARK70}
              >
                방문
              </Typography>
              <Typography font={FontType.SEMI_BOLD_BODY} marginLeft={8}>
                {data?.playCount}
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
              <Typography font={FontType.SEMI_BOLD_BODY} marginLeft={8}>
                {data?.recommendCount}
              </Typography>
            </CaptionItem>
          </CaptionStyled>
        </RoomTitleStyled>
        <RoomContentStyled>
          <UserListStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={30}>
              다른 사람들은 이런 일에 몰입했어요!
            </Typography>
            {data?.usedUsers.length ? (
              <CommentStyled>
                {data?.usedUsers.map((item, index) => (
                  <CommentItem key={index}>
                    <CommentTitle>
                      <CommentTitleLeft>
                        <Typography
                          font={FontType.BOLD_BODY}
                          color={BasicColor.BLUE100}
                          marginRight={3}
                        >
                          {item.objective}
                        </Typography>
                        {item.recommend && EMOJI.RECOMMEND}
                      </CommentTitleLeft>
                      <Typography
                        font={FontType.LIGHT_BODY}
                        color={BasicColor.DARK70}
                      >
                        {item.player}
                      </Typography>
                    </CommentTitle>
                    <Typography marginTop={10}>{item.comment}</Typography>
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
            )}
          </UserListStyled>
          <PlaylistStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={16}>
              플레이리스트
            </Typography>
            <Playlist
              playlist={data?.music as any}
              controls={false}
              viewHeight={34}
            />
          </PlaylistStyled>
        </RoomContentStyled>
      </RoomInfoStyled>
      <Link href={`/play?category=${category}&id=${id}`}>
        <PlayButton>
          <Typography
            tag="span"
            font={FontType.BOLD_TITLE_01}
            color={BasicColor.WHITE}
          >
            체험 해볼래요!
          </Typography>
        </PlayButton>
      </Link>
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
  height: auto;
  position: relative;
`;

const RoomImage = styled.img<{ url: string }>`
  width: 100%;
  height: 42vh;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

const ThumImage = styled.img<{ url: string }>`
  width: 200px;
  height: 170px;
  position: absolute;
  left: 50px;
  bottom: -40px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
  border-radius: 30px 30px 30px 0;
`;

const TagStyled = styled.div``;

const TagItem = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  background-color: ${BasicColor.GREEN10};
  border: 1px solid ${BasicColor.GREEN20};
  box-sizing: border-box;
  border-radius: 24px;
  margin-right: 6px;
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
  margin-top: 60px;
  padding-left: 50px;
`;

const RoomTitleInfo = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const RoomTitleInfoLine = styled.div`
  width: 2px;
  height: 60%;
  background-color: ${BasicColor.DARK40};
  margin: 0 12px;
`;

const CaptionStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 36px;
`;

const CaptionItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const CaptionLine = styled.div`
  width: 1px;
  height: 60%;
  background-color: ${BasicColor.GRAY60};
  margin: 0 15px;
`;

const RoomContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`;

const UserListStyled = styled.div`
  border-left: 1px solid ${BasicColor.GRAY60};
  padding: 0 30px;
`;

const CommentStyled = styled.div`
  width: auto;
  height: 39vh;
  overflow: auto;
`;

const CommentItem = styled.div`
  width: 340px;
  background-color: ${BasicColor.GRAY10};
  border-radius: 0px 20px 20px 20px;
  padding: 15px 20px;
  margin-bottom: 20px;
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

const PlaylistStyled = styled.div`
  margin-right: 60px;
  border-left: 1px solid ${BasicColor.GRAY60};
  padding-left: 30px;
`;

const PlayButton = styled.a`
  position: absolute;
  left: 50px;
  bottom: 5vh;
  padding: 20px 120px;
  border-radius: 20px;
  background-color: ${BasicColor.BLUE100};
  cursor: pointer;
`;

export default Detail;
