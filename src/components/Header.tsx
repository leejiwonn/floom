import styled from '@emotion/styled';

interface Props {
  title?: string;
  right?: React.ReactNode;
}

const Header = ({ title, right }: Props) => {
  return (
    <HeaderStyled>
      <Logo href="/home">Floom</Logo>
      <Title>{title}</Title>
      <RightStyled>{right}</RightStyled>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #000;
`;

const Logo = styled.a`
  position: absolute;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0 auto;
`;

const RightStyled = styled.div`
  position: absolute;
  right: 20px;
`;

export default Header;
