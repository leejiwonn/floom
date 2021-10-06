import styled from '@emotion/styled';

import Typography from '~/components/Typography';
import { GraphicColor } from '~/utils/color';

const Login = () => {
  return (
    <LoginStyled>
      <KakaoLoginButton href="/api/auth/kakao">
        <KakaoLoginIcon src="/assets/icons/icon-kakao-login.png" />
        <Typography tag="span">카카오 로그인</Typography>
      </KakaoLoginButton>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoLoginButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${GraphicColor.YELLOW};
  padding: 15px 60px;
  border-radius: 8px;
`;

const KakaoLoginIcon = styled.img`
  width: 17px;
  height: 16px;
  margin-right: 8px;
`;

export default Login;
