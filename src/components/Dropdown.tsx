import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';

import Typography from './Typography';

import { FontType } from '~/utils/font';
import { TextColor } from '~/utils/color';
import DropdownIcon from '../../public/assets/icons/icon-dropdown.svg';

interface Props {
  time: number;
  onChangeTime: (value: number) => void;
}

const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

// TODO : 외부 클릭 시 닫히도록 하는 코드 재사용 가능하게 분리
const Dropdown = ({ time, onChangeTime }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef(null);

  const handleTimeValueClick = (value: number) => {
    onChangeTime(value);
    setIsActive(false);
  };

  const handleClickOutside = (e: any) => {
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
          color={TextColor.SECONDARY}
        >
          {time}분
        </Typography>
        <DropdownIconStyled active={isActive}>
          <DropdownIcon />
        </DropdownIconStyled>
      </DropdownButton>
      <DropdownBox active={isActive}>
        {values.map((value, index) => (
          <DropdownItem
            key={index}
            onClick={() => handleTimeValueClick(value)}
            selected={time === value}
          >
            {value}분
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
  background-color: #f6f6f6;
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
  overflow: scroll;
  background-color: #fff;
  border: 2px solid #f6f6f6;
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 5px;
`;

const DropdownItem = styled.button<{ selected: boolean }>`
  color: ${({ selected }) =>
    selected ? TextColor.PRIMARY : TextColor.SECONDARY};
`;

export default Dropdown;
