import styled from '@emotion/styled';

import ROOM from '~/constants/room';
import { Light } from '~/types/Obejct';
import { Room } from '~/types/Room';

interface Props {
  room: Room;
}

const ObjectBox = ({ room }: Props) => {
  console.log(room);
  return (
    <ObjectBoxStyled>
      <ObjectVase>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.VASE
          }
          alt="vase"
        />
      </ObjectVase>
      <ObjectClock>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.CLOCK
          }
          alt="clock"
        />
      </ObjectClock>
      <ObjectMemo>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.MEMO
          }
          alt="memo"
        />
      </ObjectMemo>
      <ObjectPicture>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.PICTURE
          }
          alt="picture"
        />
      </ObjectPicture>
      <ObjectConsole>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.CONSOLE
          }
          alt="console"
        />
      </ObjectConsole>
      <ObjectSpeaker>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.SPEAKER
          }
          alt="speaker"
        />
      </ObjectSpeaker>
      <ObjectTable>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.TABLE
          }
          alt="table"
        />
      </ObjectTable>
      <ObjectLight>
        <img
          src={
            ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
              ?.LIGHT
          }
          alt="light"
        />
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
