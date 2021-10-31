import styled from '@emotion/styled';
import { useState } from 'react';

import Dropdown from '~/components/Dropdown';
import Typography from '~/components/Typography';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import EMOJI from '~/constants/emoji';
import StepTemplate from './StepTemplate';

interface Props {
  objective: string;
  time: number;
  onChangePlay?: (value: boolean) => void;
  onChangeTime?: (value: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepB = ({
  objective,
  time,
  onChangePlay,
  onChangeTime,
  onPrevPage,
  onNextPage,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(time);

  const handlePrevStepButtonClick = () => {
    onPrevPage?.();
    onChangePlay?.(false);
  };

  const handleNextStepButtonClick = () => {
    onNextPage?.();
    onChangePlay?.(true);
    onChangeTime?.(currentTime);
  };

  return (
    <StepTemplate
      title={
        <>
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={BasicColor.BLUE100}
          >
            {objective}
          </Typography>
          <Emoji>{EMOJI.EYES}</Emoji>에
          <br />몇 분<Emoji>{EMOJI.CLOCK}</Emoji>동안 몰입할까요?
        </>
      }
      content={
        <ResultStyled>
          <DropdownLineStyled>
            <Typography
              tag="span"
              font={FontType.EXTRA_BOLD_HEAD_03}
              color={BasicColor.BLUE100}
              marginTop={0.8}
              marginRight={1}
            >
              딱
            </Typography>
            <Dropdown time={currentTime} onChangeTime={setCurrentTime} />
            <Typography
              tag="span"
              font={FontType.EXTRA_BOLD_HEAD_03}
              color={BasicColor.BLUE100}
              marginTop={0.8}
              marginLeft={1}
            >
              동안
            </Typography>
          </DropdownLineStyled>
          <Typography font={FontType.REGULAR_TITLE_01} marginTop={1.5}>
            몰입할래요!
          </Typography>
        </ResultStyled>
      }
      prevButtonText="이전"
      onPrevPage={handlePrevStepButtonClick}
      nextButtonText="설정했어요!"
      onNextPage={handleNextStepButtonClick}
    />
  );
};

const ResultStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6em;
`;

const DropdownLineStyled = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Emoji = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3.6em;
  height: 3.6em;
  padding: 0 0.4em;
`;

export default StepB;
