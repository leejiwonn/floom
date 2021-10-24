import styled from '@emotion/styled';
import { useState } from 'react';

import ObjectBox from '~/components/ObjectBox';
import ROOM from '~/constants/room';
import { useUserProfile } from '~/hooks/useUser';
import { Light } from '~/types/Obejct';
import { BasicColor } from '~/utils/color';

const Create = () => {
  const { data: user } = useUserProfile();

  const [room, setRoom] = useState({
    id: '',
    title: '',
    creator: user,
    roomImage: '',
    screen: [],
    light: 'ONE',
    music: [],
    tags: [],
    playCount: 0,
    recommendCount: 0,
    usedUsers: [],
    wallColor: 'YELLOW',
  });

  return (
    <CreateStyled>
      <ContentView></ContentView>
      <ObjectView
        backgroundImage={
          ROOM?.[room?.wallColor as keyof typeof ROOM]?.[room?.light as Light]
            ?.WALL
        }
      >
        <LayerBox>
          <ObjectBox room={room} />
        </LayerBox>
      </ObjectView>
    </CreateStyled>
  );
};

const CreateStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
`;

const ContentView = styled.div`
  width: 400px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${BasicColor.WHITE};
  z-index: 1;
`;

const ObjectView = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 50%;
  transition: 0.4s ease-in-out;
  z-index: 0;
`;

const LayerBox = styled.div`
  width: 60vw;
  height: 80vh;
  position: absolute;
  right: 0;
  bottom: 0;
  transition: 0.4s ease-in-out;
  z-index: 1;
`;

export default Create;
