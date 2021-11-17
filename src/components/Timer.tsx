import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';

import ClockIcon from '../../public/assets/icons/icon-clock.svg';
import PlusIcon from '../../public/assets/icons/icon-plus.svg';
import MinusIcon from '../../public/assets/icons/icon-minus.svg';

interface Props {
  time: number;
  timeUpdate: () => void;
  onTimeout: () => void;
}

const Timer = ({ time, timeUpdate, onTimeout }: Props) => {
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (!stop) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            onTimeout();
            clearInterval(countdown);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds, stop]);

  const handleTimeUpdate = (type: '-' | '+') => {
    setMinutes((prev) => prev + (type === '+' ? +10 : -10));
    timeUpdate();
  };

  return (
    <TimerStyled>
      <TimeStyled>
        <Emoji>
          <ClockIcon />
        </Emoji>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_03}
          color={BasicColor.BLUE100}
        >
          {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      </TimeStyled>
      <TimerButtonStyled>
        <ExtensionButton
          onClick={() => minutes > 10 && handleTimeUpdate('-')}
          disable={!(minutes > 10 && !(minutes === 10 && seconds === 0))}
        >
          <MinusIcon
            width="2.4em"
            height="2.4em"
            stroke={
              minutes > 10 && !(minutes === 10 && seconds === 0)
                ? BasicColor.BLUE100
                : BasicColor.DARK40
            }
          />
        </ExtensionButton>
        <ExtensionButton onClick={() => handleTimeUpdate('+')}>
          <PlusIcon width="2.4em" height="2.4em" stroke={BasicColor.BLUE100} />
        </ExtensionButton>
        <StopButton onClick={() => setStop((prev) => !prev)} stop={stop}>
          <Typography font={FontType.SEMI_BOLD_BODY}>
            {stop ? '다시 시작하기' : '쉬었다 하기'}
          </Typography>
        </StopButton>
      </TimerButtonStyled>
    </TimerStyled>
  );
};

const TimerStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 0.2em solid ${BasicColor.BLUE40};
  padding: 1.5em 2em;
`;

const TimeStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TimerButtonStyled = styled.div`
  display: flex;
`;

const ExtensionButton = styled.button<{ disable?: boolean }>`
  width: 4em;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.2em solid
    ${({ disable }) => (disable ? BasicColor.DARK10 : BasicColor.BLUE40)};
  border-radius: 1.2em;
  background-color: ${BasicColor.WHITE};
  margin-right: 0.6em;
  transition: 0.1s;

  :hover {
    background-color: ${({ disable }) => !disable && BasicColor.BLUE05};
    transition: 0.1s;
  }
`;

const StopButton = styled.button<{ stop: boolean }>`
  padding: 0.4em 0.8em;
  border: 0.2em solid
    ${({ stop }) => (stop ? BasicColor.BLUE80 : BasicColor.BLUE40)};
  border-radius: 1.2em;
  background-color: ${({ stop }) => (stop ? BasicColor.BLUE40 : 'none')};
  margin-left: 0.4em;
  transition: 0.1s;

  :hover {
    background-color: ${BasicColor.BLUE05};
    transition: 0.1s;
  }
`;

const Emoji = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  margin-right: 1em;
`;

export default Timer;
