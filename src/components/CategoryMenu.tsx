import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { MusicCategory } from '~/types/MusicCategory';
import { RoomCategory } from '~/types/RoomCategory';
import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';

import SidebarIcon from '../../public/assets/icons/icon-sidebar.svg';

interface Props {
  categories: MusicCategory[] | RoomCategory[];
  category: MusicCategory | RoomCategory;
  setCategory(value: MusicCategory | RoomCategory): void;
}

const CategoryMenu = ({ categories, category, setCategory }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (categories.length < 3) {
      return;
    }

    setCurrentIndex(0);
    setCategory(categories[currentIndex]);
    setCurrentWidth((categories.length - 2) * 108);
  }, []);

  const handlePrevButtonClick = () => {
    setCategory(categories[currentIndex - 1]);
    setCurrentWidth((prev) => prev + 108);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNextButtonClick = () => {
    setCategory(categories[currentIndex + 1]);
    setCurrentWidth((prev) => prev - 108);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <CategoryStyled>
      <CategorySlider width={currentWidth}>
        {categories?.map((value, index) => (
          <CategoryItem
            key={index}
            onClick={() => {
              setCategory(value);
              setCurrentWidth((prev) => prev + (currentIndex - index) * 108);
              setCurrentIndex(index);
            }}
            active={value.id === category?.id}
          >
            <Typography
              font={
                value.id === category?.id
                  ? FontType.SEMI_BOLD_BODY
                  : FontType.REGULAR_BODY
              }
              color={
                value.id === category?.id
                  ? BasicColor.WHITE
                  : BasicColor.GREEN150
              }
            >
              {value.name}
            </Typography>
          </CategoryItem>
        ))}
        {categories?.length > 2 && (
          <>
            {currentIndex !== 0 && (
              <CategoryLeftSidebar onClick={handlePrevButtonClick}>
                <SidebarIcon />
              </CategoryLeftSidebar>
            )}
            {currentIndex !== categories?.length - 1 && (
              <CategoryRightSidebar onClick={handleNextButtonClick}>
                <SidebarIcon />
              </CategoryRightSidebar>
            )}
          </>
        )}
      </CategorySlider>
    </CategoryStyled>
  );
};

const CategoryStyled = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
`;

const CategorySlider = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${({ width }) => width + 'px'};
  transition: 0.2s;
`;

const CategoryItem = styled.button<{ active: boolean }>`
  width: 100px;
  display: inline-flex;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 52px;
  background-color: ${({ active }) =>
    active ? BasicColor.GREEN100 : BasicColor.GREEN10};
  padding: 6px 0;
  margin: 0 4px;
`;

const CategoryLeftSidebar = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  z-index: 3;

  svg {
    transform: rotate(180deg);
  }
`;

const CategoryRightSidebar = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.WHITE};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  z-index: 3;
`;

export default CategoryMenu;
