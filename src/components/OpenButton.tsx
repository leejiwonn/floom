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
        <PlusIcon width="22px" height="22px" />
      )}
    </OpenButtonStyled>
  );
};

const OpenButtonStyled = styled.button<{
  visible: boolean;
}>`
  width: 22px;
  height: 22px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border: 1px solid ${BasicColor.BLUE10};
  box-sizing: content-box;
  background: ${({ visible }) =>
    visible ? GradientColor.BLUE : 'rgba(236, 241, 250, 0.6)'};
  border-radius: 50%;
  transition: 0.1s;

  :focus {
    outline: none;
  }
  svg {
    width: 100%;
    pointer-events: none;
  }
`;

export default OpenButton;
