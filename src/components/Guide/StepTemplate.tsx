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
        <Typography font={FontType.EXTRA_BOLD_HEAD_03} marginTop={3}>
          {title}
        </Typography>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StepInfo = styled.div``;

const ButtonStyled = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  padding-top: 1em;
`;

const PrevStepButton = styled.button`
  width: 34%;
  border: 0.1em solid ${BasicColor.BLUE40};
  border-radius: 4.8em;
  padding: 1.5em;
`;

const NextStepButton = styled.button<{ checkLast: boolean; status: boolean }>`
  width: ${({ checkLast }) => (checkLast ? '64%' : '100%')};
  border-radius: 4.8em;
  padding: 1.5em;
  background-color: ${({ status }) =>
    status ? BasicColor.BLUE100 : BasicColor.WHITE};
  border: 0.1em solid ${BasicColor.BLUE100};
  transition: 0.1s;
`;

export default StepTemplate;
