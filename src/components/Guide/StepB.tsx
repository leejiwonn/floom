import styled from '@emotion/styled';
import { useState } from 'react';

import StepTemplate from './StepTemplate';

interface Props {
  time: number;
  onChangePlay?: (value: boolean) => void;
  onChangeTime?: (value: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepB = ({
  time,
  onChangePlay,
  onChangeTime,
  onPrevPage,
  onNextPage,
}: Props) => {
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

  const handlePrevStepButtonClick = () => {
    onPrevPage();
    onChangePlay?.(false);
  };

  const handleNextStepButtonClick = () => {
    onNextPage();
    onChangePlay?.(true);
    onChangeTime?.(currentTime);
  };

  return (
    <StepTemplate
      onPrevPage={handlePrevStepButtonClick}
      onNextPage={handleNextStepButtonClick}
    >
      <StepBStyled>
        <SubTitle>처음에는 가볍게 목표부터 설정해볼까요?</SubTitle>
        <Title>
          방을 체험할 동안
          <br />
          <span>어떤 학습</span>을 하실 건가요?
        </Title>
        <ResultStyled>
          딱<br />
          <span>{currentTime}분 동안</span>
          <br />
          몰입할래요!
        </ResultStyled>
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

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #333;
  margin-bottom: 5px;
`;

const Title = styled.p`
  font-size: 21px;
  font-weight: 800;
  color: #343434;

  span {
    color: #587bfa;
  }
`;

const ResultStyled = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #333;
  margin-top: 60px;
  padding-left: 10px;
  line-height: 2.5;
  margin-bottom: 60px;

  span {
    font-size: 18px;
    font-weight: 800;
    color: #587bfa;
  }
`;

export default StepB;
