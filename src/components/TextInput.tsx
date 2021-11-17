import styled from '@emotion/styled';
import { useRef, useState, useEffect } from 'react';

import { BasicColor } from '~/utils/color';
import { Font, Align, FontType } from '~/utils/font';
import { LoaderBubbles } from './Loader';
import Typography from './Typography';

interface Props {
  value: string;
  maxLength: number;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  font?: FontType;
  color?: BasicColor;
  align?: Align;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  submitButton?: boolean;
  onSubmitButtonClick?: () => void;
  isLoading?: boolean;
}

const TextInput = ({
  value,
  maxLength,
  onChangeInput,
  placeholder,
  font = FontType.REGULAR_BODY,
  color = BasicColor.DARK100,
  align = Align.LEFT,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  submitButton,
  onSubmitButtonClick,
  isLoading,
}: Props) => {
  const style = Font.getStyle(font);

  const focusRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleOutFocus = (e: MouseEvent) => {
    const focus = focusRef.current;

    if (focus != null && !focus.contains(e.target as HTMLElement)) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutFocus);
    return () => {
      window.removeEventListener('click', handleOutFocus);
    };
  }, []);

  return (
    <TextInputStyled
      ref={focusRef}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      isFocus={isFocus}
    >
      <TextInputBox
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        size={style.size}
        weight={style.weight}
        color={color}
        align={align}
        submitButton={submitButton}
        onFocus={() => setIsFocus(true)}
      />
      {!submitButton && (
        <TextLength>
          <Typography font={FontType.LIGHT_CAPTION}>{value?.length}</Typography>
          <Typography
            font={FontType.LIGHT_CAPTION}
            marginLeft={0.4}
            marginRight={0.4}
          >
            {' '}
            /{' '}
          </Typography>
          <Typography font={FontType.LIGHT_CAPTION}>{maxLength}</Typography>
        </TextLength>
      )}
      {submitButton && (
        <SubmitButton
          onClick={(event) => {
            if (!isLoading) {
              event.stopPropagation();
              onSubmitButtonClick?.();
            }
          }}
        >
          {isLoading ? (
            <LoaderBubbles />
          ) : (
            <Typography
              tag="span"
              font={FontType.SEMI_BOLD_BODY}
              color={BasicColor.BLUE100}
            >
              등록
            </Typography>
          )}
        </SubmitButton>
      )}
    </TextInputStyled>
  );
};

const TextInputStyled = styled.div<{
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  isFocus: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: ${({ marginTop }) => marginTop + 'em'};
  margin-bottom: ${({ marginBottom }) => marginBottom + 'em'};
  margin-left: ${({ marginLeft }) => marginLeft + 'em'};
  margin-right: ${({ marginRight }) => marginRight + 'em'};
  background-color: ${BasicColor.GRAY20};
  border-radius: 0.8em;
  border: ${({ isFocus }) =>
    isFocus ? `1px solid ${BasicColor.BLUE80}` : '1px solid transparent'};
`;

const TextInputBox = styled.input<{
  size: number;
  weight: number;
  color: string;
  align: string;
  submitButton?: boolean;
}>`
  width: ${({ submitButton }) => (submitButton ? '85%' : '100%')};
  font-size: ${({ size }) => size + 'em'};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  background-color: ${BasicColor.GRAY20};
  border-radius: ${({ submitButton }) =>
    submitButton ? '0.8em 0 0 0.8em' : '0.8em'};
  padding: 3%;
  padding-right: 24%;

  :focus {
    outline: none;
  }
  ::placeholder {
    font-weight: 500;
    color: ${BasicColor.DARK40};
  }
`;

const TextLength = styled.div`
  position: absolute;
  right: 1.2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.GRAY20};
  border-radius: 0 0.8em 0.8em 0;
  pointer-events: none;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TextInput;
