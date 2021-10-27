import styled from '@emotion/styled';

import RoomAssets from '~/constants/room';
import { Room } from '~/types/Room';

interface Props {
  room: Pick<Room, 'wallColor' | 'light'>;
}

const ObjectBox = ({ room: { wallColor, light } }: Props) => {
  return (
    <ObjectBoxStyled>
      <ObjectVase>
        <img src={RoomAssets[wallColor][light].VASE} alt="화분" />
      </ObjectVase>
      <ObjectClock>
        <img src={RoomAssets[wallColor][light].CLOCK} alt="시계" />
      </ObjectClock>
      <ObjectBoard>
        <img src={RoomAssets[wallColor][light].BOARD} alt="보드" />
      </ObjectBoard>
      <ObjectPoster>
        <img src={RoomAssets[wallColor][light].POSTER} alt="포스터" />
      </ObjectPoster>
      <ObjectSpeaker>
        <img src={RoomAssets[wallColor][light].SPEAKER} alt="스피커" />
      </ObjectSpeaker>
      <ObjectTable>
        <img src={RoomAssets[wallColor][light].TABLE} alt="책상" />
      </ObjectTable>
      <ObjectLight>
        <img src={RoomAssets[wallColor][light].LIGHT} alt="조명" />
      </ObjectLight>
    </ObjectBoxStyled>
  );
};

const ObjectBoxStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  div {
    img {
      width: 100%;
    }
  }
`;

const ObjectVase = styled.div`
  width: 13%;
  height: auto;
  position: absolute;
  top: 4%;
  left: 44%;
  z-index: 0;
`;

const ObjectClock = styled.div`
  width: 9%;
  height: auto;
  position: absolute;
  top: -12%;
  right: 16%;
  z-index: 0;
`;

const ObjectBoard = styled.div`
  width: 15%;
  height: auto;
  position: absolute;
  right: 0;
  top: 13%;
  z-index: 1;
`;

const ObjectPoster = styled.div`
  width: 16%;
  height: auto;
  position: absolute;
  top: -10%;
  right: 28%;
  z-index: 0;
`;

const ObjectSpeaker = styled.div`
  width: 12%;
  height: auto;
  position: absolute;
  left: 8%;
  bottom: 18%;
  z-index: 1;
`;

const ObjectTable = styled.div`
  width: 30%;
  height: auto;
  position: absolute;
  right: 30%;
  bottom: -6%;
  z-index: 0;
`;

const ObjectLight = styled.div`
  width: 13%;
  height: auto;
  position: absolute;
  right: 20%;
  bottom: 40%;
  z-index: 0;
`;

export default ObjectBox;
