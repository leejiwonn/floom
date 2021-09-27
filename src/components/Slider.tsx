import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

interface Props {
  currentPage?: number;
  sliderShow: boolean;
  children?: React.ReactNode;
}

const Slider = ({ children, sliderShow, currentPage = 0 }: Props) => {
  const [totalPage, setTotalPage] = useState(0);

  const [childComponents] = useState(() =>
    React.Children.toArray(children).map((child, index) => (
      <PageStyled key={index}>{child}</PageStyled>
    )),
  );

  useEffect(() => {
    setTotalPage(childComponents.length);
  }, [childComponents]);

  return (
    sliderShow && (
      <SliderStyled>
        <p>
          {currentPage + 1} / {totalPage}
        </p>
        <SliderBox count={totalPage} currentPage={currentPage}>
          {childComponents}
        </SliderBox>
      </SliderStyled>
    )
  );
};

const SliderStyled = styled.div`
  width: 500px;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #000;
  padding: 20px;
`;

const SliderBox = styled.div<{ count: number; currentPage: number }>`
  width: ${({ count }) => `${500 * count}px`};
  height: 400px;
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  margin-left: ${({ currentPage }) => `-${500 * currentPage}px`};
`;

const PageStyled = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  margin-right: 40px;
`;

export default Slider;
