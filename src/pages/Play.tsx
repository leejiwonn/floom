import styled from '@emotion/styled';
import Router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Checklist from '~/components/Checklist';
import StepA from '~/components/Guide/StepA';
import StepB from '~/components/Guide/StepB';
import StepC from '~/components/Guide/StepC';
import Modal from '~/components/Modal';
import ObjectBox from '~/components/ObjectBox';
import OpenButton from '~/components/OpenButton';
import Playlist from '~/components/Playlist';
import Screen from '~/components/Screen';
import TextInput from '~/components/TextInput';
import Timer from '~/components/Timer';
import Typography from '~/components/Typography';
import RoomAssets from '~/constants/room';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import { postReview } from '~/remotes/review';
import { Todo } from '~/types/Obejct';
import { Room } from '~/types/Room';
import { BasicColor } from '~/utils/color';
import { visuallyHidden } from '~/utils/css';
import { FontType } from '~/utils/font';
import ClockOffIcon from '../../public/assets/icons/icon-clock-off.svg';
import ClockOnIcon from '../../public/assets/icons/icon-clock-on.svg';

import ClockIcon from '../../public/assets/icons/icon-clock.svg';
import RecommendIcon from '../../public/assets/icons/icon-recommend.svg';

interface Props {
  room: Room;
}

