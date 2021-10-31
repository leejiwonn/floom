import styled from '@emotion/styled';
import { useState } from 'react';

import Typography from '~/components/Typography';
import { FontType } from '~/utils/font';
import { BasicColor } from '~/utils/color';
import useOutsideEvent from '~/hooks/useOutsideEvent';

import DropdownIcon from '../../public/assets/icons/icon-dropdown.svg';
import LoopIcon from '../../public/assets/icons/icon-loop.svg';

interface Props {
  time: number;
  onChangeTime: (value: number) => void;
}

const values = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

const Dropdown = ({ time, onChangeTime }: Props) => {
  const [show, setShow] = useState(false);
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setShow(false),
  });

  const handleTimeValueClick = (value: number) => {
    onChangeTime(value);
    setShow(false);
  };

  return (
    <DropdownStyled ref={modalRef}>
      <DropdownButton onClick={() => setShow((prev) => !prev)}>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_03}
          color={BasicColor.BLUE100}
        >
          {time === 0 ? <LoopIcon width="2.1em" height="1.4em" /> : time + '분'}
        </Typography>
        <DropdownIconStyled active={show}>
          <DropdownIcon width="1.3em" height="0.9em" />
        </DropdownIconStyled>
      </DropdownButton>
      <DropdownBox active={show}>
        {values.map((value, index) => (
          <DropdownItem key={index} onClick={() => handleTimeValueClick(value)}>
            {value === 0 ? (
              <LoopIcon width="4.2em" height="2.8em" />
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
  width: 12em;
  height: 5em;
  display: inline-block;
  border-radius: 1em;
  background-color: ${BasicColor.GRAY20};
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

const DropdownIconStyled = styled.span<{ active: boolean }>`
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownBox = styled.div<{ active: boolean }>`
  width: 100%;
  height: 20vh;
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: ${BasicColor.WHITE};
  border: 0.2em solid ${BasicColor.GRAY20};
  border-radius: 1em;
  padding: 0 1em;
  margin-top: 0.5em;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  padding: 0.6em 0;
`;

export default Dropdown;
