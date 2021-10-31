import styled from '@emotion/styled';
import { useContext } from 'react';

import RoomAssets from '~/constants/room';
import { MouseContext } from '~/context/mouseContext';
import { Room, RoomObjectId, RoomObject } from '~/types/Room';

interface Props {
  room: Pick<Room, 'wallColor' | 'light'>;
  objects: RoomObjectId;
  onObjectClick?: (object: RoomObject) => void;
}

const ObjectBox = ({
  room: { wallColor, light },
  objects,
  onObjectClick,
}: Props) => {
  const { cursorChangeHandler } = useContext(MouseContext);

  return (
    <ObjectBoxStyled>
      <ObjectVase
        onClick={() => onObjectClick?.('vase')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img src={RoomAssets[wallColor][light].VASE[objects.vase]} alt="화분" />
      </ObjectVase>
      <ObjectClock
        onClick={() => onObjectClick?.('clock')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img
          src={RoomAssets[wallColor][light].CLOCK[objects.clock]}
          alt="시계"
        />
      </ObjectClock>
      <ObjectBoard
        onClick={() => onObjectClick?.('board')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img
          src={RoomAssets[wallColor][light].BOARD[objects.board]}
          alt="보드"
        />
      </ObjectBoard>
      <ObjectPoster
        onClick={() => onObjectClick?.('poster')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img
          src={RoomAssets[wallColor][light].POSTER[objects.poster]}
          alt="포스터"
        />
      </ObjectPoster>
      <ObjectSpeaker
        onClick={() => onObjectClick?.('speaker')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img
          src={RoomAssets[wallColor][light].SPEAKER[objects.speaker]}
          alt="스피커"
        />
      </ObjectSpeaker>
      <ObjectTable
        onClick={() => onObjectClick?.('table')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img
          src={RoomAssets[wallColor][light].TABLE[objects.table]}
          alt="책상"
        />
      </ObjectTable>
      <ObjectLight
        onClick={() => onObjectClick?.('light')}
        onMouseEnter={() => cursorChangeHandler('hovered')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        <img
          src={RoomAssets[wallColor][light].LIGHT[objects.light]}
          alt="조명"
        />
      </ObjectLight>
    </ObjectBoxStyled>
  );
};

const ObjectBoxStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  button {
    img {
      width: 100%;
    }
  }
`;

const ObjectVase = styled.button`
  width: 13%;
  height: auto;
  position: absolute;
  top: 4%;
  left: 44%;
  z-index: 0;
`;

const ObjectClock = styled.button`
  width: 9%;
  height: auto;
  position: absolute;
  top: -12%;
  right: 16%;
  z-index: 0;
`;

const ObjectBoard = styled.button`
  width: 15%;
  height: auto;
  position: absolute;
  right: 0;
  top: 13%;
  z-index: 1;
`;

const ObjectPoster = styled.button`
  width: 16%;
  height: auto;
  position: absolute;
  top: -10%;
  right: 28%;
  z-index: 0;
`;

const ObjectSpeaker = styled.button`
  width: 12%;
  height: auto;
  position: absolute;
  left: 8%;
  bottom: 18%;
  z-index: 1;
`;

const ObjectTable = styled.button`
  width: 30%;
  height: auto;
  position: absolute;
  right: 30%;
  bottom: 2%;
  z-index: 0;
`;

const ObjectLight = styled.button`
  width: 13%;
  height: auto;
  position: absolute;
  right: 20%;
  bottom: 40%;
  z-index: 0;
`;

export default ObjectBox;
