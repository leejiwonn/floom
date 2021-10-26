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
      <ObjectMemo>
        <img src={RoomAssets[wallColor][light].MEMO} alt="메모지" />
      </ObjectMemo>
      <ObjectPicture>
        <img src={RoomAssets[wallColor][light].PICTURE} alt="액자(포스터)" />
      </ObjectPicture>
      <ObjectConsole>
        <img src={RoomAssets[wallColor][light].CONSOLE} alt="가구장" />
      </ObjectConsole>
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
  width: 16%;
  height: auto;
  position: absolute;
  top: 10%;
  left: 41%;
  z-index: 0;
`;

const ObjectClock = styled.div`
  width: 10%;
  height: auto;
  position: absolute;
  top: 0;
  right: 14%;
  z-index: 0;
`;

const ObjectMemo = styled.div`
  width: 10%;
  height: auto;
  position: absolute;
  right: 45%;
  bottom: 31%;
  z-index: 1;
`;

const ObjectPicture = styled.div`
  width: 6%;
  height: auto;
  position: absolute;
  top: 8%;
  right: 28%;
  z-index: 0;
`;

const ObjectConsole = styled.div`
  width: 20%;
  height: auto;
  position: absolute;
  right: 18%;
  bottom: 33%;
  z-index: 1;
`;

const ObjectSpeaker = styled.div`
  width: 8%;
  height: auto;
  position: absolute;
  right: 20%;
  bottom: 46%;
  z-index: 1;
`;

const ObjectTable = styled.div`
  width: 46%;
  height: auto;
  position: absolute;
  right: 34%;
  bottom: 16%;
  z-index: 0;
`;

const ObjectLight = styled.div`
  width: 10%;
  height: auto;
  position: absolute;
  right: 4%;
  bottom: 20%;
  z-index: 0;
`;

export default ObjectBox;
