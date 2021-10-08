import styled from '@emotion/styled';
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
        <ResultStyled>
          <Typography
            font={FontType.REGULAR_BODY}
            marginTop={60}
            marginLeft={10}
            marginBottom={60}
          >
            딱
          </Typography>
          <DropdownLineStyled>
            <Dropdown time={currentTime} onChangeTime={setCurrentTime} />
            <Typography
              tag="span"
              font={FontType.EXTRA_BOLD_HEAD_03}
              color={TextColor.SECONDARY}
              marginTop={8}
              marginLeft={10}
            >
              동안
            </Typography>
          </DropdownLineStyled>
          <Typography
            font={FontType.REGULAR_BODY}
            marginTop={70}
            marginLeft={10}
            marginBottom={60}
          >
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
  position: relative;
`;

const DropdownLineStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 30px;
`;

export default StepB;
