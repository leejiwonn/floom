import styled from '@emotion/styled';
import React from 'react';
import Link from 'next/link';

const Login = () => {
  return (
    <LoginStyled>
      <Link href="/home">
        <LoginButton>로그인</LoginButton>
      </Link>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
`;

export default Login;
