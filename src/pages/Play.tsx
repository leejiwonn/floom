import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { useRoom } from '~/hooks/useRoom';
import StepA from '~/components/Guide/StepA';
import StepB from '~/components/Guide/StepB';
import StepC from '~/components/Guide/StepC';
import Typography from '~/components/Typography';
import Screen from '~/components/Screen';
import { FontType } from '~/utils/font';
import { BasicColor } from '~/utils/color';
import ROOM from '~/constants/room';
import { Light, Todo } from '~/types/Obejct';
import Timer from '~/components/Timer';
import Checklist from '~/components/Checklist';

interface Props {
  category: string;
  id: string;
}

const Play = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderShow, setSliderShow] = useState(true);
  const [objective, setObjective] = useState('');
  const [time, setTime] = useState(0);
  const [todos, setTodos] = useState([]);
  const [isFull, setIsPull] = useState(false);

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const getSubTitle = (page: number) => {
    if (page === 0) {
      return '처음에는 가볍게 목표부터 설정해볼까요?';
    } else if (page === 1) {
      return '집중하고자 하는 시간을 딱 정해보세요!';
    } else if (page === 2) {
      return '작은 목표를 차곡차곡 쌓으며 성취감을 느껴요 😊';
    }
  };

  const handleChangeTodos = (todo: Todo) => {
    if (todo.text !== '' && todos.indexOf(todo.text) === -1) {
      setTodos((prev) => [todo, ...prev]);
    }
  };

  const handleDeleteTodo = (todo: Todo) => {
    setTodos((prev) => prev.filter((item) => item.text !== todo.text));
  };

  const handleClearTodo = useCallback(
    (todo: Todo) => {
      setTodos((prev) =>
        prev.map((item) => {
          if (item.text === todo.text) {
            item.clear = !item.clear;
          }
          return item;
        }),
      );
    },
    [todos],
  );

  return (
    <PlayStyled>
      {currentPage < 3 && (
        <PlayView>
          {sliderShow && (
            <StepStyled>
              <StepTitleStyled>
                <Typography
                  font={FontType.REGULAR_BODY}
                  color={BasicColor.DARK70}
                >
                  {getSubTitle(currentPage)}
                </Typography>
                <Typography
                  font={FontType.LIGHT_BODY}
                  color={BasicColor.DARK40}
                >
                  {currentPage + 1} / 3
                </Typography>
              </StepTitleStyled>
              <StatusBarStyled>
                <StatusBarActive status={(currentPage + 1) * (400 / 3)} />
                <StatusBarBackground />
              </StatusBarStyled>
              {currentPage === 0 && (
                <StepA
                  onChangeGoalText={setObjective}
                  placeholderInfo="20자 이내의 목표를 입력해주세요"
                  onNextPage={handleNextPage}
                />
              )}
              {currentPage === 1 && (
                <StepB
                  objective={objective}
                  time={time}
                  onChangeTime={setTime}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              )}
              {currentPage === 2 && (
                <StepC
                  todos={todos}
                  onChangeTodos={handleChangeTodos}
                  onDeleteTodo={handleDeleteTodo}
                  objective={objective}
                  placeholderInfo="작은 목표를 입력해주세요"
                  onSliderShow={setSliderShow}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              )}
            </StepStyled>
          )}
        </PlayView>
      )}
      <ObjectView
        backgroundImage={
          ROOM?.[data?.wallColor as keyof typeof ROOM]?.[data?.light as Light]
            ?.WALL
        }
        page={currentPage}
      >
        <LayerBox page={currentPage}>
          <ObjectBox>
            <ObjectWindow>
              {
                ROOM?.[data?.wallColor as keyof typeof ROOM]?.[
                  data?.light as Light
                ]?.WINDOW
              }
            </ObjectWindow>
            <ObjectClock>
              {
                ROOM?.[data?.wallColor as keyof typeof ROOM]?.[
                  data?.light as Light
                ]?.CLOCK
              }
            </ObjectClock>
            <ObjectMemo>
              {
                ROOM?.[data?.wallColor as keyof typeof ROOM]?.[
                  data?.light as Light
                ]?.MEMO
              }
            </ObjectMemo>
            <ObjectPicture>
              {
                ROOM?.[data?.wallColor as keyof typeof ROOM]?.[
                  data?.light as Light
                ]?.PICTURE
              }
            </ObjectPicture>
            <ObjectSpeaker>
              {
                ROOM?.[data?.wallColor as keyof typeof ROOM]?.[
                  data?.light as Light
                ]?.SPEAKER
              }
            </ObjectSpeaker>
            <ObjectTable>
              {
                ROOM?.[data?.wallColor as keyof typeof ROOM]?.[
                  data?.light as Light
                ]?.TABLE
              }
            </ObjectTable>
          </ObjectBox>
          {currentPage >= 3 && (
            <PopupBox>
              <ScreenStyled
                isFull={isFull}
                onClick={() => setIsPull((prev) => !prev)}
              >
                <Screen type={data?.screen[0]} url={data?.screen[1]} />
              </ScreenStyled>
            </PopupBox>
          )}
        </LayerBox>
      </ObjectView>
      {currentPage >= 3 && (
        <ContentView>
          <ContentTitleView>
            <Typography
              font={FontType.EXTRA_BOLD_TITLE_01}
              marginLeft={20}
              marginRight={20}
              marginBottom={15}
            >
              {objective}
            </Typography>
            {time !== 0 && <Timer time={time} />}
          </ContentTitleView>
          <Checklist
            todos={todos}
            onClearTodo={handleClearTodo}
            onDeleteTodo={handleDeleteTodo}
          />
          <UIHiddenButton onClick={() => console.log('hidden')}>
            <Typography font={FontType.BOLD_TITLE_01} color={BasicColor.WHITE}>
              UI 가리기
            </Typography>
          </UIHiddenButton>
          <EndButton href={`/detail?category=${category}&id=${id}`}>
            <Typography
              font={FontType.BOLD_TITLE_01}
              color={BasicColor.DARK100}
            >
              체험 종료
            </Typography>
          </EndButton>
        </ContentView>
      )}
    </PlayStyled>
  );
};

const PlayStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

const PlayView = styled.div`
  width: 480px;
  height: 100%;
  position: absolute;
  left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 50px 0;
  padding-top: 100px;
  z-index: 2;
`;

const StepStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid ${BasicColor.GRAY60};
  box-sizing: border-box;
  box-shadow: 0px 20px 24px rgba(0, 0, 0, 0.08);
  border-radius: 0px 30px 30px 30px;
  background-color: ${BasicColor.WHITE};
  padding: 40px;
`;

const StepTitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StatusBarStyled = styled.div`
  width: 100%;
  height: 8px;
  position: relative;
  overflow: hidden;
  border-radius: 53px;
  margin-bottom: 30px;
`;

const StatusBarActive = styled.div<{ status: number }>`
  width: ${({ status }) => status + 'px'};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 53px;
  background-color: ${BasicColor.GREEN100};
  transition: 0.1s;
  z-index: 1;
`;

const StatusBarBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${BasicColor.GREEN10};
`;

const ObjectView = styled.div<{ page: number; backgroundImage: string }>`
  width: ${({ page }) => (page === 1 || page === 2 ? '150%' : '100%')};
  height: ${({ page }) => (page === 1 || page === 2 ? '150%' : '100%')};
  position: absolute;
  top: ${({ page }) => (page === 1 ? '-10vw' : page === 2 ? '-30vw' : '0')};
  right: ${({ page }) => (page === 1 ? '-20vw' : page === 2 ? '-30vw' : '0')};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 50%;
  transition: 0.3s ease-in-out;
  z-index: 0;
`;

const LayerBox = styled.div<{ page: number }>`
  width: ${({ page }) => (page === 1 || page === 2 ? '80vw' : '60vw')};
  height: ${({ page }) => (page === 1 || page === 2 ? '100vh' : '80vh')};
  position: absolute;
  right: ${({ page }) => (page === 1 ? '26vw' : page === 2 ? '15vw' : '0')};
  bottom: 2vh;
  transition: 0.3s ease-in-out;
`;

const ObjectBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  div {
    svg {
      width: 100%;
    }
  }
`;

const ObjectWindow = styled.div`
  width: 20%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const ObjectClock = styled.div`
  width: 14%;
  height: auto;
  position: absolute;
  top: 2%;
  right: 32%;
  z-index: 0;
`;

const ObjectMemo = styled.div`
  width: 10%;
  height: auto;
  position: absolute;
  left: 36%;
  bottom: 34.5%;
  z-index: 1;
`;

const ObjectPicture = styled.div`
  width: 16%;
  height: auto;
  position: absolute;
  top: 30%;
  right: 16%;
  z-index: 0;
`;

const ObjectSpeaker = styled.div`
  width: 16%;
  height: auto;
  position: absolute;
  left: 22%;
  bottom: 38%;
  z-index: 1;
`;

const ObjectTable = styled.div`
  width: 52%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: 3%;
  z-index: 0;
`;

const PopupBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ScreenStyled = styled.button<{ isFull: boolean }>`
  width: ${({ isFull }) => (isFull ? '100%' : '200px')};
  height: ${({ isFull }) => (isFull ? '100%' : '200px')};
  position: absolute;
  top: ${({ isFull }) => (isFull ? '0' : '200px')};
  right: ${({ isFull }) => (isFull ? '0' : '100px')};
`;

const ContentView = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const ContentTitleView = styled.div`
  width: 400px;
  height: auto;
  position: relative;
  top: 100px;
  left: 50px;
  background-color: ${BasicColor.WHITE};
  border: 2px solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  box-shadow: 0px 20px 24px rgba(0, 0, 0, 0.08);
  border-radius: 0px 30px 30px 30px;
  padding-top: 15px;
`;

const UIHiddenButton = styled.button`
  position: absolute;
  right: 250px;
  bottom: 30px;
  padding: 15px 60px;
  border: 2px solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(14px);
`;

const EndButton = styled.a`
  position: absolute;
  right: 30px;
  bottom: 30px;
  padding: 15px 60px;
  border: 2px solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  border-radius: 18px;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
`;

export default Play;
