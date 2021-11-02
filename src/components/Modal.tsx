import styled from '@emotion/styled';
import { ReactElement, ReactNode } from 'react';

import useOutsideEvent from '~/hooks/useOutsideEvent';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { LoaderSpinner } from './Loader';
import Typography from './Typography';

interface Props {
  setShow?: (type?: string) => void;
  title: string;
  emoji?: ReactNode;
  subTitle: ReactElement;
  content: string;
  action?: ReactNode;
  resetAction?: () => void;
  buttonActive?: boolean;
  buttonText: string;
  onButtonClick: () => void;
  isLoading?: boolean;
}

const Modal = ({
  setShow,
  title,
  emoji,
  subTitle,
  content,
  action,
  resetAction,
  buttonActive = true,
  buttonText,
  onButtonClick,
  isLoading,
}: Props) => {
  const { modalRef } = useOutsideEvent<HTMLDivElement>({
    onOutsideClick: () => {
      setShow?.();
      resetAction?.();
    },
  });

  return (
    <ModalStyled>
      <ModalBox ref={modalRef}>
        <Typography font={FontType.BOLD_TITLE_01} marginBottom={2}>
          {title}
        </Typography>
        {emoji}
        <Typography font={FontType.SEMI_BOLD_BODY} marginBottom={0.3}>
          {subTitle}
        </Typography>
        <Typography
          font={FontType.LIGHT_CAPTION}
          color={BasicColor.DARK70}
          marginBottom={3}
        >
          {content}
        </Typography>
        {action}
        <ModalButton
          onClick={() => !isLoading && onButtonClick()}
          active={buttonActive}
        >
          {isLoading ? (
            <LoaderSpinner mode={buttonActive ? 'dark' : 'light'} />
          ) : (
            <Typography
              font={FontType.EXTRA_BOLD_BODY}
              color={buttonActive ? BasicColor.WHITE : BasicColor.DARK100}
            >
              {buttonText}
            </Typography>
          )}
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
  border-radius: 2.4em;
  padding: 3em;
`;

const ModalButton = styled.button<{ active: boolean }>`
  width: 28vw;
  display: flex;
  justify-content: center;
  padding: 0.6em 0;
  background-color: ${({ active }) => (active ? BasicColor.BLUE100 : 'none')};
  border: 0.2em solid
    ${({ active }) => (active ? BasicColor.BLUE110 : BasicColor.BLUE40)};
  box-sizing: border-box;
  border-radius: 4.8em;
  transition: 0.1s;
`;

export default Modal;
