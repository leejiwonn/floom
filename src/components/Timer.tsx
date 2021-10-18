import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import ClockIcon from '../../public/assets/icons/icon-clock.svg';
import Typography from './Typography';

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

  const handleTimeUpdate = () => {
    setMinutes((prev) => prev + 10);
    timeUpdate();
  };

  return (
    <TimerStyled>
      <EmojiStyled>
        <Emoji>
          <ClockIcon />
        </Emoji>
        <Typography
          font={FontType.EXTRA_BOLD_HEAD_03}
          color={BasicColor.BLUE100}
        >
          {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      </EmojiStyled>
      <TimerButtonStyled>
        <ExtensionButton onClick={handleTimeUpdate}>
          <Typography font={FontType.SEMI_BOLD_BODY} color={BasicColor.WHITE}>
            10분 더
          </Typography>
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
  border-top: 2px solid ${BasicColor.BLUE40};
  padding: 15px 20px;
`;

const TimerButtonStyled = styled.div``;

const ExtensionButton = styled.button`
  padding: 5px 10px;
  background-color: ${BasicColor.BLUE100};
  border-radius: 12px;
  margin-right: 10px;
`;

const StopButton = styled.button<{ stop: boolean }>`
  padding: 4px 8px;
  border: 2px solid
    ${({ stop }) => (stop ? BasicColor.BLUE80 : BasicColor.BLUE40)};
  border-radius: 12px;
  background-color: ${({ stop }) => (stop ? BasicColor.BLUE40 : 'none')};
  transition: 0.1s;
`;

const EmojiStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Emoji = styled.div`
  display: inline-flex;
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

export default Timer;
