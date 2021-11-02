import styled from '@emotion/styled';
import { useEffect } from 'react';

import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';

import WarningIcon from '../../public/assets/icons/icon-warning.svg';

interface Props {
  message: string;
  setVisibleToast: (value: string) => void;
}

const Toast = ({ message, setVisibleToast }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setVisibleToast('');
    }, 3000);
  }, []);

  return (
    <ToastStyled>
      <WarningIcon />
      <Typography
        font={FontType.SEMI_BOLD_CAPTION}
        color={BasicColor.WHITE}
        marginLeft={1}
      >
        {message}
      </Typography>
    </ToastStyled>
  );
};

const ToastStyled = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: ${BasicColor.DARK100};
  color: ${BasicColor.WHITE};
  border-radius: 3em;
  padding: 1em 1.5em;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2s;
  animation: fadein 0.5s, fadeout 0.5s 2s;
  animation-fill-mode: forwards;

  @keyframes fadein {
    0% {
      top: 2em;
      opacity: 0;
    }
    100% {
      top: 4em;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    0% {
      top: 4em;
      opacity: 1;
    }
    100% {
      top: 2em;
      opacity: 0;
    }
  } ;
`;

export default Toast;
