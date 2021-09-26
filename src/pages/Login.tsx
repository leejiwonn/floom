import styled from '@emotion/styled';

import Header from '../components/Header';

const Login = () => {
  return (
    <>
      <Header />
      <LoginStyled>
        <LoginButton href="/api/auth/kakao">로그인</LoginButton>
      </LoginStyled>
    </>
  );
};

const LoginStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.a`
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
`;

export default Login;