const Play = ({ room }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderShow, setSliderShow] = useState(true);
  const [visibleModal, setVisibleModal] = useState<
    'timeout' | 'finished' | undefined
  >();
  const [reviewInput, setReviewInput] = useState('');
  const [isRecommend, setIsRecommend] = useState(false);

  const [objective, setObjective] = useState('');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const timerAudioRef = useRef<HTMLAudioElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [visibleClockPopup, setVisibleClockPopup] = useState(false);
  const [visibleSpeakerPopup, setVisibleSpeakerPopup] = useState(false);
  const [visibleMemoPopup, setVisibleMemoPopup] = useState(false);
  const [isFull, setIsPull] = useState(false);
  const [isTimerAlarm, setIsTimerAlarm] = useState(true);

  const { modalRef: clockRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setVisibleClockPopup(false),
  });
  const { modalRef: speakerRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setVisibleSpeakerPopup(false),
  });
  const { modalRef: memoRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setVisibleMemoPopup(false),
  });

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

  const getTodoClearStatus = (fullNumber: number) => {
    let clearCount = 0;
    todos.map((todo) => todo.clear && (clearCount += 1));

    return clearCount
      ? parseInt((clearCount * Math.max(fullNumber / todos.length)).toFixed())
      : 0;
  };

  const handleChangeTodos = (todo: Todo) => {
    if (
      todo.text !== '' &&
      todos.findIndex((item) => item.text === todo.text) === -1
    ) {
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

  const handleAddTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  useEffect(() => {
    setTimer(time);
  }, [time]);

  const handleTimeout = useCallback(() => {
    setVisibleModal('timeout');
    isTimerAlarm && timerAudioRef.current?.play();
  }, []);

  const handleTimeoutButtonClick = () => {
    setVisibleModal(undefined);
    timerAudioRef.current?.pause();
  };

  const handleFinishedButtonClick = async () => {
    if (reviewInput !== '') {
      try {
        await postReview({
          roomId: room.id,
          objective,
          comment: reviewInput,
          recommend: isRecommend,
        });
      } catch (error) {
        console.warn(error);
        alert('오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.');
      }
      setReviewInput('');
      setIsRecommend(false);
      setVisibleModal(undefined);
      Router.push(`/detail?roomId=${room.id}`);
    }
  };

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 20) {
        setReviewInput(e.target.value);
      }
    },
    [todos, setReviewInput],
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
              <StatusBarStyled statusHeight={8}>
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
        backgroundImage={RoomAssets[room.wallColor][room.light].WALL}
        page={currentPage}
      >
        <LayerBox page={currentPage}>
          <ObjectBox room={room} />
          {currentPage >= 3 && (
            <PopupBox>
              <PopupPictureStyled>
                <OpenButton
                  visible={false}
                  onOpenButtonClick={() => setIsPull((prev) => !prev)}
                />
              </PopupPictureStyled>
              <PopupClockStyled ref={clockRef}>
                <OpenButton
                  visible={visibleClockPopup}
                  onOpenButtonClick={() =>
                    setVisibleClockPopup((prev) => !prev)
                  }
                />
                {visibleClockPopup && (
                  <PopupClock onClick={() => setIsTimerAlarm((prev) => !prev)}>
                    <ClockToggleButton isTimerAlarm={isTimerAlarm}>
                      {isTimerAlarm ? (
                        <ClockOnIcon width={56} height={56} />
                      ) : (
                        <ClockOffIcon width={56} height={56} />
                      )}
                    </ClockToggleButton>
                  </PopupClock>
                )}
              </PopupClockStyled>
              <PopupSpeakerStyled ref={speakerRef}>
                <OpenButton
                  visible={visibleSpeakerPopup}
                  onOpenButtonClick={() =>
                    setVisibleSpeakerPopup((prev) => !prev)
                  }
                />
                <PopupSpeaker visible={visibleSpeakerPopup}>
                  <Playlist
                    playlist={room.musics}
                    controls
                    autoplay
                    viewHeight={24}
                    size="small"
                  />
                </PopupSpeaker>
              </PopupSpeakerStyled>
              <PopupMemoStyled ref={memoRef}>
                <OpenButton
                  visible={visibleMemoPopup}
                  onOpenButtonClick={() => setVisibleMemoPopup((prev) => !prev)}
                />
                {visibleMemoPopup && (
                  <PopupMemo>
                    <PopupMemoTitle>
                      <Typography font={FontType.SEMI_BOLD_BODY}>
                        목표 달성률
                      </Typography>
                      <Typography font={FontType.SEMI_BOLD_BODY}>
                        {todos.length ? `${getTodoClearStatus(100)}%` : '-'}
                      </Typography>
                    </PopupMemoTitle>
                    <StatusBarStyled statusHeight={12}>
                      <StatusBarActive status={getTodoClearStatus(280)} />
                      <StatusBarBackground />
                    </StatusBarStyled>
                  </PopupMemo>
                )}
              </PopupMemoStyled>
            </PopupBox>
          )}
        </LayerBox>
        <Screen
          isFull={isFull}
          onFullButtonClick={() => setIsPull(false)}
          type={room.assets[0].type}
          url={room.assets[0].url}
        />
        {currentPage >= 3 && (
          <>
            <ContentTitleView>
              <Typography
                font={FontType.EXTRA_BOLD_TITLE_01}
                marginLeft={20}
                marginRight={20}
                marginBottom={15}
              >
                {objective}
              </Typography>
              {timer !== 0 && (
                <>
                  <Timer
                    time={time}
                    timeUpdate={() => setTime((prev) => prev + 10)}
                    onTimeout={handleTimeout}
                  />
                  <audio
                    ref={timerAudioRef}
                    src={'/audio/timeout.mp3'}
                    loop
                    css={visuallyHidden}
                  />
                </>
              )}
            </ContentTitleView>
            <Checklist
              todos={todos}
              onClearTodo={handleClearTodo}
              onDeleteTodo={handleDeleteTodo}
              onAddTodo={handleAddTodo}
            />
            <EndButton onClick={() => setVisibleModal('finished')}>
              <Typography font={FontType.BOLD_BODY} color={BasicColor.WHITE}>
                체험 종료
              </Typography>
            </EndButton>
          </>
        )}
      </ObjectView>
      {visibleModal === 'timeout' && (
        <Modal
          setShow={(type) =>
            setVisibleModal(type as 'timeout' | 'finished' | undefined)
          }
          title="목표시간 달성!"
          subTitle={
            <>
              설정한 목표시간{' '}
              <Typography
                tag="span"
                font={FontType.SEMI_BOLD_BODY}
                color={BasicColor.BLUE100}
              >
                {time}분
              </Typography>
              이 되었어요!
            </>
          }
          emoji={
            <Emoji>
              <ClockIcon />
            </Emoji>
          }
          content="확인 후 연장하기 버튼을 누르면 목표시간이 연장됩니다."
          buttonText="확인"
          onButtonClick={handleTimeoutButtonClick}
        />
      )}
      {visibleModal === 'finished' && (
        <Modal
          setShow={(type) =>
            setVisibleModal(type as 'timeout' | 'finished' | undefined)
          }
          title="체험 종료하기"
          subTitle={
            <>
              이 방에서 몰입에{' '}
              <Typography
                tag="span"
                font={FontType.SEMI_BOLD_BODY}
                color={BasicColor.BLUE100}
              >
                성공
              </Typography>
              하셨나요?
            </>
          }
          content="성공 여부와 한 줄 평을 기록해주세요!"
          action={
            <ActionStyled>
              <RecommendButton
                onClick={() => setIsRecommend((prev) => !prev)}
                isRecommend={isRecommend}
              >
                <RecommendIcon
                  fill={isRecommend ? BasicColor.WHITE : BasicColor.BLUE100}
                  stroke={isRecommend ? BasicColor.WHITE : BasicColor.BLUE100}
                />
              </RecommendButton>
              <TextInput
                maxLength={20}
                value={reviewInput}
                onChangeInput={handleChangeInput}
                placeholder="한 줄 평을 작성해주세요."
              />
            </ActionStyled>
          }
          resetAction={() => {
            setIsRecommend(false);
            setReviewInput('');
          }}
          buttonActive={reviewInput !== ''}
          buttonText={reviewInput !== '' ? '완료' : '작성중'}
          onButtonClick={handleFinishedButtonClick}
        />
      )}
    </PlayStyled>
  );
};

const PlayStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
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

const StatusBarStyled = styled.div<{ statusHeight: number }>`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 53px;
  padding-bottom: ${({ statusHeight }) => statusHeight + 'px'};
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
  width: ${({ page }) => (page === 1 || page === 2 ? '190%' : '100%')};
  height: ${({ page }) => (page === 1 || page === 2 ? '190%' : '100%')};
  position: absolute;
  top: ${({ page }) => (page === 1 ? '-6vh' : page === 2 ? '-68vh' : '0')};
  right: ${({ page }) => (page === 1 ? '0vw' : page === 2 ? '-28vw' : '0')};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 50%;
  transition: 0.4s ease-in-out;
  z-index: 0;
`;

const LayerBox = styled.div<{ page: number }>`
  width: ${({ page }) => (page === 1 || page === 2 ? '110vw' : '60vw')};
  height: ${({ page }) => (page === 1 || page === 2 ? '150vh' : '80vh')};
  position: absolute;
  right: ${({ page }) => (page === 1 ? '2vw' : page === 2 ? '2vw' : '0')};
  bottom: ${({ page }) => (page === 1 ? '8vh' : page === 2 ? '8vh' : '0')};
  transition: 0.4s ease-in-out;
  z-index: 1;
`;

const PopupBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

const PopupPictureStyled = styled.div`
  position: absolute;
  top: 11%;
  left: 70%;
`;

const PopupClockStyled = styled.div`
  width: 80px;
  position: absolute;
  top: 3%;
  left: 82%;
  padding: 5px;
`;

const PopupClock = styled.button`
  width: 100%;
  position: absolute;
  top: 45px;
  right: 4px;
  padding: 6px;
  background-color: ${BasicColor.BLUE100};
  border: 2px solid ${BasicColor.BLUE90};
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 35px;
`;

const ClockToggleButton = styled.div<{ isTimerAlarm: boolean }>`
  width: 30px;
  height: 30px;
  position: relative;
  left: ${({ isTimerAlarm }) => (isTimerAlarm ? 34 + 'px' : 0)};
  background-color: ${BasicColor.WHITE};
  border-radius: 50%;
  transition: 0.3s;

  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const PopupSpeakerStyled = styled.div`
  width: 240px;
  position: absolute;
  left: 78%;
  bottom: 55%;
  z-index: 1;
`;

const PopupSpeaker = styled.div<{ visible: boolean }>`
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: -200px;
  left: -250px;
  background-color: ${BasicColor.WHITE};
  border-radius: 30px;
  opacity: ${({ visible }) => (visible ? 100 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'visible' : 'none')};
`;

const PopupMemoStyled = styled.div`
  width: 300px;
  position: absolute;
  left: 53%;
  bottom: 36%;
`;

const PopupMemo = styled.div`
  width: 100%;
  position: absolute;
  top: -20px;
  left: -310px;
  padding: 15px;
  background-color: ${BasicColor.WHITE};
  border-radius: 10px;
`;

const PopupMemoTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
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

const EndButton = styled.button`
  position: absolute;
  right: 60px;
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

const ActionStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  margin-top: -10px;
`;

const RecommendButton = styled.button<{ isRecommend: boolean }>`
  width: 94px;
  height: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 50%;
  background-color: ${({ isRecommend }) =>
    isRecommend ? BasicColor.BLUE100 : BasicColor.BLUE10};
  transition: 0.1s;
`;

const Emoji = styled.span`
  display: inline-flex;
  width: 60px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 20px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default Play;
