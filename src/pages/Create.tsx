import styled from '@emotion/styled';
import { useState } from 'react';
import Modal from '~/components/Modal';

import Typography from '~/components/Typography';
import EMOJI from '~/constants/emoji';
import RoomAssets from '~/constants/room';
import { useUserProfile } from '~/hooks/useUser';
import { Light } from '~/types/Obejct';
import { BasicColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

const Create = () => {
  const { data: user } = useUserProfile();

  const [visibleModal, setVisibleModal] = useState(true);
  const [category, setCategory] = useState('study');
  const [room] = useState({
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
    <>
      <CreateStyled>
        <ContentView></ContentView>
        <ObjectView
          backgroundImage={
            RoomAssets?.[room?.wallColor as keyof typeof RoomAssets]?.[
              room?.light as Light
            ]?.WALL
          }
        >
          <LayerBox>{/*<ObjectBox room={room} />*/}</LayerBox>
        </ObjectView>
      </CreateStyled>
      {visibleModal && (
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
          onButtonClick={() => setVisibleModal(false)}
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
