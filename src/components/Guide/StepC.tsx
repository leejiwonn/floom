import styled from '@emotion/styled';
import StepTemplate from './StepTemplate';

interface Props {
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepC = ({ onPrevPage, onNextPage }: Props) => {
  return (
    <StepTemplate onPrevPage={onPrevPage} onNextPage={onNextPage}>
      <StepCStyled>
        <Title>이 방에서 재생될 음악이예요.</Title>
        <SubTitle>몰입할 때의 볼륨은 50~60 정도가 적당해요 :D</SubTitle>
      </StepCStyled>
    </StepTemplate>
  );
};

const StepCStyled = styled.div`
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

export default StepC;
