import styled from '@emotion/styled';

import Typography from '~/components/Typography';
import Playlist from '~/components/Playlist';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { useRoom } from '~/hooks/useRoom';

interface Props {
  category: string;
  id: string;
}

const Detail = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);

  return (
    <DetailStyled>
      <RoomImageStyled>
        <RoomImage url={data?.screen[1]} />
        <ThumImage url={data?.screen[1]} />
        <TagStyled>
          <CatecoryStyled>
            <Typography font={FontType.BOLD_BODY} color={BasicColor.BLUE100}>
              {category}
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
          <Typography font={FontType.BOLD_TITLE_01}>{data?.title}</Typography>
          <Typography font={FontType.REGULAR_BODY} color={BasicColor.DARK70}>
            {data?.creator}
          </Typography>
          <CaptionStyled>
            <Typography
              font={FontType.LIGHT_CAPTION}
              color={BasicColor.DARK70}
              marginRight={25}
            >
              체험 54
            </Typography>
            <Typography font={FontType.LIGHT_CAPTION} color={BasicColor.DARK70}>
              추천 24
            </Typography>
          </CaptionStyled>
        </RoomTitleStyled>
        <RoomContentStyled>
          <UserListStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={24}>
              다른 사람들은
              <br />
              이런 일에 몰입했어요!
            </Typography>
            <Typography font={FontType.LIGHT_CAPTION} color={BasicColor.DARK70}>
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
          </UserListStyled>
          <PlaylistStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={16}>
              플레이리스트
            </Typography>
            <Playlist
              playlist={[
                {
                  name: 'Nice piano and ukulele',
                  author: 'Royalty',
                  url: 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
                  duration: '2:02',
                },
                {
                  name: 'Gentle acoustic',
                  author: 'Acoustic',
                  url: 'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
                  duration: '2:20',
                },
                {
                  name: 'Corporate motivational',
                  author: 'Corporate',
                  url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
                  duration: '2:59',
                },
                {
                  name: 'Slow cinematic',
                  author: 'Royalty',
                  url: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
                  duration: '3:26',
                },
              ]}
              controls={false}
            />
          </PlaylistStyled>
        </RoomContentStyled>
      </RoomInfoStyled>
      <PlayButton href={`/play?category=${category}&id=${id}`}>
        <Typography
          tag="span"
          font={FontType.BOLD_TITLE_02}
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
  height: 45vh;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

const ThumImage = styled.img<{ url: string }>`
  width: 200px;
  height: 160px;
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
  background-color: ${BasicColor.WHITE};
  border: 1px solid ${BasicColor.BLUE80};
  border-radius: 24px;
  margin-left: 12px;
`;

const TagItem = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  background-color: ${BasicColor.GREEN10};
  border: 1px solid ${BasicColor.GREEN20};
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

const RoomContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`;

const UserListStyled = styled.div`
  width: 300px;
  height: auto;
  margin-right: 50px;
`;

const PlaylistStyled = styled.div``;

const PlayButton = styled.a`
  position: absolute;
  left: 50px;
  bottom: 40px;
  padding: 15px 120px;
  border-radius: 20px;
  background-color: ${BasicColor.BLUE100};
`;

export default Detail;
