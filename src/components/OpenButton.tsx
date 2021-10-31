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
        <CloseIcon width="2.2em" height="2.2em" stroke={BasicColor.WHITE} />
      ) : (
        <PlusIcon width="2.2em" height="2.2em" stroke={BasicColor.WHITE} />
      )}
    </OpenButtonStyled>
  );
};

const OpenButtonStyled = styled.button<{
  visible: boolean;
}>`
  width: 2.2em;
  height: 2.2em;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding: 0.4em;
  border: 0.1em solid ${BasicColor.BLUE10};
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
  }
`;

export default OpenButton;
