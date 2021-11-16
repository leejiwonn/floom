import styled from '@emotion/styled';
import { BasicColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import Typography from './Typography';

interface Props {
  onClose: () => void;
}

const OnBoarding = ({ onClose }: Props) => {
  return (
    <OnBoardingStyled onClick={onClose}>
      <Guide1Styled>
        <Typography
          font={FontType.BOLD_BODY}
          color={BasicColor.WHITE}
          align={Align.CENTER}
          marginBottom={0.2}
        >
          마우스를 요리조리 움직이고,
          <br />
          손가락이 나타나는 물건을 찾아보세요!
          <br />
          방에 놓인 물건의 디자인을 바꿀 수 있답니다.
        </Typography>
        <Typography font={FontType.BOLD_TITLE_02} color={BasicColor.GREEN100}>
          소품 디자인 변경
        </Typography>
        <img src="/assets/images/onboarding/image-arrow-1.png" />
        <FingerImage src="/assets/images/onboarding/image-finger.png" />
      </Guide1Styled>
      <Guide2Styled>
        <img src="/assets/images/onboarding/image-arrow-2.png" />
        <Typography
          font={FontType.BOLD_TITLE_02}
          color={BasicColor.GREEN100}
          marginTop={1}
        >
          창문 밖 효과 설정
        </Typography>
        <Typography
          font={FontType.BOLD_BODY}
          color={BasicColor.WHITE}
          align={Align.CENTER}
          marginTop={0.2}
        >
          창문 밖의 다양한 효과를
          <br /> 설정 할 수 있어요!
        </Typography>
      </Guide2Styled>
      <Guide3Styled>
        <Guide3Image src="/assets/images/onboarding/image-arrow-3.png" />
        <Typography font={FontType.BOLD_TITLE_02} color={BasicColor.GREEN100}>
          방 색상 변경
        </Typography>
        <Typography
          font={FontType.BOLD_BODY}
          color={BasicColor.WHITE}
          align={Align.CENTER}
          marginTop={0.2}
        >
          색상 팔레트를 눌러
          <br />
          방의 분위기를 바꿔볼까요?
        </Typography>
      </Guide3Styled>
    </OnBoardingStyled>
  );
};

const OnBoardingStyled = styled.button`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 97;
`;

const Guide1Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 54%;
  left: 30%;
`;

const FingerImage = styled.img`
  position: absolute;
  right: 16%;
  bottom: -10%;
`;

const Guide2Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20%;
  right: 32%;
`;

const Guide3Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 22%;
  right: 12%;
`;

const Guide3Image = styled.img`
  position: absolute;
  top: -18%;
  right: -20%;
`;

export default OnBoarding;
