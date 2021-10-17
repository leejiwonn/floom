import styled from '@emotion/styled';

import { BasicColor } from '~/utils/color';
import { Font, Align, FontType } from '~/utils/font';
import Typography from './Typography';

interface Props {
  value: string;
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
    <TextInputStyled>
      <TextInputBox
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        size={style.size}
        weight={style.weight}
        color={color}
        align={align}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        submitButton={submitButton}
      />
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

const TextInputStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextInputBox = styled.input<{
  size: number;
  weight: number;
  color: string;
  align: string;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  submitButton: boolean;
}>`
  width: ${({ submitButton }) => (submitButton ? '85%' : '100%')};
  font-size: ${({ size }) => size + 'px'};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  margin-top: ${({ marginTop }) => marginTop + 'px'};
  margin-bottom: ${({ marginBottom }) => marginBottom + 'px'};
  margin-left: ${({ marginLeft }) => marginLeft + 'px'};
  margin-right: ${({ marginRight }) => marginRight + 'px'};
  background-color: ${BasicColor.GRAY20};
  border-radius: ${({ submitButton }) =>
    submitButton ? '10px 0 0 10px' : '10px'};
  padding: 3%;

  :focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BasicColor.GRAY20};
  border-radius: 0 10px 10px 0;
  padding: 3%;
`;

export default TextInput;
