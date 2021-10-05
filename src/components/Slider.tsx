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
        <SliderTitle>
          STEP {currentPage + 1} / {totalPage}
        </SliderTitle>
        <SliderBox count={totalPage} currentPage={currentPage}>
          {childComponents}
        </SliderBox>
      </SliderStyled>
    )
  );
};

const SliderStyled = styled.div`
  width: 500px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  padding: 40px 20px;
  background-color: #fff;
`;

const SliderTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #ccc;
`;

const SliderBox = styled.div<{ count: number; currentPage: number }>`
  width: ${({ count }) => `${500 * count}px`};
  display: flex;
  flex-direction: row;
  margin-left: ${({ currentPage }) => `-${500 * currentPage}px`};
`;

const PageStyled = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 40px;
`;

export default Slider;
