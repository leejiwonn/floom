import { TextColor } from '~/utils/color';
import { Font, Align, FontType } from '~/utils/font';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface Props {
  tag?: TypographyTag;
  children: React.ReactNode;
  font?: FontType;
  color?: TextColor;
  align?: Align;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  lineHeight?: number;
}

const Typography = ({
  tag = 'p',
  children,
  font = FontType.REGULAR_BODY,
  color = TextColor.PRIMARY,
  align = Align.LEFT,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  lineHeight = 1.5,
}: Props) => {
  const TagComponent = tag as TypographyTag;
  const style = Font.getStyle(font);

  return (
    <TagComponent
      style={{
        fontSize: style.size,
        fontWeight: style.weight,
        color: color,
        textAlign: align,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        lineHeight: lineHeight,
      }}
    >
      {children}
    </TagComponent>
  );
};

export default Typography;