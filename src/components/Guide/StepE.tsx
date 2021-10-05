import styled from '@emotion/styled';
import StepTemplate from './StepTemplate';

interface Props {
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepE = ({ onPrevPage, onNextPage }: Props) => {
  return (
    <StepTemplate onPrevPage={onPrevPage} onNextPage={onNextPage}>
      <StepEStyled>
        <Title>
          적절한 백색소음은 <br /> 몰입에 도움이 됩니다 :)
        </Title>
        <SubTitle>
          아직 백색소음을 설정하지 않았다면, <br />
          볼륨을 조절하며 원하는 소리를 찾아보세요!
        </SubTitle>
      </StepEStyled>
    </StepTemplate>
  );
};

const StepEStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: gray;
`;

export default StepE;
