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
import TextInput from '~/components/TextInput';
import Timer from '~/components/Timer';
import Typography from '~/components/Typography';
import EMOJI from '~/constants/emoji';
import ROOM from '~/constants/room';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import { useRoomGuestBooks } from '~/hooks/useRoomGuestBooks';
import { postReview } from '~/remotes/review';
import { postRoomGuestBook } from '~/remotes/room';
import { Todo } from '~/types/Obejct';
import { Room } from '~/types/Room';
import { BasicColor } from '~/utils/color';
import { visuallyHidden } from '~/utils/css';
import { Align, FontType } from '~/utils/font';
import Toast from '~/components/Toast';
import { RoomCategory } from '~/types/RoomCategory';
import Screen from '~/components/Screen';

import ClockIcon from '../../public/assets/icons/icon-clock.svg';
import RecommendIcon from '../../public/assets/emojis/emoji-recommend.svg';
import BackgroundFilter from '~/components/BackgroundFilter';
import WEATHER from '~/constants/weather';

interface Props {
  room: Room;
}

const Play = ({ room }: Props) => {
  const { data: guestBooks, mutate: guestBooksMutate } = useRoomGuestBooks(
    room.id,
    { limit: 100 },
  );

  const [isLoading, setIsLoading] = useState('');
  const [visibleToast, setVisibleToast] = useState('');

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

  const [visibleSpeakerPopup, setVisibleSpeakerPopup] = useState(false);
  const [visibleBoardPopup, setVisibleBoardPopup] = useState(false);
  const [guestInput, setGuestInput] = useState({ input: '', emoji: 'HEART' });

  const { modalRef: speakerRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setVisibleSpeakerPopup(false),
  });
  const { modalRef: boardRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => {
      setVisibleBoardPopup(false);
      setGuestInput((prev) => {
        return {
          ...prev,
          input: '',
          emoji: 'HEART',
        };
      });
    },
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

  const getCategoryPlaceholder = (
    category: RoomCategory,
    type: 'big' | 'small',
  ) => {
    if (category.name === '학습') {
      return type === 'big' ? '토익 공부하기' : '문제집 5장 풀기, 채점하기';
    } else if (category.name === '업무') {
      return type === 'big' ? '코딩하기' : 'UI 구현, api 연동';
    } else if (category.name === '휴식') {
      return type === 'big' ? '명상하기' : '크게 쉼호흡, 10분 스트레칭';
    }
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

  const handleChangeGuestInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 30) {
        setGuestInput((prev) => {
          return { ...prev, input: e.target.value };
        });
      }
    },
    [setGuestInput],
  );

  const handleGuestInputEmojiButtonClick = () => {
    const emojiList = [
      'HEART',
      'EXCLAMATION_MARK',
      'QUESTION_MARK',
      'OBJECTIVE',
      'EYES',
      'CHECK2',
    ];

    setGuestInput((prev) => {
      const index = emojiList.indexOf(prev.emoji);
      return {
        ...prev,
        emoji:
          index === emojiList.length - 1 ? emojiList[0] : emojiList[index + 1],
      };
    });
  };

  const handleGuestSubmitButtonClick = async () => {
    if (guestInput.input === '') {
      alert('값을 입력해주세요.');
      return;
    }

    if (isLoading === 'guestBook') {
      return;
    }

    try {
      setIsLoading('guestBook');
      await postRoomGuestBook({
        roomId: room.id,
        body: guestInput.input,
        emoji: guestInput.emoji,
      });
      await guestBooksMutate();
      setIsLoading('');
    } catch (error) {
      setVisibleToast('방명록 작성을 완료하지 못했습니다. 다시 시도해주세요.');
    }
    setGuestInput((prev) => {
      return {
        ...prev,
        input: '',
        emoji: 'HEART',
      };
    });
  };

  useEffect(() => {
    setTimer(time);
  }, [time]);

  const handleTimeout = useCallback(() => {
    setVisibleModal('timeout');
    timerAudioRef.current?.play();
  }, []);

  const handleTimeoutButtonClick = () => {
    setVisibleModal(undefined);
    timerAudioRef.current?.pause();
  };

  const handleFinishedButtonClick = async () => {
    if (isLoading === 'finished') {
      return;
    }

    if (reviewInput !== '') {
      try {
        setIsLoading('finished');
        await postReview({
          roomId: room.id,
          objective,
          comment: reviewInput,
          recommend: isRecommend,
        });
        setIsLoading('');
      } catch (error) {
        setVisibleToast('방 생성을 완료하지 못했습니다. 다시 시도해주세요.');
      }
      setReviewInput('');
      setIsRecommend(false);
      setVisibleModal(undefined);
      Router.push(`/detail?roomId=${room.id}`);
    }
  };

  const handleChangeReviewInput = useCallback(
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
                  placeholderInfo={`ex) ${getCategoryPlaceholder(
                    room.category,
                    'big',
                  )}`}
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
                  placeholderInfo={`ex) ${getCategoryPlaceholder(
                    room.category,
                    'small',
                  )}`}
                  onSliderShow={setSliderShow}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              )}
            </StepStyled>
          )}
        </PlayView>
      )}
      <ObjectView page={currentPage}>
        <BackgroundFilter wallColor={room.wallColor} light={room.light} />
        <ObjectBackgroundWall src={ROOM.WALL[1]} />
        <ObjectBackgroundView>
          <LottieStyled>{WEATHER[room.background]}</LottieStyled>
          <Screen type="thumbnail" assets={room.assets} />
        </ObjectBackgroundView>
        <ObjectCurtain src={ROOM.CURTAIN[1]} />
        <LayerBox page={currentPage}>
          <ObjectBox room={room} objects={room.objectIds} />
        </LayerBox>
        <LayerBox style={{ zIndex: 10 }}>
          {currentPage >= 3 && (
            <PopupBox>
              {room.musics.length > 0 && (
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
              )}
              {room.guestBooksEnabled && (
                <PopupBoardStyled ref={boardRef}>
                  <OpenButton
                    visible={visibleBoardPopup}
                    onOpenButtonClick={() =>
                      setVisibleBoardPopup((prev) => !prev)
                    }
                  />
                  {visibleBoardPopup && (
                    <PopupBoard>
                      <PopupBoardGuestView>
                        <PopupBoardGuestBox>
                          {guestBooks?.[0].items.length ? (
                            guestBooks?.map((x) =>
                              x.items.flatMap((value, index) => (
                                <PopupBoardGuestItem key={index} last={false}>
                                  <PopupBoardGuestEmoji>
                                    {EMOJI[value.emoji as keyof typeof EMOJI]}
                                  </PopupBoardGuestEmoji>
                                  <Typography
                                    font={FontType.SEMI_BOLD_CAPTION}
                                    color={BasicColor.WHITE}
                                    align={Align.CENTER}
                                  >
                                    {value.body}
                                  </Typography>
                                  <Typography
                                    font={FontType.LIGHT_CAPTION}
                                    color={BasicColor.WHITE}
                                  >
                                    {value.author?.displayName ??
                                      value.guestName}
                                  </Typography>
                                </PopupBoardGuestItem>
                              )),
                            )
                          ) : (
                            <Typography
                              color={BasicColor.DARK70}
                              marginLeft={13}
                            >
                              첫 방명록을 작성해보세요!
                            </Typography>
                          )}
                        </PopupBoardGuestBox>
                      </PopupBoardGuestView>
                      <PopupBoardGuestInputView>
                        <GuestInputEmoji
                          onClick={handleGuestInputEmojiButtonClick}
                        >
                          {EMOJI[guestInput.emoji as keyof typeof EMOJI]}
                        </GuestInputEmoji>
                        <TextInput
                          value={guestInput.input}
                          maxLength={50}
                          onChangeInput={handleChangeGuestInput}
                          placeholder="방명록 한 마디를 남겨보세요!"
                          submitButton
                          onSubmitButtonClick={handleGuestSubmitButtonClick}
                          isLoading={isLoading === 'guestBook'}
                        />
                      </PopupBoardGuestInputView>
                    </PopupBoard>
                  )}
                </PopupBoardStyled>
              )}
            </PopupBox>
          )}
        </LayerBox>
        {currentPage >= 3 && (
          <>
            <ContentTitleView>
              <Typography
                font={FontType.EXTRA_BOLD_TITLE_01}
                marginLeft={2}
                marginRight={2}
                marginBottom={1.5}
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
                  width={isRecommend ? '4.6em' : '4.3em'}
                  height={isRecommend ? '4.7em' : '4.4em'}
                  fill={BasicColor.BLUE100}
                  stroke={BasicColor.BLUE100}
                />
              </RecommendButton>
              <TextInput
                maxLength={20}
                value={reviewInput}
                onChangeInput={handleChangeReviewInput}
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
          isLoading={isLoading === 'finished'}
        />
      )}
      {visibleToast && (
        <Toast message={visibleToast} setVisibleToast={setVisibleToast} />
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
  width: 48em;
  height: 100%;
  position: absolute;
  left: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 5em 0;
  padding-top: 10em;
  z-index: 2;
`;

const StepStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0.2em solid ${BasicColor.GRAY60};
  box-sizing: border-box;
  box-shadow: 0 2em 2.4em rgba(0, 0, 0, 0.08);
  border-radius: 0 3em 3em 3em;
  background-color: ${BasicColor.WHITE};
  padding: 4em;
`;

const StepTitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
`;

const StatusBarStyled = styled.div<{ statusHeight: number }>`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 5.3em;
  padding-bottom: ${({ statusHeight }) => statusHeight / 10 + 'em'};
`;

const StatusBarActive = styled.div<{ status: number }>`
  width: ${({ status }) => status / 10 + 'em'};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5.3em;
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

const ObjectView = styled.div<{ page: number }>`
  width: ${({ page }) => (page === 1 || page === 2 ? '190%' : '100%')};
  height: ${({ page }) => (page === 1 || page === 2 ? '190%' : '100%')};
  position: absolute;
  top: ${({ page }) => (page === 1 ? '0vh' : page === 2 ? '-88vh' : '0')};
  right: ${({ page }) => (page === 1 ? '0vw' : page === 2 ? '-26vw' : '0')};
  transition: 0.4s ease-in-out;
  z-index: 0;
`;

const ObjectBackgroundWall = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  pointer-events: none;
  z-index: -1;
`;

const ObjectBackgroundView = styled.div`
  width: 80vw;
  height: 80vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-mask-image: url('https://floom-upload.s3.ap-northeast-2.amazonaws.com/window.svg');
  mask-image: url('https://floom-upload.s3.ap-northeast-2.amazonaws.com/window.svg')
    no-repeat;
  mask-size: 100vw 75.2vh;
  mask-position: -5vw -4vh;
  mask-repeat: no-repeat;
  pointer-events: none;
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: 8%;
  }
`;

const LottieStyled = styled.div`
  width: 72vw;
  height: 72vh;
  position: absolute;
  top: 0;
  left: 10vw;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const ObjectCurtain = styled.img`
  width: 40vw;
  position: absolute;
  top: 0;
  left: 25vw;
  pointer-events: none;
  opacity: 0.9;
  z-index: 3;
`;

const LayerBox = styled.div<{ page?: number }>`
  width: ${({ page }) => (page === 1 || page === 2 ? '110vw' : '60vw')};
  height: ${({ page }) => (page === 1 || page === 2 ? '150vh' : '80vh')};
  position: absolute;
  right: ${({ page }) => (page === 1 ? '2vw' : page === 2 ? '2vw' : '0')};
  bottom: ${({ page }) => (page === 1 ? '8vh' : page === 2 ? '4vh' : '0')};
  transition: 0.4s ease-in-out;
  z-index: 1;
`;

const PopupBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

const PopupSpeakerStyled = styled.div`
  width: 24em;
  position: absolute;
  left: 9%;
  bottom: 34%;
  z-index: 1;
`;

const PopupSpeaker = styled.div<{ visible: boolean }>`
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: -25em;
  left: 4em;
  background-color: ${BasicColor.WHITE};
  border-radius: 3em;
  opacity: ${({ visible }) => (visible ? 100 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'visible' : 'none')};
`;

const PopupBoardStyled = styled.div`
  width: 46em;
  position: absolute;
  left: 84%;
  top: 24%;
  z-index: 1;
`;

const PopupBoard = styled.div`
  width: 100%;
  position: absolute;
  top: 4em;
  right: 40em;
  padding: 1.5em;
  background-color: ${BasicColor.WHITE};
  border-radius: 1em;
`;

const PopupBoardGuestView = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 1em;
`;

const PopupBoardGuestBox = styled.div`
  width: 100%;
  height: 16em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const PopupBoardGuestItem = styled.div<{ last: boolean }>`
  width: 40%;
  height: 12em;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  background-color: ${BasicColor.GRAY100};
  padding: 2.5em;
  border-radius: 1em;
  margin-right: ${({ last }) => !last && '1.2em'};
`;

const PopupBoardGuestEmoji = styled.div`
  width: 2em;
  position: absolute;
  top: 1em;
  right: 1em;

  svg {
    width: 100%;
  }
`;

const PopupBoardGuestInputView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GuestInputEmoji = styled.button`
  width: 4.5em;
  height: 4.5em;
  padding: 0.8em;
  margin-right: 0.5em;
  background-color: ${BasicColor.GRAY20};
  border-radius: 1em;
`;

const ContentTitleView = styled.div`
  width: 40em;
  height: auto;
  position: relative;
  top: 10em;
  left: 5em;
  background-color: ${BasicColor.WHITE};
  border: 0.2em solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  box-shadow: 0 2em 2.4em rgba(0, 0, 0, 0.08);
  border-radius: 0 3em 3em 3em;
  padding-top: 1.5em;
  z-index: 998;
`;

const EndButton = styled.button`
  position: absolute;
  right: 6em;
  bottom: 4em;
  padding: 1.5em 6em;
  border: 0.2em solid ${BasicColor.BLUE40};
  box-sizing: border-box;
  border-radius: 1.8em;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0.4em 0.7em rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1.4em);
  z-index: 998;
`;

const ActionStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3em;
  margin-top: -1em;
`;

const RecommendButton = styled.button<{ isRecommend: boolean }>`
  width: 9.4em;
  height: 9.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
  border-radius: 50%;
  background-color: ${({ isRecommend }) =>
    isRecommend ? BasicColor.BLUE100 : BasicColor.BLUE10};
  transition: 0.1s;
`;

const Emoji = styled.span`
  display: inline-flex;
  width: 6em;
  height: 6em;
  margin-top: 1em;
  margin-bottom: 2em;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default Play;
