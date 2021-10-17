import { useState, useCallback } from 'react';

import Typography from '~/components/Typography';
import TextInput from '~/components/TextInput';
import { BasicColor } from '~/utils/color';
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
      if (e.target.value.length <= 20) {
        setTextInput(e.target.value);
      }
    },
    [setTextInput],
  );

  const handleNextStepButtonClick = () => {
    if (textInput !== '') {
      onNextPage();
      onChangeGoalText(textInput);
    }
  };

  return (
    <StepTemplate
      title={
        <>
          방을 체험할 동안
          <br />
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={BasicColor.BLUE100}
          >
            어떤 일
          </Typography>
          에 몰입하고 싶으신가요?
        </>
      }
      content={
        <>
          <TextInput
            value={textInput}
            onChangeInput={handleChangeInput}
            placeholder={placeholderInfo}
            marginLeft={-5}
            font={FontType.BOLD_TITLE_01}
            marginTop={50}
          />
          <Typography font={FontType.REGULAR_TITLE_01} marginTop={-20}>
            <br />에 몰입하고 싶어요.
          </Typography>
        </>
      }
      nextButtonText={textInput !== '' ? '다 적었어요!' : '고민중이에요'}
      nextButtonStatus={textInput !== ''}
      onNextPage={handleNextStepButtonClick}
    />
  );
};

export default StepA;
