import styled from '@emotion/styled';
import Router from 'next/router';
import { useState, useCallback, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

import Modal from '~/components/Modal';
import Typography from '~/components/Typography';
import ObjectBox from '~/components/ObjectBox';
import CreateInfoItem from '~/components/CreateInfoItem';
import TextInput from '~/components/TextInput';
import TagList from '~/components/TagList';
import { createRoom } from '~/remotes/room';
import { getCategoryEmoji } from '~/utils/emoji';
import ROOM from '~/constants/room';
import { BasicColor, getWallColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import {
  CreateRoomData,
  RoomAsset,
  RoomLight,
  RoomObject,
  RoomWallColor,
} from '~/types/Room';
import { upload, uploadRoomImage } from '~/remotes/common';
import { useRoomCategories, useMusicCategories } from '~/hooks/useCategories';
import { RoomCategory } from '~/types/RoomCategory';
import EMOJI from '~/constants/emoji';
import { MusicCategory } from '~/types/MusicCategory';
import { useMusics } from '~/hooks/useMusic';
import Playlist from '~/components/Playlist';
import { Music } from '~/types/Music';
import CategoryMenu from '~/components/CategoryMenu';
import BottomPopup from '~/components/BottomPopup';
import BACKGROUND from '~/constants/background';
import { LoaderBubbles } from '~/components/Loader';
import Toast from '~/components/Toast';
import Screen from '~/components/Screen';
import { WEATHER, Weather } from '~/constants/lottie';
import BackgroundFilter from '~/components/BackgroundFilter';
import OnBoarding from '~/components/OnBoarding';

import WallIcon from '../../public/assets/icons/icon-wall.svg';
import RoomIcon from '../../public/assets/icons/icon-room.svg';
import AddImageIcon from '../../public/assets/icons/icon-add-img.svg';
import TagIcon from '../../public/assets/icons/icon-tag.svg';
import CloseIcon from '../../public/assets/icons/icon-close.svg';
import CheckIcon from '../../public/assets/icons/icon-check.svg';
import RotateIcon from '../../public/assets/icons/icon-rotate.svg';
import BookIcon from '../../public/assets/icons/icon-book.svg';
import ImageXIcon from '../../public/assets/icons/icon-image-x.svg';

const Create = () => {
  const { data: roomCategories } = useRoomCategories();
  const { data: musicCategories } = useMusicCategories();

  const [visibleOnBoarding, setVisibleOnBoarding] = useState('waiting');
  const [visibleCategoryModal, setVisibleCategoryModal] = useState(true);
  const [visibleSubmitModal, setVisibleSubmitModal] = useState(false);
  const [contentType, setContentType] = useState<'info' | 'music'>('info');
  const [roomCategory, setRoomCategory] = useState<RoomCategory>();
  const [musicCategory, setMusicCategory] = useState<MusicCategory>();

  const [room, setRoom] = useState<CreateRoomData>({
    title: '',
    description: '',
    categoryId: 1,
    light: 'ONE',
    wallColor: 'RED',
    objectIds: {
      board: 1,
      clock: 1,
      light: 1,
      poster: 1,
      speaker: 1,
      table: 1,
      vase: 1,
      wall: 1,
    },
    background: 'SUNNY',
    assets: [BACKGROUND.ONE],
    tags: [],
    roomImage: '',
    musicIds: [],
    guestBooksEnabled: false,
  });
  const { data: musics } = useMusics(musicCategory?.id);

  const [isLoading, setIsLoading] = useState('');
  const [visibleToast, setVisibleToast] = useState('');

  const [visibleControl, setVisibleControl] = useState(false);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);
  const [uploadImage, setUploadImage] = useState<RoomAsset[]>([]);

  const playlistScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRoomCategory(roomCategories?.[0]);
  }, [roomCategories]);

  const handleChangeRoomTitleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 30) {
        setRoom((prev) => {
          return { ...prev, title: e.target.value };
        });
      }
    },
    [setRoom],
  );

  const handleChangeRoomDescriptionInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 50) {
        setRoom((prev) => {
          return { ...prev, description: e.target.value };
        });
      }
    },
    [setRoom],
  );

  const handleUpdateImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLoading === 'updateFile') {
        return;
      }

      const files = e.target.files;
      if (files == null || files.length === 0) {
        return;
      }

      const file = files[0];
      try {
        setIsLoading('updateFile');

        const { url } = await upload(file);
        const uploadImageData: RoomAsset[] = [
          {
            type: 'image',
            url,
            filename: file.name,
          },
        ];
        setUploadImage(uploadImageData);
        setRoom((prev) => {
          return {
            ...prev,
            assets: uploadImageData,
          };
        });
        setIsLoading('');
      } catch (e) {
        setVisibleToast('10MB 이하의 이미지만 업로드가 가능합니다.');
      }
    },
    [setRoom],
  );

  const handleUpdateImageUrl = (value: RoomAsset) => {
    setRoom((prev) => {
      return {
        ...prev,
        assets: [value],
      };
    });
  };

  const handleFileDeleteButton = () => {
    setUploadImage([]);
    setRoom((prev) => {
      return {
        ...prev,
        assets: [BACKGROUND.ONE],
      };
    });
  };

  const handleDeleteTag = (tag: string) => {
    setRoom((prev) => {
      return {
        ...prev,
        tags: prev.tags.filter((item) => item !== tag),
      };
    });
  };

  const handleToggleTagClick = (tag: string) => {
    if (
      room.tags.length < 5 &&
      room.tags.findIndex((item) => item === tag) === -1
    ) {
      setRoom((prev) => {
        return {
          ...prev,
          tags: [...prev.tags, tag],
        };
      });
    } else {
      handleDeleteTag(tag);
    }
  };

  useEffect(() => {
    setMusicCategory(musicCategories?.[0]);
  }, [musicCategories]);

  const handleAddMusicButtonClick = (music: Music) => {
    if (selectedMusics.findIndex((item) => item === music) === -1) {
      setSelectedMusics((prev) => [music, ...prev]);
    }
  };

  const handleDeleteMusicButtonClick = (music: Music) => {
    setSelectedMusics((prev) => prev.filter((item) => item !== music));
  };

  const handleObjectClick = (object: RoomObject) => {
    setRoom((prev) => {
      return {
        ...prev,
        objectIds: {
          ...prev.objectIds,
          [object]:
            prev.objectIds[object] === 3 ? 1 : prev.objectIds[object] + 1,
        },
      };
    });
  };

  const handleBackgroundClick = () => {
    if (visibleOnBoarding === 'visible') {
      handleCloseOnBoarding();
      return;
    }

    const backgroundList: Weather[] = Object.keys(WEATHER) as Weather[];

    setRoom((prev) => {
      const index = backgroundList.indexOf(prev.background);
      return {
        ...prev,
        background:
          index === backgroundList.length - 1
            ? backgroundList[0]
            : backgroundList[index + 1],
      };
    });
  };

  const getUploadRoomImage = async () => {
    const onCapture = async () => {
      return await html2canvas(
        document.getElementById('capture-view') as HTMLElement,
      ).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/png');
        const blobBin = window.atob(contentDataURL.split(',')[1]);
        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/png' });
      });
    };

    try {
      const file: Blob = await onCapture();
      const { url } = await uploadRoomImage(file);
      setRoom((prev) => {
        return {
          ...prev,
          roomImage: url,
        };
      });
    } catch (e) {
      setVisibleToast('방 이미지를 등록하지 못했습니다. 다시 시도해주세요.');
    }
  };

  const handleGuestBookToggle = () => {
    setRoom((prev) => {
      return {
        ...prev,
        guestBooksEnabled: !prev.guestBooksEnabled,
      };
    });
  };

  const updateIds = () => {
    const ids = selectedMusics.map((music) => music.id);
    setRoom((prev) => {
      return {
        ...prev,
        musicIds: ids,
        categoryId: roomCategory?.id as number,
      };
    });
  };

  const handleCreateButtonClick = async () => {
    if (isLoading === 'createButtonClick') {
      return;
    }

    if (room.title === '' || !room.assets.length) {
      if (room.title === '') {
        setVisibleToast('방 설명을 작성해주세요.');
      } else if (!room.assets.length) {
        setVisibleToast('창 밖 풍경을 등록해주세요.');
      }
      return;
    }
    setIsLoading('createButtonClick');
    updateIds();
    await getUploadRoomImage();
    setIsLoading('');
    setVisibleSubmitModal(true);
  };

  const postCreateRoom = async () => {
    if (isLoading === 'createRoom') {
      return;
    }

    try {
      setIsLoading('createRoom');
      await createRoom(room);
      Router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('onboarding')) {
      setVisibleOnBoarding('confirmed');
    }
  }, []);

  const handleCloseOnBoarding = useCallback(() => {
    setVisibleOnBoarding('confirmed');
    localStorage.setItem('onboarding', 'confirmed');
  }, []);

  return (
    <>
      <CreateStyled>
        <ContentView>
          <ContentMenu>
            <ContentMenuItem
              onClick={() => setContentType('info')}
              active={contentType === 'info'}
            >
              <Typography
                font={FontType.BOLD_BODY}
                color={
                  contentType === 'info' ? BasicColor.WHITE : BasicColor.DARK100
                }
              >
                방 정보
              </Typography>
            </ContentMenuItem>
            <ContentMenuItem
              onClick={() => setContentType('music')}
              active={contentType === 'music'}
            >
              <Typography
                font={FontType.BOLD_BODY}
                color={
                  contentType === 'music'
                    ? BasicColor.WHITE
                    : BasicColor.DARK100
                }
              >
                음악
              </Typography>
            </ContentMenuItem>
          </ContentMenu>
          {contentType === 'info' && (
            <ContentBox type={contentType} className="scrollbar">
              <CreateInfoItem
                title="방 설명"
                titleIcon={<RoomIcon width="2.4em" height="2.4em" />}
                content={
                  <>
                    <Typography
                      font={FontType.REGULAR_CAPTION}
                      color={BasicColor.DARK70}
                      marginBottom={1}
                    >
                      • 방 카테고리 / 이름
                    </Typography>
                    <RoomTitleStyled>
                      <RoomTitle>
                        <Typography
                          font={FontType.SEMI_BOLD_CAPTION}
                          color={BasicColor.BLUE100}
                        >
                          {roomCategory?.name}
                        </Typography>
                      </RoomTitle>
                      <TextInput
                        maxLength={30}
                        value={room.title}
                        onChangeInput={handleChangeRoomTitleInput}
                        placeholder="방 이름을 작성해주세요."
                      />
                    </RoomTitleStyled>
                    <Typography
                      font={FontType.REGULAR_CAPTION}
                      color={BasicColor.DARK70}
                      marginTop={2}
                      marginBottom={1}
                    >
                      • 한 줄 소개
                    </Typography>
                    <TextInput
                      maxLength={50}
                      value={room.description}
                      onChangeInput={handleChangeRoomDescriptionInput}
                      placeholder="간단한 인사말을 작성해주세요."
                    />
                  </>
                }
                required
              />
              <CreateInfoItem
                title="창 밖 풍경"
                titleIcon={
                  <AddImageIcon
                    width="2.4em"
                    height="2.4em"
                    fill={BasicColor.BLUE100}
                    stroke={BasicColor.BLUE100}
                  />
                }
                content={
                  <CreateInfoImageStyled>
                    <FileUploadImageStyled>
                      <FileUploadImageItem
                        selected={uploadImage[0]?.url === room.assets[0]?.url}
                        empty={!uploadImage.length}
                      >
                        {uploadImage[0] ? (
                          <>
                            <FileUploadImage
                              onClick={() =>
                                handleUpdateImageUrl(uploadImage[0])
                              }
                            >
                              <Screen type="thumbnail" assets={uploadImage} />
                            </FileUploadImage>
                            <FileDeleteButton onClick={handleFileDeleteButton}>
                              <CloseIcon
                                width="2.5em"
                                height="2.5em"
                                stroke={BasicColor.WHITE}
                              />
                            </FileDeleteButton>
                          </>
                        ) : (
                          <NoneImageStyled>
                            <ImageXIcon />
                            <Typography
                              font={FontType.LIGHT_CAPTION_X}
                              color={BasicColor.DARK40}
                              marginTop={0.3}
                            >
                              등록한 풍경
                            </Typography>
                          </NoneImageStyled>
                        )}
                      </FileUploadImageItem>
                      {Object.values(BACKGROUND).map((img, index) => (
                        <FileUploadImageItem
                          key={index}
                          selected={img.url === room.assets[0]?.url}
                        >
                          <FileUploadImage
                            onClick={() => handleUpdateImageUrl(img)}
                          >
                            <Screen type="thumbnail" assets={[img]} />
                          </FileUploadImage>
                        </FileUploadImageItem>
                      ))}
                    </FileUploadImageStyled>
                    <FileUploadButtonLabel active={uploadImage.length <= 0}>
                      {isLoading === 'updateFile' ? (
                        <LoaderBubbles mode="dark" />
                      ) : (
                        <>
                          <AddImageIcon
                            width={18}
                            height={18}
                            fill={BasicColor.WHITE}
                            stroke={BasicColor.WHITE}
                          />
                          <Typography
                            font={FontType.SEMI_BOLD_CAPTION}
                            color={BasicColor.WHITE}
                            marginLeft={0.5}
                          >
                            풍경 직접 등록하기
                          </Typography>
                        </>
                      )}
                      {uploadImage.length <= 0 && (
                        <FileUploadButton
                          type="file"
                          accept="image/png,image/jpg,image/jpeg"
                          onChange={handleUpdateImage}
                        />
                      )}
                    </FileUploadButtonLabel>
                    <Typography
                      font={FontType.REGULAR_CAPTION}
                      color={BasicColor.DARK40}
                      align={Align.RIGHT}
                      marginTop={1}
                    >
                      <Typography
                        tag="span"
                        font={FontType.REGULAR_CAPTION}
                        color={BasicColor.DARK70}
                      >
                        .JPG, .PNG, .mp4
                      </Typography>{' '}
                      파일 /{' '}
                      <Typography
                        tag="span"
                        font={FontType.REGULAR_CAPTION}
                        color={BasicColor.DARK70}
                      >
                        10MB
                      </Typography>{' '}
                      이하
                    </Typography>
                  </CreateInfoImageStyled>
                }
                isDrop
                required
              />
              <CreateInfoItem
                title="방명록"
                titleIcon={<BookIcon width="2.4em" height="2.4em" />}
                isToggle
                activeToggle={room.guestBooksEnabled}
                setIsToggle={handleGuestBookToggle}
              />
              <CreateInfoItem
                title="방 태그"
                titleIcon={<TagIcon width="2.4em" height="2.4em" />}
                content={
                  <CreateInfoTagStyled>
                    <SelectedTagListStyled>
                      <SelectedTagList>
                        {room.tags.length ? (
                          room.tags.map((tag, index) => (
                            <SelectedTagItem key={index}>
                              <Typography
                                font={FontType.SEMI_BOLD_BODY}
                                color={BasicColor.GREEN150}
                              >
                                {tag}
                              </Typography>
                              <TagDeleteButton
                                onClick={() => handleDeleteTag(tag)}
                              >
                                <CloseIcon
                                  width="2.2em"
                                  height="2.2em"
                                  stroke={BasicColor.GREEN150}
                                />
                              </TagDeleteButton>
                            </SelectedTagItem>
                          ))
                        ) : (
                          <NoneTagItem>
                            <EmojiExclamationMarkStyled>
                              {EMOJI.EXCLAMATION_MARK}
                            </EmojiExclamationMarkStyled>
                            <Typography
                              tag="span"
                              marginTop={0.5}
                              marginBottom={0.5}
                            >
                              어울리는{' '}
                              <Typography
                                tag="span"
                                font={FontType.SEMI_BOLD_BODY}
                              >
                                태그
                              </Typography>
                              를 선택해보세요.
                            </Typography>
                          </NoneTagItem>
                        )}
                      </SelectedTagList>
                      <Typography
                        font={FontType.REGULAR_CAPTION}
                        color={BasicColor.DARK40}
                        align={Align.RIGHT}
                      >
                        최대 5개 선택 가능
                      </Typography>
                    </SelectedTagListStyled>
                    <TagList
                      title="감정"
                      tags={[
                        '기쁜',
                        '슬픈',
                        '우울',
                        '신나는',
                        '잔잔한',
                        '설레는',
                        '위로',
                        '힐링',
                        '기분좋은',
                      ]}
                      selectedTags={room.tags}
                      onToggleTagClick={handleToggleTagClick}
                    />
                    <TagList
                      title="상황"
                      tags={[
                        '휴식',
                        '숙면',
                        '나홀로',
                        '파티',
                        '공부',
                        '작업',
                        '스트레스',
                        '독서',
                        '운동',
                      ]}
                      selectedTags={room.tags}
                      onToggleTagClick={handleToggleTagClick}
                    />
                    <TagList
                      title="분위기"
                      tags={[
                        '비오는',
                        '흐린',
                        '안개 낀',
                        '따뜻한',
                        '맑은',
                        '포근한',
                        '쌀쌀한',
                        '깜깜한',
                      ]}
                      selectedTags={room.tags}
                      onToggleTagClick={handleToggleTagClick}
                    />
                  </CreateInfoTagStyled>
                }
                isDrop
              />
            </ContentBox>
          )}
          {contentType === 'music' && (
            <ContentBox type={contentType}>
              <CategoryMenu
                scrollRef={playlistScrollRef}
                categories={musicCategories as MusicCategory[]}
                category={musicCategory as MusicCategory}
                setCategory={(value) => setMusicCategory(value)}
              />
              <MusicListStyled>
                {!!!musics ? (
                  <LoaderBubbles />
                ) : (
                  <Playlist
                    scrollRef={playlistScrollRef}
                    playlist={musics as Music[]}
                    controls={false}
                    viewHeight={56}
                    selectedMusics={selectedMusics}
                    onAddButtonClick={handleAddMusicButtonClick}
                    onDeleteButtonClick={handleDeleteMusicButtonClick}
                  />
                )}
              </MusicListStyled>
              <BottomPopup
                title="플레이리스트"
                selectedList={selectedMusics}
                onDeleteButtonClick={handleDeleteMusicButtonClick}
              />
            </ContentBox>
          )}
        </ContentView>
        <ObjectViewStyled>
          <ObjectView id="capture-view">
            <BackgroundFilter wallColor={room.wallColor} light={room.light} />
            <ObjectBackgroundWall src={ROOM.WALL[1]} />
            <ObjectBackgroundView data-html2canvas-ignore="true">
              <LottieStyled>{WEATHER[room.background]}</LottieStyled>
              <Screen type="thumbnail" assets={room.assets} />
            </ObjectBackgroundView>
            <ObjectCurtain
              src={ROOM.CURTAIN[1]}
              data-html2canvas-ignore="true"
            />
            <LayerBox>
              <ObjectBox
                room={room}
                objects={room.objectIds}
                onObjectClick={handleObjectClick}
              />
            </LayerBox>
          </ObjectView>
        </ObjectViewStyled>
        {!visibleCategoryModal && (
          <>
            <RotateIconStyled onClick={handleBackgroundClick}>
              <RotateIcon width="2.8em" height="2.4em" />
            </RotateIconStyled>
            <RoomControlStyled>
              {visibleControl && (
                <RoomControlItem>
                  {['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'].map(
                    (color, index) => (
                      <RoomControlItemBox key={index}>
                        {[
                          { wallColor: color, light: 'ONE' },
                          { wallColor: color, light: 'TWO' },
                          { wallColor: color, light: 'THREE' },
                        ].map((value, index) => (
                          <RoomControlItemColor
                            key={index}
                            onClick={() =>
                              setRoom((prev) => {
                                return {
                                  ...prev,
                                  wallColor: value.wallColor as RoomWallColor,
                                  light: value.light as RoomLight,
                                };
                              })
                            }
                            color={getWallColor(value.wallColor, value.light)}
                          >
                            {room.wallColor === value.wallColor &&
                              room.light === value.light && (
                                <CheckIcon
                                  width="1.5em"
                                  height="1.3em"
                                  stroke={BasicColor.WHITE}
                                />
                              )}
                          </RoomControlItemColor>
                        ))}
                      </RoomControlItemBox>
                    ),
                  )}
                </RoomControlItem>
              )}
              <RoomControlButton
                onClick={() => {
                  if (visibleOnBoarding === 'visible') {
                    handleCloseOnBoarding();
                    return;
                  }

                  setVisibleControl((prev) => !prev);
                }}
              >
                <WallIcon width="3.5em" height="3.5em" />
              </RoomControlButton>
            </RoomControlStyled>
            <CreateButton onClick={handleCreateButtonClick}>
              {isLoading === 'createButtonClick' ? (
                <LoaderBubbles mode="dark" />
              ) : (
                <Typography font={FontType.BOLD_BODY} color={BasicColor.WHITE}>
                  등록 완료
                </Typography>
              )}
            </CreateButton>
          </>
        )}
        {visibleOnBoarding === 'visible' && (
          <OnBoarding onClose={handleCloseOnBoarding} />
        )}
      </CreateStyled>
      {visibleToast && (
        <Toast message={visibleToast} setVisibleToast={setVisibleToast} />
      )}
      {visibleCategoryModal && (
        <Modal
          title="카테고리 선택"
          subTitle={<>방에서 어떤 일을 하고 싶으세요?</>}
          content="자유롭게 선택해주세요!"
          action={
            <CategoryStyled>
              {!!!roomCategories ? (
                <LoaderBubbles />
              ) : (
                roomCategories?.map((value: RoomCategory, index: number) => (
                  <CategoryItem
                    key={index}
                    onClick={() => setRoomCategory(value)}
                  >
                    <CategoryItemIcon active={roomCategory === value}>
                      {getCategoryEmoji(value.name)}
                    </CategoryItemIcon>
                    <Typography
                      font={FontType.SEMI_BOLD_BODY}
                      color={
                        roomCategory === value
                          ? BasicColor.BLUE100
                          : BasicColor.DARK100
                      }
                      align={Align.CENTER}
                    >
                      {value.name}
                    </Typography>
                  </CategoryItem>
                ))
              )}
            </CategoryStyled>
          }
          nextButtonActive
          nextButtonText="완료"
          onNextButtonClick={() => {
            setVisibleCategoryModal(false);
            visibleOnBoarding === 'waiting' && setVisibleOnBoarding('visible');
          }}
        />
      )}
      {visibleSubmitModal && (
        <Modal
          title="방 만들기 완료!"
          subTitle={<>아래 버튼을 누르면 방이 등록됩니다.</>}
          content="방을 등록하시겠어요?"
          prevButtonText="잠깐만요"
          onPrevButtonClick={() => setVisibleSubmitModal(false)}
          nextButtonText="등록할래요!"
          onNextButtonClick={postCreateRoom}
          isLoading={isLoading === 'createRoom'}
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
  width: 40em;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${BasicColor.WHITE};
  padding-top: 10em;
  z-index: 1;
`;

const ContentMenu = styled.div`
  width: calc(100% - 8em);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0.1em solid ${BasicColor.DARK40};
  background-color: ${BasicColor.GRAY20};
  margin: 0 4em;
  border-radius: 3em;
`;

const ContentMenuItem = styled.button<{ active: boolean }>`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE100 : 'transparent'};
  border-radius: 3em;
  padding: 1.2em 0;
`;

const ContentBox = styled.div<{ type: string }>`
  width: 100%;
  height: calc(100% - 10em);
  overflow-x: hidden;
  overflow-y: ${({ type }) => (type === 'music' ? 'hidden' : 'scroll')};
`;

const RoomTitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RoomTitle = styled.div`
  width: 5em;
  height: 4.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${BasicColor.GRAY70};
  border-radius: 0.7em;
  padding: 0.8em;
  margin-right: 1em;
`;

const ObjectViewStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
`;

const ObjectView = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
`;

const ObjectBackgroundWall = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s ease-in-out;
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

const CreateInfoImageStyled = styled.div``;

const FileUploadButtonLabel = styled.label<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em 0;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE100 : BasicColor.DARK40};
  border-radius: 1.2em;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  transition: 0.1s;

  :hover {
    background-color: ${({ active }) => active && BasicColor.BLUE97};
    transition: 0.1s;
  }
`;

const FileUploadButton = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 0.1em;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 0.1em;
`;

const FileUploadImageStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.5em;
  margin-bottom: 1.5em;
`;

const FileUploadImageItem = styled.div<{ selected: boolean; empty?: boolean }>`
  width: 6.4em;
  height: 6.4em;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0.7em;
  background-color: ${({ empty }) => empty && BasicColor.GRAY20};
  border: ${({ empty }) => empty && `2px dashed ${BasicColor.GRAY60}`};
  border: ${({ selected }) => selected && `2px solid ${BasicColor.BLUE100}`};
  border-radius: 0.8em;
  z-index: 0;
`;

const FileUploadImage = styled.button`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  border-radius: 0.8em;
  z-index: -1;
`;

const FileDeleteButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -0.5em;
  bottom: -0.5em;
  background-color: ${BasicColor.RED};
  border-radius: 50%;
  border: 1px solid ${BasicColor.WHITE};
  padding: 0.1em;
`;

const NoneImageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmojiExclamationMarkStyled = styled.div`
  width: 3.2em;
  height: 3.2em;
  margin-bottom: 0.5em;

  svg {
    width: 100%;
    height: 100%;
    fill: ${BasicColor.BLUE80};
  }
`;

const CreateInfoTagStyled = styled.div`
  width: 100%;
  height: 100%;
`;

const SelectedTagListStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

const SelectedTagList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1em 0;
`;

const SelectedTagItem = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  padding: 0.4em 1em;
  background-color: ${BasicColor.GREEN10};
  border: 0.1em solid ${BasicColor.GREEN20};
  border-radius: 2.4em;
  margin-right: 0.8em;
  margin-bottom: 0.8em;
`;

const TagDeleteButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.5;
  margin-left: 0.5em;
`;

const NoneTagItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 3.2em;
    height: 3.2em;
    fill: ${BasicColor.BLUE80};
    margin-bottom: 0.5em;
  }
`;

const MusicListStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 4em;
  margin-top: 1em;
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

const RotateIconStyled = styled.button`
  width: 4.6em;
  height: 4.6em;
  position: absolute;
  top: 10%;
  right: 36vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0.4em 0.4em rgba(0, 0, 0, 0.25);
  border: 0.2em solid ${BasicColor.WHITE};
  border-radius: 1.8em;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(1.4em);
  padding: 0.8em;
  z-index: 98;
`;

const RoomControlStyled = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 12em;
  right: 5em;
  z-index: 98;
`;

const RoomControlItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 0.4em 0.4em rgba(0, 0, 0, 0.25);
  border: 0.2em solid ${BasicColor.WHITE};
  border-radius: 1.8em 0 1.8em 1.8em;
  padding: 2em;
  margin-right: 1em;
`;

const RoomControlButton = styled.button`
  width: 6em;
  height: 6em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 0.2em solid ${BasicColor.WHITE};
  border-radius: 1.8em;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(1.4em);
  box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.25);
`;

const RoomControlItemBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const RoomControlItemColor = styled.button<{ color: string }>`
  width: 3em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin: 0.5em;
`;

const CreateButton = styled.button`
  width: 18em;
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5em;
  bottom: 4em;
  border: 0.2em solid ${BasicColor.WHITE};
  box-sizing: border-box;
  border-radius: 1.8em;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0.4em 0.7em rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1.4em);
  z-index: 96;
`;

const CategoryStyled = styled.div`
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 4em;
`;

const CategoryItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1.5em;
`;

const CategoryItemIcon = styled.div<{ active: boolean }>`
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE80 : BasicColor.WHITE};
  box-sizing: border-box;
  box-shadow: ${({ active }) => !active && '0px 4px 4px rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${BasicColor.BLUE100};
  border-radius: 1.8em;
  margin-bottom: 1em;
  transition: 0.1s;
`;

export default Create;
