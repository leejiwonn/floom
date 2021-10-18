import styled from '@emotion/styled';
import { BasicColor, GradientColor } from '~/utils/color';

import CloseIcon from '../../public/assets/icons/icon-close.svg';
import PlusIcon from '../../public/assets/icons/icon-plus.svg';

interface Props {
  visible: boolean;
  onOpenButtonClick: () => void;
}

const OpenButton = ({ visible, onOpenButtonClick }: Props) => {
  return (
    <OpenButtonStyled onClick={onOpenButtonClick} visible={visible}>
      {visible ? (
        <CloseIcon stroke={BasicColor.WHITE} />
      ) : (
        <PlusIcon width="16px" height="16px" />
      )}
    </OpenButtonStyled>
  );
};

const OpenButtonStyled = styled.button<{ visible: boolean }>`
  width: 28px;
  height: 28px;
  padding: 4px;
  border: ${({ visible }) =>
    visible
      ? `8px solid ${BasicColor.BLUE10}`
      : `1px solid ${BasicColor.BLUE10}`};
  background: ${({ visible }) =>
    visible ? GradientColor.BLUE : 'rgba(236, 241, 250, 0.6)'};
  border-radius: 50%;

  :focus {
    outline: none;
  }
  svg {
    width: 100%;
  }
`;

export default OpenButton;
