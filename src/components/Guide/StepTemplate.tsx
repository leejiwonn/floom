import styled from '@emotion/styled';

interface Props {
  children?: React.ReactNode;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepTemplate = ({ children, onPrevPage, onNextPage }: Props) => {
  return (
    <StepStyled>
      {children}
      <ButtonStyled>
        {onPrevPage && (
          <PrevStepButton onClick={onPrevPage}>이전</PrevStepButton>
        )}
        {onNextPage && (
          <NextStepButton onClick={onNextPage} checkLast={!!onPrevPage}>
            다음
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
  padding: 15px;
  border-radius: 18px;
  font-weight: 700;
  color: #587bfa;
`;

const NextStepButton = styled.button<{ checkLast: boolean }>`
  width: ${({ checkLast }) => (checkLast ? '64%' : '100%')};
  padding: 15px;
  border-radius: 18px;
  background-color: #587bfa;
  font-weight: 700;
  color: #fff;
`;

export default StepTemplate;
