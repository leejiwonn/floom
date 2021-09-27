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
        <TextInputStyled
          type="text"
          placeholder={placeholderInfo}
          value={textInput}
          onChange={handleChangeInput}
        />
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

const TextInputStyled = styled.input`
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
`;

export default StepA;
