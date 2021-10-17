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
      <ModalBox>
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
        <ModalButton onClick={onButtonClick}>
          <Typography font={FontType.EXTRA_BOLD_BODY} color={BasicColor.WHITE}>
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

const ModalButton = styled.button`
  padding: 6px 12vw;
  background-color: ${BasicColor.BLUE100};
  border: 2px solid ${BasicColor.BLUE110};
  box-sizing: border-box;
  border-radius: 48px;
`;

export default Modal;
