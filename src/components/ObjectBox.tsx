import styled from '@emotion/styled';

import ROOM from '~/constants/room';
import { Room, RoomObjectId, RoomObject } from '~/types/Room';

interface Props {
  room: Pick<Room, 'wallColor' | 'light'>;
  objects: RoomObjectId;
  onObjectClick?: (object: RoomObject) => void;
}

const ObjectBox = ({ objects, onObjectClick }: Props) => {
  return (
    <ObjectBoxStyled>
      <ObjectVase onClick={() => onObjectClick?.('vase')}>
        <img src={ROOM.VASE[objects.vase]} alt="화분" />
      </ObjectVase>
      <ObjectClock onClick={() => onObjectClick?.('clock')}>
        <img src={ROOM.CLOCK[objects.clock]} alt="시계" />
      </ObjectClock>
      <ObjectBoard>
        <img src={ROOM.BOARD[objects.board]} alt="보드" />
      </ObjectBoard>
      <ObjectPoster onClick={() => onObjectClick?.('poster')}>
        <img src={ROOM.POSTER[objects.poster]} alt="포스터" />
      </ObjectPoster>
      <ObjectSpeaker onClick={() => onObjectClick?.('speaker')}>
        <img src={ROOM.SPEAKER[objects.speaker]} alt="스피커" />
      </ObjectSpeaker>
      <ObjectTable onClick={() => onObjectClick?.('table')}>
        <img src={ROOM.TABLE[objects.table]} alt="책상" />
      </ObjectTable>
      <ObjectLight onClick={() => onObjectClick?.('light')}>
        <img src={ROOM.LIGHT[objects.light]} alt="조명" />
      </ObjectLight>
    </ObjectBoxStyled>
  );
};

const ObjectBoxStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;

  button {
    img {
      width: 100%;
    }
  }
`;

const ObjectVase = styled.button`
  width: 15%;
  height: auto;
  position: absolute;
  top: 3%;
  left: 43%;
  z-index: 0;
`;

const ObjectClock = styled.button`
  width: 10%;
  height: auto;
  position: absolute;
  top: -12%;
  right: 16%;
  z-index: 0;
`;

const ObjectBoard = styled.button`
  width: 16%;
  height: auto;
  position: absolute;
  right: 0;
  top: 12%;
  cursor: default;
  z-index: 1;
`;

const ObjectPoster = styled.button`
  width: 20%;
  height: auto;
  position: absolute;
  top: -23%;
  right: 26%;
  z-index: 0;
`;

const ObjectSpeaker = styled.button`
  width: 26%;
  height: auto;
  position: absolute;
  left: -3%;
  bottom: 6%;
  z-index: 1;
`;

const ObjectTable = styled.button`
  width: 39%;
  height: auto;
  position: absolute;
  right: 26%;
  bottom: 1%;
  z-index: 0;
`;

const ObjectLight = styled.button`
  width: 16%;
  height: auto;
  position: absolute;
  right: 18%;
  bottom: 32%;
  z-index: 0;
`;

export default ObjectBox;
