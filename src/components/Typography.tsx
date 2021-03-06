import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { BasicColor } from '~/utils/color';
import { Align, Font, FontType } from '~/utils/font';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface Props {
  tag?: TypographyTag;
  children: ReactNode;
  font?: FontType;
  color?: BasicColor;
  align?: Align;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  lineHeight?: number;
  textOverflow?: boolean;
  textOverflowSize?: number;
}

const Typography = ({
  tag = 'p',
  children,
  font = FontType.REGULAR_BODY,
  color = BasicColor.DARK100,
  align = Align.LEFT,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  lineHeight = 1.5,
  textOverflow,
  textOverflowSize = 2,
}: Props) => {
  const TagComponent = tag as TypographyTag;
  const style = Font.getStyle(font);

  const textOverflowStyled = css`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${textOverflowSize};
    -webkit-box-orient: vertical;
  `;

  return (
    <TagComponent
      style={{
        fontSize: style.size + 'rem',
        fontWeight: style.weight,
        color: color,
        textAlign: align,
        marginTop: marginTop + 'rem',
        marginBottom: marginBottom + 'rem',
        marginLeft: marginLeft + 'rem',
        marginRight: marginRight + 'rem',
        lineHeight: lineHeight,
        wordBreak: 'break-all',
      }}
      css={textOverflow && textOverflowStyled}
    >
      {children}
    </TagComponent>
  );
};

export default Typography;
