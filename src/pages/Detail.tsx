import styled from '@emotion/styled';

import Typography from '~/components/Typography';
import Playlist from '~/components/Playlist';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { getCatecory } from '~/utils/category';
import { useRoom } from '~/hooks/useRoom';
import VisitIcon from '../../public/assets/emojis/emoji-visit.svg';
import RecommendIcon from '../../public/assets/emojis/emoji-recommend.svg';

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
        <TagStyled>
          <CatecoryStyled>
            <Typography font={FontType.BOLD_BODY} color={BasicColor.BLUE100}>
              {getCatecory(category)}
            </Typography>
          </CatecoryStyled>
          {data?.tags.map((tag, index) => (
            <TagItem key={index}>
              <Typography font={FontType.BOLD_BODY} color={BasicColor.GREEN150}>
                {tag}
              </Typography>
            </TagItem>
          ))}
        </TagStyled>
      </RoomImageStyled>
      <RoomInfoStyled>
        <RoomTitleStyled>
          <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginBottom={10}>
            {data?.title}
          </Typography>
          <Typography
            font={FontType.REGULAR_BODY}
            color={BasicColor.DARK70}
            marginBottom={30}
          >
            {data?.creator}
          </Typography>
          <CaptionStyled>
            <CationItem>
              <VisitIcon />
              <Typography
                font={FontType.SEMI_BOLD_BODY}
                marginLeft={8}
                marginRight={30}
              >
                {data?.playCount}
              </Typography>
            </CationItem>
            <CationItem>
              <RecommendIcon />
              <Typography font={FontType.SEMI_BOLD_BODY} marginLeft={8}>
                {data?.recommendCount}
              </Typography>
            </CationItem>
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
                      <Typography
                        font={FontType.BOLD_BODY}
                        color={BasicColor.BLUE100}
                      >
                        {item.objective}
                      </Typography>
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
            <Playlist playlist={data?.music as any} controls={false} />
          </PlaylistStyled>
        </RoomContentStyled>
      </RoomInfoStyled>
      <PlayButton href={`/play?category=${category}&id=${id}`}>
        <Typography
          tag="span"
          font={FontType.BOLD_TITLE_01}
          color={BasicColor.WHITE}
        >
          체험해볼래요!
        </Typography>
      </PlayButton>
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
  height: 48vh;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

const ThumImage = styled.img<{ url: string }>`
  width: 200px;
  height: 180px;
  position: absolute;
  left: 50px;
  bottom: -20px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
  border-radius: 0 30px 30px 30px;
`;

const TagStyled = styled.div`
  position: absolute;
  right: 50px;
  bottom: 30px;
`;

const CatecoryStyled = styled.div`
  display: inline-flex;
  padding: 6px 22px;
  border: 1px solid ${BasicColor.BLUE80};
  border-radius: 20px;
  box-sizing: border-box;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  margin-right: 2px;
`;

const TagItem = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  background-color: ${BasicColor.GREEN10};
  border: 1px solid ${BasicColor.GREEN20};
  box-sizing: border-box;
  border-radius: 24px;
  margin-left: 12px;
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
  margin-top: 50px;
  padding-left: 50px;
`;

const CaptionStyled = styled.div`
  display: flex;
  flex-direction: row;
`;

const CationItem = styled.div`
  display: inline-flex;
  align-items: center;
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
  height: 32vh;
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

const PlaylistStyled = styled.div`
  margin-right: 60px;
  border-left: 1px solid ${BasicColor.GRAY60};
  padding-left: 30px;
`;

const PlayButton = styled.a`
  position: absolute;
  left: 50px;
  bottom: 40px;
  padding: 20px 120px;
  border-radius: 20px;
  background-color: ${BasicColor.BLUE100};
`;

export default Detail;
