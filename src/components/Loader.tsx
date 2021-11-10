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

export const LoaderEyes = () => {
  return (
    <LoaderSpinnerStyled>
      <LoaderEyesStyled />
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

const LoaderEyesStyled = styled.div`
  display: inline-flex;
  width: 2.3em;
  height: 3em;
	border-radius: 50%;
	position: relative;
	box-shadow: inset 0 0 0 .2em ${BasicColor.BLUE100};
	margin-left: 2.4em;

	&:before {
		content: '';
		display: block;
		width: inherit;
		height: inherit;
		border-radius: 50%;
		position: absolute;
		right: 2.4em;
		top: 0;
		box-shadow: inset 0 0 0 .2em ${BasicColor.BLUE100};
	}

	&:after {
		content: "";
		border: 0.5em solid ${BasicColor.BLUE100};
		box-shadow: -2.4em 0 0 0 ${BasicColor.BLUE100};
		width: 0;
		height: 0;
		position: absolute;
		left: 50%;
		top: 30%;
		border-radius: 50%;
		animation: loader-eyes 1s linear infinite alternate;
	}
}

@keyframes loader-eyes {
	0% {
		left: .2em;
	}
	100% {
		left: 1.2em;
	}
`;
