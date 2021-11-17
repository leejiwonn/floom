import styled from '@emotion/styled';
import { useState } from 'react';

import { Align, FontType } from '~/utils/font';
import { BasicColor, GradientColor } from '~/utils/color';
import { Music } from '~/types/Music';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import Typography from './Typography';
import Playlist from './Playlist';

import OpenIcon from '../../public/assets/icons/icon-open.svg';
import MusicNoneIcon from '../../public/assets/icons/icon-music-none.svg';

interface Props {
  title: string;
  selectedList: Music[];
  onDeleteButtonClick: (value: Music) => void;
}

const BottomPopup = ({ title, selectedList, onDeleteButtonClick }: Props) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setVisiblePopup(false),
  });

  return (
    <BottomPopupStyled ref={modalRef} active={visiblePopup}>
      <TouchArea onClick={() => setVisiblePopup((prev) => !prev)}>
        <OpenIconStyled active={visiblePopup}>
          <OpenIcon width="3.6em" height="3.6em" stroke={BasicColor.WHITE} />
        </OpenIconStyled>
        <Typography
          font={FontType.BOLD_TITLE_02}
          color={BasicColor.WHITE}
          marginTop={-0.8}
        >
          {title}
        </Typography>
      </TouchArea>
      <BottomPopupInfo>
        {selectedList.length ? (
          <Playlist
            playlist={selectedList}
            viewHeight={40}
            onDeleteButtonClick={(value) => onDeleteButtonClick(value)}
            simpleMode
          />
        ) : (
          <NoneInfoStyled>
            <MusicNoneIcon />
            <Typography
              font={FontType.BOLD_BODY}
              color={BasicColor.WHITE}
              marginTop={1.5}
              marginBottom={0.6}
            >
              아직 등록한 음악이 없어요.
            </Typography>
            <Typography
              font={FontType.LIGHT_CAPTION}
              color={BasicColor.WHITE}
              align={Align.CENTER}
            >
              플레이리스트에서 원하는 음악을 선택하면
              <br />
              방을 체험할 때 음악을 들을 수 있어요.
            </Typography>
          </NoneInfoStyled>
        )}
      </BottomPopupInfo>
    </BottomPopupStyled>
  );
};

const BottomPopupStyled = styled.div<{ active: boolean }>`
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: ${({ active }) => (active ? '0' : '-42vh')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  background: ${GradientColor.GRAY};
  border-radius: 3em 3em 0 0;
  transition: 0.3s;
  z-index: 99;
`;

const TouchArea = styled.button`
  width: 100%;
  padding-top: 0.5em;
  padding-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OpenIconStyled = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ active }) => !active && 'rotate(180deg)'};
  opacity: 0.4;
`;

const BottomPopupInfo = styled.div`
  width: 100%;
  height: 42vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3em;
  padding-top: 1.5em;
  padding-bottom: 3em;
`;

const NoneInfoStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default BottomPopup;
