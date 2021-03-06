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
import { WEATHER } from '~/constants/lottie';

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
  const [time, setTime] = useState(10);
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
      return '???????????? ????????? ???????????? ???????????????????';
    } else if (page === 1) {
      return '??????????????? ?????? ????????? ??? ???????????????!';
    } else if (page === 2) {
      return '?????? ????????? ???????????? ????????? ???????????? ????????? ????';
    }
  };

  const getCategoryPlaceholder = (
    category: RoomCategory,
    type: 'big' | 'small',
  ) => {
    if (category.name === '??????') {
      return type === 'big' ? '?????? ????????????' : '????????? 5??? ??????, ????????????';
    } else if (category.name === '??????') {
      return type === 'big' ? '????????????' : 'UI ??????, api ??????';
    } else if (category.name === '??????') {
      return type === 'big' ? '????????????' : '?????? ?????????, 10??? ????????????';
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
      if (e.target.value.length <= 50) {
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
      alert('?????? ??????????????????.');
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
      setVisibleToast('????????? ????????? ???????????? ???????????????. ?????? ??????????????????.');
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
        setVisibleToast('??? ????????? ???????????? ???????????????. ?????? ??????????????????.');
      }
      setReviewInput('');
      setIsRecommend(false);
      setVisibleModal(undefined);
      Router.push(`/detail?roomId=${room.id}`);
    }
  };

  const handleChangeReviewInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 30) {
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
                <StatusBarActive status={(currentPage + 1) * (430 / 3)} />
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
                      viewHeight={32}
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
                        <Typography
                          font={FontType.BOLD_TITLE_02}
                          marginBottom={1}
                        >
                          ?????????
                        </Typography>
                        <PopupBoardGuestBox className="scrollbar">
                          {guestBooks?.[0].items.length ? (
                            guestBooks?.map((x) =>
                              x.items.flatMap((value, index) => (
                                <PopupBoardGuestItem
                                  key={index}
                                  last={(index + 1) % 3 === 0}
                                >
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
                              ??? ???????????? ??????????????????!
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
                          placeholder="????????? ??? ????????? ???????????????!"
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
                ?????? ??????
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
          title="???????????? ??????!"
          subTitle={
            <>
              ????????? ????????????{' '}
              <Typography
                tag="span"
                font={FontType.SEMI_BOLD_BODY}
                color={BasicColor.BLUE100}
              >
                {time}???
              </Typography>
              ??? ????????????!
            </>
          }
          emoji={
            <Emoji>
              <ClockIcon />
            </Emoji>
          }
          content="?????? ??? ???????????? ????????? ????????? ??????????????? ???????????????."
          nextButtonText="??????"
          onNextButtonClick={handleTimeoutButtonClick}
        />
      )}
      {visibleModal === 'finished' && (
        <Modal
          setShow={(type) =>
            setVisibleModal(type as 'timeout' | 'finished' | undefined)
          }
          title="?????? ????????????"
          subTitle={
            <>
              ??? ????????? ?????????{' '}
              <Typography
                tag="span"
                font={FontType.SEMI_BOLD_BODY}
                color={BasicColor.BLUE100}
              >
                ??????
              </Typography>
              ?????????????
            </>
          }
          content="?????? ????????? ??? ??? ?????? ??????????????????!"
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
                maxLength={30}
                value={reviewInput}
                onChangeInput={handleChangeReviewInput}
                placeholder="??? ??? ?????? ??????????????????."
              />
            </ActionStyled>
          }
          resetAction={() => {
            setIsRecommend(false);
            setReviewInput('');
          }}
          nextButtonActive={reviewInput !== ''}
          nextButtonText={reviewInput !== '' ? '??????' : '?????????'}
          onNextButtonClick={handleFinishedButtonClick}
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
  padding: 2.5em;
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
  width: 42vw;
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
  width: 26em;
  position: absolute;
  left: 9%;
  bottom: 34%;
  z-index: 1;
`;

const PopupSpeaker = styled.div<{ visible: boolean }>`
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: -39em;
  left: -11em;
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
  top: -13em;
  right: 47em;
  padding: 2em;
  padding-bottom: 3em;
  background-color: ${BasicColor.WHITE};
  border-radius: 2em;
`;

const PopupBoardGuestView = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 1.5em;
`;

const PopupBoardGuestBox = styled.div`
  width: 100%;
  height: 30em;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const PopupBoardGuestItem = styled.div<{ last: boolean }>`
  width: 31.5%;
  height: 20em;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: ${BasicColor.GRAY100};
  border-radius: 1.5em;
  padding: 1.5em;
  margin-right: ${({ last }) => !last && '1em'};
  margin-bottom: 1em;
`;

const PopupBoardGuestEmoji = styled.div`
  width: 2.5em;

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
  width: 4em;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em;
  margin-right: 1em;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  border: 1px solid ${BasicColor.GRAY100};
  border-radius: 50%;
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
  border: 0.2em solid ${BasicColor.WHITE};
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
