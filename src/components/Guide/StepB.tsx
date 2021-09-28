import styled from '@emotion/styled';
import { useState } from 'react';

import StepTemplate from './StepTemplate';

interface Props {
  time: number;
  onChangePlay?: (value: boolean) => void;
  onChangeTime?: (value: number) => void;
  onNextPage?: () => void;
}

const StepB = ({ time, onChangePlay, onChangeTime, onNextPage }: Props) => {
  const [currentTime, setCurrentTime] = useState(time);

  const handleChangeTime = (type: '-' | '+') => {
    if (
      (currentTime <= 0 && type === '-') ||
      (currentTime === 160 && type === '+')
    ) {
      return;
    }
    setCurrentTime((prev) => {
      return type === '-' ? prev - 10 : prev + 10;
    });
  };

  const handleNextStepButtonClick = () => {
    onNextPage();
    onChangePlay?.(true);
    onChangeTime?.(currentTime);
  };

  return (
    <StepTemplate onNextPage={handleNextStepButtonClick}>
      <StepBStyled>
        <Title>{currentTime}분 동안 할래요!</Title>
        <CountButtonStyled>
          <CountButton onClick={() => handleChangeTime('-')}>-</CountButton>
          <CountButton onClick={() => handleChangeTime('+')}>+</CountButton>
        </CountButtonStyled>
      </StepBStyled>
    </StepTemplate>
  );
};

const StepBStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const CountButtonStyled = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

const CountButton = styled.button`
  width: 48%;
  border: 1px solid #000;
  padding: 5px;
`;

export default StepB;
