import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';

interface Props {
  setShow: (type: string) => void;
  title: string;
  emoji?: React.ReactNode;
  subTitle: React.ReactElement;
  content: string;
  action?: React.ReactNode;
  buttonActive?: boolean;
  buttonText: string;
  onButtonClick: () => void;
}

const Modal = ({
  setShow,
  title,
  emoji,
  subTitle,
  content,
  action,
  buttonActive = true,
  buttonText,
  onButtonClick,
}: Props) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target)) {
      setShow(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <ModalStyled>
      <ModalBox ref={modalRef}>
        <Typography font={FontType.BOLD_TITLE_01} marginBottom={20}>
          {title}
        </Typography>
        {emoji}
        <Typography font={FontType.SEMI_BOLD_BODY} marginBottom={3}>
          {subTitle}
        </Typography>
        <Typography
          font={FontType.LIGHT_CAPTION}
          color={BasicColor.DARK70}
          marginBottom={30}
        >
          {content}
        </Typography>
        {action}
        <ModalButton onClick={onButtonClick} active={buttonActive}>
          <Typography
            font={FontType.EXTRA_BOLD_BODY}
            color={buttonActive ? BasicColor.WHITE : BasicColor.DARK100}
          >
            {buttonText}
          </Typography>
        </ModalButton>
      </ModalBox>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  box-shadow: rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  padding: 30px;
`;

const ModalButton = styled.button<{ active: boolean }>`
  padding: 6px 12vw;
  background-color: ${({ active }) => (active ? BasicColor.BLUE100 : 'none')};
  border: 2px solid
    ${({ active }) => (active ? BasicColor.BLUE110 : BasicColor.BLUE40)};
  box-sizing: border-box;
  border-radius: 48px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  transition: 0.1s;
`;

export default Modal;
