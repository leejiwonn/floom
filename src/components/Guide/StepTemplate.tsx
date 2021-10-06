import styled from '@emotion/styled';

import { Align, FontType } from '~/utils/font';
import Typography from '~/components/Typography';
import { TextColor } from '~/utils/color';

interface Props {
  subTitle?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  prevButtonText?: string;
  onPrevPage?: () => void;
  nextButtonText?: string;
  onNextPage?: () => void;
}

const StepTemplate = ({
  subTitle,
  title,
  content,
  prevButtonText,
  onPrevPage,
  nextButtonText,
  onNextPage,
}: Props) => {
  return (
    <StepStyled>
      <StepInfo>
        <Typography font={FontType.LIGHT_CAPTION} marginBottom={5}>
          {subTitle}
        </Typography>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03}>{title}</Typography>
        <Typography
          font={FontType.REGULAR_BODY}
          lineHeight={2.5}
          marginTop={60}
          marginBottom={60}
        >
          {content}
        </Typography>
      </StepInfo>
      <ButtonStyled>
        {onPrevPage && (
          <PrevStepButton onClick={onPrevPage}>
            <Typography
              font={FontType.BOLD_TITLE_02}
              color={TextColor.SECONDARY}
              align={Align.CENTER}
            >
              {prevButtonText}
            </Typography>
          </PrevStepButton>
        )}
        {onNextPage && (
          <NextStepButton onClick={onNextPage} checkLast={!!onPrevPage}>
            <Typography
              font={FontType.BOLD_TITLE_02}
              color={TextColor.WHITE}
              align={Align.CENTER}
            >
              {nextButtonText}
            </Typography>
          </NextStepButton>
        )}
      </ButtonStyled>
    </StepStyled>
  );
};

const StepStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StepInfo = styled.div``;

const ButtonStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PrevStepButton = styled.button`
  width: 34%;
  border: 1px solid #dfe9fb;
  border-radius: 18px;
  padding: 15px;
`;

const NextStepButton = styled.button<{ checkLast: boolean }>`
  width: ${({ checkLast }) => (checkLast ? '64%' : '100%')};
  border-radius: 18px;
  padding: 15px;
  background-color: #587bfa;
`;

export default StepTemplate;
