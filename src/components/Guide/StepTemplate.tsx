import styled from '@emotion/styled';

import { Align, FontType } from '~/utils/font';
import Typography from '~/components/Typography';
import { BasicColor } from '~/utils/color';

interface Props {
  title?: React.ReactNode;
  content?: React.ReactNode;
  prevButtonText?: string;
  onPrevPage?: () => void;
  nextButtonText?: string;
  nextButtonStatus?: boolean;
  onNextPage?: () => void;
}

const StepTemplate = ({
  title,
  content,
  prevButtonText,
  onPrevPage,
  nextButtonText,
  nextButtonStatus = true,
  onNextPage,
}: Props) => {
  return (
    <StepStyled>
      <StepInfo>
        <Typography font={FontType.EXTRA_BOLD_HEAD_03}>{title}</Typography>
        {content}
      </StepInfo>
      <ButtonStyled>
        {onPrevPage && (
          <PrevStepButton onClick={onPrevPage}>
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.DARK70}
              align={Align.CENTER}
            >
              {prevButtonText}
            </Typography>
          </PrevStepButton>
        )}
        {onNextPage && (
          <NextStepButton
            onClick={onNextPage}
            checkLast={!!onPrevPage}
            status={nextButtonStatus}
          >
            <Typography
              font={FontType.SEMI_BOLD_BODY}
              color={nextButtonStatus ? BasicColor.WHITE : BasicColor.BLUE100}
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
  border: 1px solid ${BasicColor.BLUE40};
  border-radius: 48px;
  padding: 15px;
`;

const NextStepButton = styled.button<{ checkLast: boolean; status: boolean }>`
  width: ${({ checkLast }) => (checkLast ? '64%' : '100%')};
  border-radius: 48px;
  padding: 15px;
  background-color: ${({ status }) =>
    status ? BasicColor.BLUE100 : BasicColor.WHITE};
  border: 1px solid ${BasicColor.BLUE100};
  transition: 0.1s;
`;

export default StepTemplate;
