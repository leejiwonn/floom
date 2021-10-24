import styled from '@emotion/styled';
import { useState } from 'react';
import Router from 'next/router';

import Modal from '~/components/Modal';
import ObjectBox from '~/components/ObjectBox';
import Typography from '~/components/Typography';
import EMOJI from '~/constants/emoji';
import ROOM from '~/constants/room';
import { useUserProfile } from '~/hooks/useUser';
import { Light } from '~/types/Obejct';
import { BasicColor, getWallColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

import LightIcon from '../../public/assets/icons/icon-light.svg';
import WallIcon from '../../public/assets/icons/icon-wall.svg';

const Create = () => {
  const { data: user } = useUserProfile();

  const [visibleCategoryModal, setVisibleCategoryModal] = useState(true);
  const [category, setCategory] = useState('study');
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

  const handleCreateButtonClick = () => {
    Router.push('/');
  };

  return (
    <>
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
          {!visibleCategoryModal && (
            <>
              <RoomControlStyled>
                <RoomControlItem>
                  <RoomControlItemBox>
                    {['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'].map(
                      (value, index) => (
                        <RoomControlItemColor
                          key={index}
                          onClick={() =>
                            setRoom((prev) => {
                              return { ...prev, wallColor: value };
                            })
                          }
                          color={getWallColor(value)}
                        />
                      ),
                    )}
                  </RoomControlItemBox>
                  <RoomControlItemButton
                    backgroundColor={getWallColor(room.wallColor)}
                  >
                    <WallIcon />
                  </RoomControlItemButton>
                </RoomControlItem>
                <RoomControlItem>
                  <RoomControlItemBox>
                    {['ONE', 'TWO', 'THREE'].map((value, index) => (
                      <RoomControlItemColor
                        key={index}
                        onClick={() =>
                          setRoom((prev) => {
                            return { ...prev, light: value };
                          })
                        }
                        color={getWallColor(room.wallColor, value)}
                      />
                    ))}
                  </RoomControlItemBox>
                  <RoomControlItemButton
                    backgroundColor={getWallColor(room.wallColor, room.light)}
                  >
                    <LightIcon />
                  </RoomControlItemButton>
                </RoomControlItem>
              </RoomControlStyled>
              <CreateButton onClick={handleCreateButtonClick}>
                <Typography font={FontType.BOLD_BODY} color={BasicColor.WHITE}>
                  등록 완료
                </Typography>
              </CreateButton>
            </>
          )}
        </ObjectView>
      </CreateStyled>
      {visibleCategoryModal && (
        <Modal
          title="카테고리 선택"
          subTitle={<>방에서 어떤 일을 하고싶으세요?</>}
          content="자유롭게 선택해주세요!"
          action={
            <CategoryStyled>
              <CategoryItem onClick={() => setCategory('study')}>
                <CategoryItemIcon active={category === 'study'}>
                  {EMOJI.STUDY}
                </CategoryItemIcon>
                <Typography
                  font={FontType.SEMI_BOLD_BODY}
                  color={
                    category === 'study'
                      ? BasicColor.BLUE100
                      : BasicColor.DARK100
                  }
                  align={Align.CENTER}
                >
                  학습
                </Typography>
              </CategoryItem>
              <CategoryItem onClick={() => setCategory('work')}>
                <CategoryItemIcon active={category === 'work'}>
                  {EMOJI.WORK}
                </CategoryItemIcon>
                <Typography
                  font={FontType.SEMI_BOLD_BODY}
                  color={
                    category === 'work'
                      ? BasicColor.BLUE100
                      : BasicColor.DARK100
                  }
                  align={Align.CENTER}
                >
                  업무
                </Typography>
              </CategoryItem>
              <CategoryItem onClick={() => setCategory('rest')}>
                <CategoryItemIcon active={category === 'rest'}>
                  {EMOJI.REST}
                </CategoryItemIcon>
                <Typography
                  font={FontType.SEMI_BOLD_BODY}
                  color={
                    category === 'rest'
                      ? BasicColor.BLUE100
                      : BasicColor.DARK100
                  }
                  align={Align.CENTER}
                >
                  휴식
                </Typography>
              </CategoryItem>
            </CategoryStyled>
          }
          buttonActive
          buttonText="완료"
          onButtonClick={() => setVisibleCategoryModal(false)}
        />
      )}
    </>
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

const RoomControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 140px;
  right: 50px;
  z-index: 3;
`;

const RoomControlItem = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-radius: 35px;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 5px;
  margin-bottom: 15px;
`;

const RoomControlItemButton = styled.button<{ backgroundColor: BasicColor }>`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const RoomControlItemBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 4px;
`;

const RoomControlItemColor = styled.button<{ color: BasicColor }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin: 0 4px;
`;

const CreateButton = styled.button`
  position: absolute;
  right: 50px;
  bottom: 40px;
  padding: 15px 60px;
  border: 2px solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(14px);
  z-index: 98;
`;

const CategoryStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
`;

const CategoryItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
`;

const CategoryItemIcon = styled.div<{ active: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE80 : BasicColor.WHITE};
  box-sizing: border-box;
  box-shadow: ${({ active }) => !active && '0px 4px 4px rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${BasicColor.BLUE100};
  border-radius: 18px;
  margin-bottom: 10px;
  transition: 0.1s;
`;

export default Create;
