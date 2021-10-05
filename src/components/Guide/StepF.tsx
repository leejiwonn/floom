import styled from '@emotion/styled';

import StepTemplate from './StepTemplate';

interface Props {
  onSliderShow: (value: boolean) => void;
  onNextPage?: () => void;
}

const StepF = ({ onSliderShow, onNextPage }: Props) => {
  const handleNextStepButtonClick = () => {
    onNextPage();
    onSliderShow(false);
  };

  return (
    <StepTemplate onNextPage={handleNextStepButtonClick}>
      <StepBStyled>
        <SubTitle>이제 마지막이예요!</SubTitle>
        <Title>
          방주인이 설정해둔
          <br />
          <span>배경화면</span>으로
          <br />
          체험중인 방의 분위기를
          <br />
          전환할 수도 있답니다.
        </Title>
      </StepBStyled>
    </StepTemplate>
  );
};

const StepBStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #333;
  margin-bottom: 5px;
`;

const Title = styled.p`
  font-size: 21px;
  font-weight: 800;
  color: #343434;

  span {
    color: #587bfa;
  }
`;

export default StepF;
