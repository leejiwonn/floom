import styled from '@emotion/styled';
import Loader from 'react-loader-spinner';

import { BasicColor } from '~/utils/color';

interface LoaderSpinnerProps {
  mode?: 'light' | 'dark';
}

export const LoaderSpinner = ({ mode = 'light' }: LoaderSpinnerProps) => {
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

interface LoaderBubblesProps {
  mode?: 'light' | 'dark';
}

export const LoaderBubbles = ({ mode = 'light' }: LoaderBubblesProps) => {
  return (
    <LoaderBubblesStyled>
      <LoaderBubblesView>
        <LoaderBubbleItem>
          <LoaderBubble mode={mode} index={0} />
        </LoaderBubbleItem>
        <LoaderBubbleItem>
          <LoaderBubble mode={mode} index={1} />
        </LoaderBubbleItem>
        <LoaderBubbleItem>
          <LoaderBubble mode={mode} index={2} />
        </LoaderBubbleItem>
      </LoaderBubblesView>
    </LoaderBubblesStyled>
  );
};

const LoaderBubblesStyled = styled.div`
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  animation-play-state: paused;

  :hover {
    animation-play-state: running;
    opacity: 1;
  }
`;

const LoaderBubblesView = styled.div``;

const LoaderBubbleItem = styled.div`
  display: inline-flex;
  width: 0.6em;
  height: 0.6em;
  margin: 0 0.5em;
`;

const LoaderBubble = styled.div<{ mode: 'light' | 'dark'; index: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ mode }) =>
    mode === 'light' ? BasicColor.BLUE100 : BasicColor.WHITE};
  transform-origin: 50% 50%;
  transition: 0.1s;
  animation: bubble 1.2s -0.6s infinite ease-out;
  animation-delay: ${({ index }) => (index === 1 ? '-0.3s' : 0)};

  @keyframes bubble {
    0% {
      transform: scale(0.6);
      opacity: 0.4;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.6);
      opacity: 0.4;
    }
  }
`;

export const LoaderEyes = () => {
  return (
    <LoaderSpinnerStyled>
      <LoaderEyesStyled />
    </LoaderSpinnerStyled>
  );
};

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
