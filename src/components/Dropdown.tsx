import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';

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

const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 0];

const Dropdown = ({ time, onChangeTime }: Props) => {
  const [show, setShow] = useState(false);
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => setShow(false),
  });

  const focusRef = useRef<HTMLButtonElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleOutFocus = (e: MouseEvent) => {
    const focus = focusRef.current;

    if (focus != null && !focus.contains(e.target as HTMLElement)) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutFocus);
    return () => {
      window.removeEventListener('click', handleOutFocus);
    };
  }, []);

  const handleTimeValueClick = (value: number) => {
    onChangeTime(value);
    setShow(false);
  };

  return (
    <DropdownStyled ref={modalRef}>
      <DropdownButton
        ref={focusRef}
        onClick={() => setShow((prev) => !prev)}
        isFocus={isFocus}
        onFocus={() => setIsFocus(true)}
      >
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_03}
          color={BasicColor.BLUE100}
        >
          {time === 0 ? (
            <LoopIcon
              width="2.1em"
              height="1.4em"
              stroke={BasicColor.BLUE100}
            />
          ) : (
            time + '분'
          )}
        </Typography>
        <DropdownIconStyled active={show}>
          <DropdownIcon width="1.3em" height="0.9em" />
        </DropdownIconStyled>
      </DropdownButton>
      <DropdownBox active={show} className="scrollbar">
        {values.map((value, index) => (
          <DropdownItem key={index} onClick={() => handleTimeValueClick(value)}>
            {value === 0 ? (
              <LoopIcon
                width="3.6em"
                height="2.2em"
                stroke={time === 0 ? BasicColor.BLUE100 : BasicColor.DARK100}
              />
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

const DropdownButton = styled.button<{ isFocus: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  border-radius: 1em;
  border: ${({ isFocus }) =>
    isFocus ? `1px solid ${BasicColor.BLUE80}` : '1px solid transparent'};
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
  border: 0.2em solid ${BasicColor.BLUE40};
  border-radius: 1em;
  padding: 0 1em;
  margin-top: 0.5em;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  padding: 0.6em 0;
`;

export default Dropdown;
