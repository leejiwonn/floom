import styled from '@emotion/styled';
import { useState } from 'react';

import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from './Typography';

import OpenIcon from '../../public/assets/icons/icon-open.svg';

interface Props {
  title: string;
  titleIcon: React.ReactElement;
  content: React.ReactNode;
  isDrop?: boolean;
  isToggle?: boolean;
  setIsToggle?: () => void;
  required?: boolean;
}

const CreateInfoItem = ({
  title,
  titleIcon,
  content,
  isDrop = false,
  isToggle = false,
  setIsToggle,
  required = false,
}: Props) => {
  const [visibleInfo, setVisibleInfo] = useState<boolean>(
    isDrop || isToggle ? false : true,
  );

  const handleItemClick = () => {
    (isDrop || isToggle) && setVisibleInfo((prev) => !prev);
    isToggle && setIsToggle?.();
  };

  return (
    <CreateInfoItemStyled>
      <CreateInfoItemTitle
        onClick={handleItemClick}
        isDrop={isDrop}
        isToggle={isToggle}
      >
        <CreateInfoItemTitleLeft>
          <CreateInfoItemIcon>{titleIcon}</CreateInfoItemIcon>
          <Typography font={FontType.SEMI_BOLD_TITLE_02} marginLeft={8}>
            {title}
          </Typography>
          {required && (
            <Typography
              font={FontType.SEMI_BOLD_TITLE_02}
              color={BasicColor.GREEN100}
              marginLeft={4}
            >
              *
            </Typography>
          )}
        </CreateInfoItemTitleLeft>
        {isDrop && (
          <OpenIconStyled show={visibleInfo}>
            <OpenIcon stroke={BasicColor.DARK100} />
          </OpenIconStyled>
        )}
        {isToggle && (
          <ToggleStyled active={visibleInfo}>
            <ToggleCircle active={visibleInfo} />
          </ToggleStyled>
        )}
      </CreateInfoItemTitle>
      {visibleInfo && <CreateInfoItemContent>{content}</CreateInfoItemContent>}
    </CreateInfoItemStyled>
  );
};

const CreateInfoItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-bottom: 1px solid ${BasicColor.GRAY70};
`;

const CreateInfoItemTitle = styled.button<{
  isDrop: boolean;
  isToggle: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  pointer-events: ${({ isDrop, isToggle }) =>
    isDrop || isToggle ? 'pointer' : 'none'};
`;

const CreateInfoItemTitleLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CreateInfoItemIcon = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.BLUE10};
  border-radius: 50%;
`;

const OpenIconStyled = styled.span<{ show: boolean }>`
  transform: ${({ show }) => (show ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const CreateInfoItemContent = styled.div`
  margin-top: 10px;
`;

const ToggleStyled = styled.div<{ active: boolean }>`
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${({ active }) =>
    active ? BasicColor.BLUE100 : BasicColor.DARK40};
  border-radius: 38px;
  transition: 0.3s;
`;

const ToggleCircle = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  position: relative;
  left: ${({ active }) => (active ? 34 : 5) + 'px'};
  background-color: ${BasicColor.WHITE};
  border-radius: 50%;
  transition: 0.3s;
`;

export default CreateInfoItem;
