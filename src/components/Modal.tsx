import styled from '@emotion/styled';
import { ReactElement, ReactNode } from 'react';

import useOutsideEvent from '~/hooks/useOutsideEvent';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { LoaderBubbles } from './Loader';
import Typography from './Typography';

interface Props {
  setShow?: (type?: string) => void;
  title: string;
  emoji?: ReactNode;
  subTitle: ReactElement;
  content: string;
  action?: ReactNode;
  resetAction?: () => void;
  prevButtonText?: string;
  onPrevButtonClick?: () => void;
  nextButtonActive?: boolean;
  nextButtonText: string;
  onNextButtonClick: () => void;
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
  prevButtonText,
  onPrevButtonClick,
  nextButtonActive = true,
  nextButtonText,
  onNextButtonClick,
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
        <ModalButtonStyled>
          {prevButtonText && (
            <ModalButton
              onClick={onPrevButtonClick}
              active={false}
              multiple={!!prevButtonText}
              style={{ marginRight: '1em' }}
            >
              <Typography>{prevButtonText}</Typography>
            </ModalButton>
          )}
          <ModalButton
            onClick={() => !isLoading && onNextButtonClick()}
            active={nextButtonActive}
            multiple={!!prevButtonText}
          >
            {isLoading ? (
              <LoaderBubbles mode={nextButtonActive ? 'dark' : 'light'} />
            ) : (
              <Typography
                color={nextButtonActive ? BasicColor.WHITE : BasicColor.DARK100}
              >
                {nextButtonText}
              </Typography>
            )}
          </ModalButton>
        </ModalButtonStyled>
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
  background-color: rgba(0, 0, 0, 0.6);
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

const ModalButtonStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalButton = styled.button<{ active: boolean; multiple: boolean }>`
  width: ${({ multiple }) => (multiple ? '10vw' : '28vw')};
  height: 4em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? BasicColor.BLUE100 : 'none')};
  border: 0.2em solid
    ${({ active }) => (active ? BasicColor.BLUE110 : BasicColor.BLUE40)};
  box-sizing: border-box;
  border-radius: 4.8em;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  transition: 0.1s;

  :hover {
    background-color: ${({ active }) => active && BasicColor.BLUE97};
    transition: 0.1s;
  }
`;

export default Modal;
