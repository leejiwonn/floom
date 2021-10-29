import styled from '@emotion/styled';
import { useState } from 'react';

import { FontType } from '~/utils/font';
import { BasicColor, GradientColor } from '~/utils/color';
import { Music } from '~/types/Music';
import useOutsideEvent from '~/hooks/useOutsideEvent';
import Typography from './Typography';
import Playlist from './Playlist';

import OpenIcon from '../../public/assets/icons/icon-open.svg';

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
          <OpenIcon stroke={BasicColor.WHITE} />
        </OpenIconStyled>
        <Typography
          font={FontType.BOLD_TITLE_02}
          color={BasicColor.WHITE}
          marginTop={-8}
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
            <Typography>원하는 음악을 추가해보세요!</Typography>
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
  bottom: ${({ active }) => (active ? '0px' : '-320px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  background: ${GradientColor.GRAY};
  border-radius: 30px 30px 0px 0px;
  transition: 0.3s;
  z-index: 99;
`;

const TouchArea = styled.button`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 15px;
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
  height: 320px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  padding-top: 15px;
  padding-bottom: 30px;
`;

const NoneInfoStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  border-radius: 10px;
`;

export default BottomPopup;