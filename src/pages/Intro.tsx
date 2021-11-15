import styled from '@emotion/styled';
import Typography from '~/components/Typography';
import { FontType } from '~/utils/font';

const Intro = () => {
  return (
    <IntroStyled>
      <Typography font={FontType.EXTRA_BOLD_HEAD_02}>
        오픈 준비중입니다 😊
      </Typography>
    </IntroStyled>
  );
};

const IntroStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Intro;
