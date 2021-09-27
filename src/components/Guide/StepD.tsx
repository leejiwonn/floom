import styled from '@emotion/styled';
import StepTemplate from './StepTemplate';

interface Props {
  light?: string;
  onNextPage?: () => void;
}

const StepD = ({ light, onNextPage }: Props) => {
  return (
    <StepTemplate onNextPage={onNextPage}>
      <StepDStyled>
        <Title>
          이 방의 주인은 <br /> {light} 색상의 조명을 추천했어요!
        </Title>
        <SubTitle>조명은 기본적으로 30% 밝기를 추천합니다.</SubTitle>
      </StepDStyled>
    </StepTemplate>
  );
};

const StepDStyled = styled.div`
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

export default StepD;
