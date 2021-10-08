import { useState, useCallback } from 'react';

import Typography from '~/components/Typography';
import TextInput from '~/components/TextInput';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

import StepTemplate from './StepTemplate';

interface Props {
  placeholderInfo?: string;
  onChangeGoalText: (value: string) => void;
  onNextPage?: () => void;
}

const StepA = ({ placeholderInfo, onChangeGoalText, onNextPage }: Props) => {
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
    <StepTemplate
      subTitle="처음에는 가볍게 목표부터 설정해볼까요?"
      title={
        <>
          방을 체험할 동안
          <br />
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={TextColor.SECONDARY}
          >
            어떤 목표
          </Typography>
          를 이루실 건가요?
        </>
      }
      content={
        <Typography
          font={FontType.REGULAR_BODY}
          lineHeight={2.5}
          marginTop={60}
          marginBottom={60}
        >
          저는,
          <br />
          <TextInput
            value={textInput}
            onChangeInput={handleChangeInput}
            placeholder={placeholderInfo}
            marginLeft={-5}
            font={FontType.REGULAR_BODY}
            color={TextColor.SECONDARY}
          />
          <br />
          할래요.
        </Typography>
      }
      nextButtonText="다 적었어요!"
      onNextPage={handleNextStepButtonClick}
    />
  );
};

export default StepA;
