import { useState } from 'react';

import Dropdown from '~/components/Dropdown';
import Typography from '~/components/Typography';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

import StepTemplate from './StepTemplate';

interface Props {
  goal: string;
  time: number;
  onChangePlay?: (value: boolean) => void;
  onChangeTime?: (value: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepB = ({
  goal,
  time,
  onChangePlay,
  onChangeTime,
  onPrevPage,
  onNextPage,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(time);

  const handleChangeTime = (value: any) => {
    setCurrentTime(value);
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
      subTitle="처음에는 가볍게 목표부터 설정해볼까요?"
      title={
        <>
          {goal}을
          <br />
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={TextColor.SECONDARY}
          >
            몇 분 동안
          </Typography>
          하실 건가요?
        </>
      }
      content={
        <>
          딱<br />
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={TextColor.SECONDARY}
          >
            <Dropdown onChangeTime={handleChangeTime} /> 분 동안
          </Typography>
          <br />
          몰입할래요!
        </>
      }
      prevButtonText="이전"
      onPrevPage={handlePrevStepButtonClick}
      nextButtonText="설정했어요!"
      onNextPage={handleNextStepButtonClick}
    />
  );
};

export default StepB;
