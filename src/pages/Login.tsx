import styled from '@emotion/styled';

const Login = () => {
  return (
    <LoginStyled>
      <LoginButton href="/api/auth/kakao">카카오 로그인</LoginButton>
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

const LoginButton = styled.a`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #fee502;
  border-radius: 10px;
  cursor: pointer;
`;

export default Login;
