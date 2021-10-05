import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import StepTemplate from './StepTemplate';

interface Props {
  goal: string;
  onChangeGoalText: (value: string) => void;
  placeholderInfo?: string;
  onNextPage?: () => void;
}

const StepA = ({ onChangeGoalText, placeholderInfo, onNextPage }: Props) => {
  const [textInput, setTextInput] = useState('');

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextInput(e.target.value);
    },
    [setTextInput],
  );

  const handleNextStepButtonClick = () => {
    onNextPage();
    onChangeGoalText(textInput);
  };

  return (
    <StepTemplate onNextPage={handleNextStepButtonClick}>
      <StepAStyled>
        <SubTitle>처음에는 가볍게 목표부터 설정해볼까요?</SubTitle>
        <Title>
          방을 체험할 동안
          <br />
          <span>어떤 학습</span>을 하실 건가요?
        </Title>
        <ResultStyled>
          저는,
          <br />
          <TextInputStyled
            type="text"
            placeholder={placeholderInfo}
            value={textInput}
            onChange={handleChangeInput}
          />
          <br />
          을(를) 할래요.
        </ResultStyled>
      </StepAStyled>
    </StepTemplate>
  );
};

const StepAStyled = styled.div`
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
`;

const TextInputStyled = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 18px;
  color: #587bfa;
  background-color: #f6f6f6;
  border-radius: 10px;
  margin-left: -10px;
`;

export default StepA;
