const Weight = {
  EXTRA_BOLD: 800,
  BOLD: 700,
  SEMI_BOLD: 600,
  REGULAR: 400,
  LIGHT: 300,
} as const;

const FontSize = {
  SIZE_HEAD_01: 6.4,
  SIZE_HEAD_02: 3.4,
  SIZE_HEAD_03: 2.4,
  SIZE_TITLE_01: 2.1,
  SIZE_TITLE_02: 1.8,
  SIZE_BODY: 1.6,
  SIZE_CAPTION: 1.4,
  SIZE_CAPTION_X: 1.1,
  SIZE_GATE_HEAD_01: 4.4,
  SIZE_GATE_HEAD_02: 3.6,
} as const;

const Align = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

const FontType = {
  EXTRA_BOLD_HEAD_01: 'EXTRA_BOLD_HEAD_01',
  EXTRA_BOLD_HEAD_02: 'EXTRA_BOLD_HEAD_02',
  EXTRA_BOLD_HEAD_03: 'EXTRA_BOLD_HEAD_03',
  EXTRA_BOLD_TITLE_01: 'EXTRA_BOLD_TITLE_01',
  EXTRA_BOLD_TITLE_02: 'EXTRA_BOLD_TITLE_02',
  EXTRA_BOLD_BODY: 'EXTRA_BOLD_BODY',
  EXTRA_BOLD_CAPTION: 'EXTRA_BOLD_CAPTION',
  EXTRA_BOLD_GATE_HEAD_01: 'EXTRA_BOLD_GATE_HEAD_01',

  BOLD_TITLE_01: 'BOLD_TITLE_01',
  BOLD_TITLE_02: 'BOLD_TITLE_02',
  BOLD_BODY: 'BOLD_BODY',
  BOLD_CAPTION: 'BOLD_CAPTION',
  BOLD_CAPTION_X: 'BOLD_CAPTION_X',
  BOLD_GATE_HEAD_02: 'BOLD_GATE_HEAD_02',

  SEMI_BOLD_HEAD_03: 'SEMI_BOLD_HEAD_03',
  SEMI_BOLD_TITLE_01: 'SEMI_BOLD_TITLE_01',
  SEMI_BOLD_TITLE_02: 'SEMI_BOLD_TITLE_02',
  SEMI_BOLD_BODY: 'SEMI_BOLD_BODY',
  SEMI_BOLD_CAPTION: 'SEMI_BOLD_CAPTION',

  REGULAR_TITLE_01: 'REGULAR_TITLE_01',
  REGULAR_TITLE_02: 'REGULAR_TITLE_02',
  REGULAR_BODY: 'REGULAR_BODY',
  REGULAR_CAPTION: 'REGULAR_CAPTION',

  LIGHT_TITLE_01: 'LIGHT_TITLE_01',
  LIGHT_TITLE_02: 'LIGHT_TITLE_02',
  LIGHT_BODY: 'LIGHT_BODY',
  LIGHT_CAPTION: 'LIGHT_CAPTION',
  LIGHT_CAPTION_X: 'LIGHT_CAPTION_X',
} as const;

type Align = typeof Align[keyof typeof Align];
type FontType = typeof FontType[keyof typeof FontType];
type FontStyle = { size: number; weight: number };

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Font {
  export const getStyle = (font: FontType): FontStyle => {
    return {
      weight: getWeight(font),
      size: getSize(font),
    };
  };

  const getSize = (font: FontType) => {
    switch (font) {
      case FontType.EXTRA_BOLD_GATE_HEAD_01: {
        return FontSize.SIZE_GATE_HEAD_01;
      }

      case FontType.BOLD_GATE_HEAD_02: {
        return FontSize.SIZE_GATE_HEAD_02;
      }

      case FontType.EXTRA_BOLD_HEAD_01: {
        return FontSize.SIZE_HEAD_01;
      }

      case FontType.EXTRA_BOLD_HEAD_02: {
        return FontSize.SIZE_HEAD_02;
      }

      case FontType.EXTRA_BOLD_HEAD_03:
      case FontType.SEMI_BOLD_HEAD_03: {
        return FontSize.SIZE_HEAD_03;
      }

      case FontType.EXTRA_BOLD_TITLE_01:
      case FontType.BOLD_TITLE_01:
      case FontType.SEMI_BOLD_TITLE_01:
      case FontType.REGULAR_TITLE_01:
      case FontType.LIGHT_TITLE_01: {
        return FontSize.SIZE_TITLE_01;
      }

      case FontType.EXTRA_BOLD_TITLE_02:
      case FontType.BOLD_TITLE_02:
      case FontType.SEMI_BOLD_TITLE_02:
      case FontType.REGULAR_TITLE_02:
      case FontType.LIGHT_TITLE_02: {
        return FontSize.SIZE_TITLE_02;
      }

      case FontType.EXTRA_BOLD_BODY:
      case FontType.BOLD_BODY:
      case FontType.SEMI_BOLD_BODY:
      case FontType.REGULAR_BODY:
      case FontType.LIGHT_BODY: {
        return FontSize.SIZE_BODY;
      }

      case FontType.EXTRA_BOLD_CAPTION:
      case FontType.BOLD_CAPTION:
      case FontType.SEMI_BOLD_CAPTION:
      case FontType.REGULAR_CAPTION:
      case FontType.LIGHT_CAPTION: {
        return FontSize.SIZE_CAPTION;
      }

      case FontType.BOLD_CAPTION_X:
      case FontType.LIGHT_CAPTION_X: {
        return FontSize.SIZE_CAPTION_X;
      }
    }

    return FontSize.SIZE_BODY;
  };

  const getWeight = (font: FontType) => {
    switch (font) {
      case FontType.EXTRA_BOLD_GATE_HEAD_01:
      case FontType.EXTRA_BOLD_HEAD_01:
      case FontType.EXTRA_BOLD_HEAD_02:
      case FontType.EXTRA_BOLD_HEAD_03:
      case FontType.EXTRA_BOLD_TITLE_01:
      case FontType.EXTRA_BOLD_TITLE_02:
      case FontType.EXTRA_BOLD_BODY:
      case FontType.EXTRA_BOLD_CAPTION: {
        return Weight.EXTRA_BOLD;
      }

      case FontType.BOLD_GATE_HEAD_02:
      case FontType.BOLD_TITLE_01:
      case FontType.BOLD_TITLE_02:
      case FontType.BOLD_BODY:
      case FontType.BOLD_CAPTION:
      case FontType.BOLD_CAPTION_X: {
        return Weight.BOLD;
      }

      case FontType.SEMI_BOLD_HEAD_03:
      case FontType.SEMI_BOLD_TITLE_01:
      case FontType.SEMI_BOLD_TITLE_02:
      case FontType.SEMI_BOLD_BODY:
      case FontType.SEMI_BOLD_CAPTION: {
        return Weight.BOLD;
      }

      case FontType.REGULAR_TITLE_01:
      case FontType.REGULAR_TITLE_02:
      case FontType.REGULAR_BODY:
      case FontType.REGULAR_CAPTION: {
        return Weight.REGULAR;
      }

      case FontType.LIGHT_TITLE_01:
      case FontType.LIGHT_TITLE_02:
      case FontType.LIGHT_BODY:
      case FontType.LIGHT_CAPTION:
      case FontType.LIGHT_CAPTION_X: {
        return Weight.LIGHT;
      }
    }

    return Weight.REGULAR;
  };
}

export { Font, FontType, Align };
