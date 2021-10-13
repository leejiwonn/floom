import styled from '@emotion/styled';

import Typography from '~/components/Typography';
import Playlist from '~/components/Playlist';
import { TextColor } from '~/utils/color';
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
        <CaptionStyled>
          <Typography
            font={FontType.LIGHT_CAPTION}
            color={TextColor.SECONDARY}
            marginRight={25}
          >
            체험 54
          </Typography>
          <Typography font={FontType.LIGHT_CAPTION} color={TextColor.SECONDARY}>
            추천 24
          </Typography>
        </CaptionStyled>
      </RoomImageStyled>
      <RoomInfoStyled>
        <RoomTitleStyled>
          <Typography font={FontType.BOLD_TITLE_01}>{data?.title}</Typography>
          <Typography font={FontType.REGULAR_BODY} color={TextColor.SECONDARY}>
            {data?.creator}
          </Typography>
        </RoomTitleStyled>
        <RoomContentStyled>
          <UserListStyled>
            <Typography font={FontType.BOLD_TITLE_01} marginBottom={24}>
              다른 사람들은
              <br />
              이런 일에 몰입했어요!
            </Typography>
            <Typography
              font={FontType.LIGHT_CAPTION}
              color={TextColor.SECONDARY}
            >
              <Typography
                tag="span"
                font={FontType.BOLD_BODY}
                color={TextColor.SECONDARY}
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
          color={TextColor.WHITE}
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
  padding: 40px 40px;
  padding-top: 130px;
  background-color: #f8f8f8;
`;

const RoomImageStyled = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

const RoomImage = styled.img<{ url: string }>`
  width: 100%;
  height: 250px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const ThumImage = styled.img<{ url: string }>`
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50px;
  bottom: -75px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
  border-radius: 200px;
  border: 6px solid #fff;
`;

const CaptionStyled = styled.div`
  position: absolute;
  left: 230px;
  bottom: -50px;
  display: flex;
  flex-direction: row;
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
  margin-top: 100px;
  padding-left: 50px;
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
  background-color: #587bfa;
`;

export default Detail;
