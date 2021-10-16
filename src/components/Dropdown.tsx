import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';

import Typography from '~/components/Typography';
import { FontType } from '~/utils/font';
import { BasicColor } from '~/utils/color';
import DropdownIcon from '../../public/assets/icons/icon-dropdown.svg';
import LoopIcon from '../../public/assets/icons/icon-loop.svg';

interface Props {
  time: number;
  onChangeTime: (value: number) => void;
}

const values = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

// TODO : 외부 클릭 시 닫히도록 하는 코드 재사용 가능하게 분리
const Dropdown = ({ time, onChangeTime }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef(null);

  const handleTimeValueClick = (value: number) => {
    onChangeTime(value);
    setIsActive(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <DropdownStyled ref={modalRef}>
      <DropdownButton onClick={() => setIsActive((prev) => !prev)}>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_03}
          color={BasicColor.BLUE100}
        >
          {time === 0 ? <LoopIcon /> : time + '분'}
        </Typography>
        <DropdownIconStyled active={isActive}>
          <DropdownIcon />
        </DropdownIconStyled>
      </DropdownButton>
      <DropdownBox active={isActive}>
        {values.map((value, index) => (
          <DropdownItem key={index} onClick={() => handleTimeValueClick(value)}>
            {value === 0 ? (
              <LoopIcon />
            ) : (
              <Typography
                font={FontType.BOLD_TITLE_01}
                color={time === value ? BasicColor.BLUE100 : BasicColor.DARK100}
              >
                {value}분
              </Typography>
            )}
          </DropdownItem>
        ))}
      </DropdownBox>
    </DropdownStyled>
  );
};

const DropdownStyled = styled.div`
  width: 120px;
  height: 50px;
  display: inline-block;
  border-radius: 10px;
  background-color: ${BasicColor.GRAY20};
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const DropdownIconStyled = styled.span<{ active: boolean }>`
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownBox = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100px;
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: ${BasicColor.WHITE};
  border: 2px solid ${BasicColor.GRAY20};
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 5px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 0;
`;

export default Dropdown;
