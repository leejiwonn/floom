import styled from '@emotion/styled';

interface Props {
  children?: React.ReactNode;
  onNextPage?: () => void;
}

const StepTemplate = ({ children, onNextPage }: Props) => {
  return (
    <StepStyled>
      {children}
      {onNextPage && (
        <NextStepButton onClick={onNextPage}>다음으로</NextStepButton>
      )}
    </StepStyled>
  );
};

const StepStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const NextStepButton = styled.button`
  padding: 10px 30px;
  border: 1px solid #000;
`;

export default StepTemplate;
