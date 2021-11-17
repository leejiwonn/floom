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
        <PlusIcon
          width="2.2em"
          height="2.2em"
          stroke={BasicColor.WHITE}
          className="icon-plus"
        />
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
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  padding: 0.4em;
  border: 0.1em solid ${BasicColor.BLUE10};
  box-sizing: content-box;
  background: ${({ visible }) =>
    visible ? GradientColor.BLUE : 'rgba(236, 241, 250, 0.6)'};
  border-radius: 50%;
  transition: 0.1s;

  :hover {
    width: 2.7em;
    height: 2.7em;
    top: -0.25em;
    left: -0.25em;
    background-color: ${BasicColor.WHITE};
    border: 0.1em solid ${BasicColor.BLUE40};
    transition: 0.1s;

    .icon-plus {
      stroke: ${BasicColor.BLUE100};
    }
  }
  :focus {
    outline: none;
  }
  svg {
    width: 100%;
  }
`;

export default OpenButton;
