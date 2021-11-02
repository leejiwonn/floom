import styled from '@emotion/styled';
import Loader from 'react-loader-spinner';

import { BasicColor } from '~/utils/color';

interface Props {
  mode?: 'light' | 'dark';
}

export const LoaderSpinner = ({ mode = 'light' }: Props) => {
  return (
    <LoaderSpinnerStyled>
      <Loader
        type="Oval"
        color={mode === 'light' ? BasicColor.BLUE100 : BasicColor.WHITE}
        width={24}
        height={24}
        timeout={10000}
      />
    </LoaderSpinnerStyled>
  );
};

const LoaderSpinnerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;
