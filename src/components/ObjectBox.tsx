import styled from '@emotion/styled';

import RoomAssets from '~/constants/room';
import { Room, RoomObject } from '~/types/Room';

interface Props {
  room: Pick<Room, 'wallColor' | 'light'>;
  objects: RoomObject;
}

const ObjectBox = ({ room: { wallColor, light }, objects }: Props) => {
  return (
    <ObjectBoxStyled>
      <ObjectVase
        src={RoomAssets[wallColor][light].VASE[objects.vase]}
        alt="화분"
      />
      <ObjectClock
        src={RoomAssets[wallColor][light].CLOCK[objects.clock]}
        alt="시계"
      />
      <ObjectBoard
        src={RoomAssets[wallColor][light].BOARD[objects.board]}
        alt="보드"
      />
      <ObjectPoster
        src={RoomAssets[wallColor][light].POSTER[objects.poster]}
        alt="포스터"
      />
      <ObjectSpeaker
        src={RoomAssets[wallColor][light].SPEAKER[objects.speaker]}
        alt="스피커"
      />
      <ObjectTable
        src={RoomAssets[wallColor][light].TABLE[objects.table]}
        alt="책상"
      />
      <ObjectLight
        src={RoomAssets[wallColor][light].LIGHT[objects.light]}
        alt="조명"
      />
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

const ObjectVase = styled.img`
  width: 13%;
  height: auto;
  position: absolute;
  top: 4%;
  left: 44%;
  z-index: 0;
`;

const ObjectClock = styled.img`
  width: 9%;
  height: auto;
  position: absolute;
  top: -12%;
  right: 16%;
  z-index: 0;
`;

const ObjectBoard = styled.img`
  width: 15%;
  height: auto;
  position: absolute;
  right: 0;
  top: 13%;
  z-index: 1;
`;

const ObjectPoster = styled.img`
  width: 16%;
  height: auto;
  position: absolute;
  top: -10%;
  right: 28%;
  z-index: 0;
`;

const ObjectSpeaker = styled.img`
  width: 12%;
  height: auto;
  position: absolute;
  left: 8%;
  bottom: 18%;
  z-index: 1;
`;

const ObjectTable = styled.img`
  width: 30%;
  height: auto;
  position: absolute;
  right: 30%;
  bottom: -6%;
  z-index: 0;
`;

const ObjectLight = styled.img`
  width: 13%;
  height: auto;
  position: absolute;
  right: 20%;
  bottom: 40%;
  z-index: 0;
`;

export default ObjectBox;
