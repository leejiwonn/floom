import styled from '@emotion/styled';

import { BasicColor } from '~/utils/color';
import { Font, Align, FontType } from '~/utils/font';
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
}: Props) => {
  const style = Font.getStyle(font);

  return (
    <TextInputStyled
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
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
        <SubmitButton onClick={onSubmitButtonClick}>
          <Typography
            tag="span"
            font={FontType.SEMI_BOLD_BODY}
            color={BasicColor.BLUE100}
          >
            등록
          </Typography>
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
`;

const TextLength = styled.div`
  position: absolute;
  right: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.GRAY20};
  border-radius: 0 0.8em 0.8em 0;
  padding: 1em;
`;

const SubmitButton = styled.button`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.GRAY20};
  border-radius: 0 0.8em 0.8em 0;
  padding: 3%;
`;

export default TextInput;
