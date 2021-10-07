import styled from '@emotion/styled';

import { TextColor } from '~/utils/color';
import { Font, Align, FontType } from '~/utils/font';

interface Props {
  value: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  font?: FontType;
  color?: TextColor;
  align?: Align;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

const TextInput = ({
  value,
  onChangeInput,
  placeholder,
  font = FontType.REGULAR_BODY,
  color = TextColor.PRIMARY,
  align = Align.LEFT,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: Props) => {
  const style = Font.getStyle(font);

  return (
    <TextInputStyled
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
    />
  );
};

const TextInputStyled = styled.input<{
  size: number;
  weight: number;
  color: string;
  align: string;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}>`
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  font-size: ${({ size }) => size + 'px'};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  margin-top: ${({ marginTop }) => marginTop + 'px'};
  margin-bottom: ${({ marginBottom }) => marginBottom + 'px'};
  margin-left: ${({ marginLeft }) => marginLeft + 'px'};
  margin-right: ${({ marginRight }) => marginRight + 'px'};
  background-color: #f6f6f6;
`;

export default TextInput;
