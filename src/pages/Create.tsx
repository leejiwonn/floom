import styled from '@emotion/styled';
import Router from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';

import Modal from '~/components/Modal';
import Typography from '~/components/Typography';
import ObjectBox from '~/components/ObjectBox';
import CreateInfoItem from '~/components/CreateInfoItem';
import TextInput from '~/components/TextInput';
import TagList from '~/components/TagList';
import { getCategoryEmoji } from '~/utils/category';
import ROOM from '~/constants/room';
import { BasicColor, getWallColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import {
  CreateRoomData,
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
import BACKGROUND, { Background } from '~/constants/background';

import WallIcon from '../../public/assets/icons/icon-wall.svg';
import RoomIcon from '../../public/assets/icons/icon-room.svg';
import AddImageIcon from '../../public/assets/icons/icon-add-img.svg';
import TagIcon from '../../public/assets/icons/icon-tag.svg';
import CloseIcon from '../../public/assets/icons/icon-close.svg';
import CheckIcon from '../../public/assets/icons/icon-check.svg';
import RotateIcon from '../../public/assets/icons/icon-rotate.svg';
import api from '~/utils/api';

type CreateRoomForm = Omit<CreateRoomData, 'categoryId'> & {
  categoryId?: number;
};

const Create = () => {
  const { data: roomCategories } = useRoomCategories();
  const { data: musicCategories } = useMusicCategories();

  const [visibleCategoryModal, setVisibleCategoryModal] = useState(true);
  const [visibleSubmitModal, setVisibleSubmitModal] = useState(false);
  const [contentType, setContentType] = useState<'info' | 'music'>('info');
  const [roomCategory, setRoomCategory] = useState<RoomCategory>();
  const [musicCategory, setMusicCategory] = useState<MusicCategory>();

  const [room, setRoom] = useState<CreateRoomForm>({
    title: '',
    categoryId: roomCategory?.id,
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
    assets: [],
    tags: [],
    roomImage: '',
    musicIds: [],
  });
  const { data: musics } = useMusics(musicCategory?.id);

  const [visibleControl, setVisibleControl] = useState(false);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);

  useEffect(() => {
    setRoomCategory(roomCategories?.[0]);
  }, [roomCategories]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 20) {
        setRoom((prev) => {
          return { ...prev, title: e.target.value };
        });
      }
    },
    [setRoom],
  );

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (room.assets.length > 2) {
      return;
    }

    const files = e.target.files;
    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];
    try {
      const { url } = await upload(file);
      setRoom((prev) => {
        return {
          ...prev,
          assets: [
            ...prev.assets,
            {
              type:
                file.type === 'video/mp4' || file.type === 'video/webm'
                  ? 'video'
                  : 'image',
              url,
              filename: file.name,
            },
          ],
        };
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleFileDeleteButton = (value: string) => {
    setRoom((prev) => {
      return {
        ...prev,
        assets: prev.assets.filter((x) => x.url !== value),
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
    const backgroundList: Background[] = [
      'RAIN',
      'SNOW',
      'SUNNY',
      'BLUR',
      'NIGHT',
    ];

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

    const file: Blob = await onCapture();
    try {
      const { url } = await uploadRoomImage(file);
      setRoom((prev) => {
        return {
          ...prev,
          roomImage: url,
        };
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const getMusicIds = () => {
    const ids = selectedMusics.map((music) => music.id);
    setRoom((prev) => {
      return {
        ...prev,
        musicIds: ids,
      };
    });
  };

  const handleCreateButtonClick = async () => {
    if (room.title === '' || !room.assets.length || !selectedMusics.length) {
      alert('빈 값이 있습니다.');
      return;
    }
    getMusicIds();
    await getUploadRoomImage();
    setVisibleSubmitModal(true);
  };

  const postCreateRoom = async () => {
    try {
      await api.post('/api/rooms', {
        title: room.title,
        categoryId: room.categoryId,
        light: room.light,
        wallColor: room.wallColor,
        objectIds: room.objectIds,
        background: room.background,
        assets: room.assets,
        tags: room.tags,
        roomImage: room.roomImage,
        musicIds: room.musicIds,
      });
      Router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

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
            <ContentBox>
              <CreateInfoItem
                title="방 이름"
                titleIcon={<RoomIcon />}
                content={
                  <TextInput
                    maxLength={20}
                    value={room.title}
                    onChangeInput={handleChangeInput}
                  />
                }
                required
              />
              <CreateInfoItem
                title="배경화면"
                titleIcon={
                  <AddImageIcon
                    width={24}
                    height={24}
                    fill={BasicColor.BLUE100}
                    stroke={BasicColor.BLUE100}
                  />
                }
                content={
                  <CreateInfoImageStyled>
                    <FileUploadImageStyled>
                      {room.assets.length ? (
                        room.assets.map((value, index) => (
                          <FileUploadImageItem key={index}>
                            <FileUploadData>
                              <FileUploadImage backgroundImage={value.url} />
                              <Typography
                                font={FontType.SEMI_BOLD_BODY}
                                marginLeft={10}
                              >
                                {value.filename ?? value.url.split('/')[3]}
                              </Typography>
                            </FileUploadData>
                            <FileDeleteButton
                              onClick={() => handleFileDeleteButton(value.url)}
                            >
                              <CloseIcon stroke={BasicColor.DARK40} />
                            </FileDeleteButton>
                          </FileUploadImageItem>
                        ))
                      ) : (
                        <>
                          <EmojiExclamationMarkStyled>
                            {EMOJI.EXCLAMATION_MARK}
                          </EmojiExclamationMarkStyled>
                          <Typography
                            font={FontType.REGULAR_BODY}
                            marginBottom={2}
                          >
                            앗! 아직 등록된{' '}
                            <Typography
                              tag="span"
                              font={FontType.SEMI_BOLD_BODY}
                            >
                              배경화면
                            </Typography>
                            이 없어요.
                          </Typography>
                          <Typography
                            font={FontType.REGULAR_CAPTION}
                            color={BasicColor.DARK40}
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
                        </>
                      )}
                    </FileUploadImageStyled>
                    <FileUploadButtonLabel active={room.assets.length < 3}>
                      <AddImageIcon
                        width={18}
                        height={18}
                        fill={BasicColor.WHITE}
                        stroke={BasicColor.WHITE}
                      />
                      <Typography
                        font={FontType.SEMI_BOLD_CAPTION}
                        color={BasicColor.WHITE}
                        marginLeft={5}
                      >
                        배경화면 등록하기
                      </Typography>
                      {room.assets.length < 3 && (
                        <FileUploadButton
                          type="file"
                          accept="image/png,image/jpg,image/jpeg,video/mp4,video/webm"
                          onChange={handleUpdateImage}
                        />
                      )}
                    </FileUploadButtonLabel>
                  </CreateInfoImageStyled>
                }
                isDrop
                required
              />
              <CreateInfoItem
                title="방 태그"
                titleIcon={<TagIcon />}
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
                                <CloseIcon stroke={BasicColor.GREEN150} />
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
                              marginTop={5}
                              marginBottom={5}
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
            <ContentBox>
              <CategoryMenu
                categories={musicCategories as MusicCategory[]}
                category={musicCategory as MusicCategory}
                setCategory={(value) => setMusicCategory(value)}
              />
              <MusicListStyled>
                <Playlist
                  playlist={musics as Music[]}
                  controls={false}
                  viewHeight={56}
                  selectedMusics={selectedMusics}
                  onAddButtonClick={handleAddMusicButtonClick}
                />
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
            <ObjectBackground
              src={ROOM[room.wallColor][room.light].WALL[room.objectIds.wall]}
            />
            <ObjectBackgroundView
              src={BACKGROUND[room.background]}
              alt="풍경"
            />
            <LayerBox>
              <ObjectBox
                room={room}
                objects={room.objectIds}
                onObjectClick={handleObjectClick}
              />
            </LayerBox>
          </ObjectView>
          <RotateIconStyled onClick={handleBackgroundClick}>
            <RotateIcon />
          </RotateIconStyled>
          {!visibleCategoryModal && (
            <>
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
                                  <CheckIcon stroke={BasicColor.WHITE} />
                                )}
                            </RoomControlItemColor>
                          ))}
                        </RoomControlItemBox>
                      ),
                    )}
                  </RoomControlItem>
                )}
                <RoomControlButton
                  onClick={() => setVisibleControl((prev) => !prev)}
                >
                  <WallIcon />
                </RoomControlButton>
              </RoomControlStyled>
              <CreateButton onClick={handleCreateButtonClick}>
                <Typography font={FontType.BOLD_BODY} color={BasicColor.WHITE}>
                  등록 완료
                </Typography>
              </CreateButton>
            </>
          )}
        </ObjectViewStyled>
      </CreateStyled>
      {visibleCategoryModal && (
        <Modal
          title="카테고리 선택"
          subTitle={<>방에서 어떤 일을 하고 싶으세요?</>}
          content="자유롭게 선택해주세요!"
          action={
            <CategoryStyled>
              {roomCategories?.map((value: RoomCategory, index: number) => (
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
              ))}
            </CategoryStyled>
          }
          buttonActive
          buttonText="완료"
          onButtonClick={() => setVisibleCategoryModal(false)}
        />
      )}
      {visibleSubmitModal && (
        <Modal
          title="방 만들기 완료!"
          subTitle={<>아래 버튼을 누르면 방이 등록됩니다.</>}
          content="방을 등록하시겠어요?"
          buttonText="등록하기"
          onButtonClick={postCreateRoom}
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
  padding: 0 40px;
  padding-top: 100px;
  z-index: 1;
`;

const ContentMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${BasicColor.DARK40};
  background-color: ${BasicColor.GRAY20};
  border-radius: 30px;
`;

const ContentMenuItem = styled.button<{ active: boolean }>`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE100 : 'transparent'};
  border-radius: 30px;
  padding: 12px 0;
`;

const ContentBox = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
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
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ObjectBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s ease-in-out;
  z-index: -1;
`;

const ObjectBackgroundView = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s ease-in-out;
  z-index: -2;
`;

const CreateInfoImageStyled = styled.div``;

const FileUploadButtonLabel = styled.label<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE100 : BasicColor.DARK40};
  border-radius: 12px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  transition: 0.1s;
`;

const FileUploadButton = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const FileUploadImageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid ${BasicColor.GRAY60};
  border-radius: 8px;
  padding: 18px;
  margin: 15px 0;
`;

const FileUploadImageItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const FileUploadData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const FileUploadImage = styled.div<{ backgroundImage: string }>`
  width: 36px;
  height: 36px;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 8px;
`;

const FileDeleteButton = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmojiExclamationMarkStyled = styled.div`
  width: 32px;
  height: 32px;
  margin-bottom: 5px;

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
  margin-bottom: 10px;
`;

const SelectedTagList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px 0;
`;

const SelectedTagItem = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  padding: 4px 10px;
  background-color: ${BasicColor.GREEN10};
  border: 1px solid ${BasicColor.GREEN20};
  border-radius: 24px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const TagDeleteButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.5;
  margin-left: 5px;
`;

const NoneTagItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    fill: ${BasicColor.BLUE80};
    margin-bottom: 5px;
  }
`;

const MusicListStyled = styled.div`
  display: flex;
  margin-top: 10px;
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
  width: 46px;
  height: 46px;
  position: absolute;
  top: 10%;
  right: 34vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid ${BasicColor.BLUE40};
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
`;

const RoomControlStyled = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 120px;
  right: 50px;
  z-index: 3;
`;

const RoomControlItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid ${BasicColor.BLUE40};
  border-radius: 18px 0px 18px 18px;
  padding: 20px;
  margin-right: 10px;
`;

const RoomControlButton = styled.button`
  width: 60px;
  height: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${BasicColor.BLUE40};
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RoomControlItemBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const RoomControlItemColor = styled.button<{ color: BasicColor }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin: 5px;
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
