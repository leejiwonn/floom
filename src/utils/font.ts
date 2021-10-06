const Weight = {
  EXTRA_BOLD: 800,
  BOLD: 700,
  REGULAR: 400,
  LIGHT: 300,
} as const;

const FontSize = {
  SIZE_HEAD_01: 64,
  SIZE_HEAD_02: 42,
  SIZE_HEAD_03: 24,
  SIZE_TITLE_01: 21,
  SIZE_TITLE_02: 18,
  SIZE_BODY: 16,
  SIZE_CAPTION: 14,
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

  BOLD_TITLE_01: 'BOLD_TITLE_01',
  BOLD_TITLE_02: 'BOLD_TITLE_02',
  BOLD_BODY: 'BOLD_BODY',

  REGULAR_TITLE_01: 'REGULAR_TITLE_01',
  REGULAR_BODY: 'REGULAR_BODY',

  LIGHT_TITLE_02: 'LIGHT_TITLE_02',
  LIGHT_BODY: 'LIGHT_BODY',
  LIGHT_CAPTION: 'LIGHT_CAPTION',
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
      case FontType.EXTRA_BOLD_HEAD_01: {
        return FontSize.SIZE_HEAD_01;
      }

      case FontType.EXTRA_BOLD_HEAD_02: {
        return FontSize.SIZE_HEAD_02;
      }

      case FontType.BOLD_TITLE_01:
      case FontType.REGULAR_TITLE_01: {
        return FontSize.SIZE_TITLE_01;
      }

      case FontType.BOLD_TITLE_02:
      case FontType.LIGHT_TITLE_02: {
        return FontSize.SIZE_TITLE_02;
      }

      case FontType.BOLD_BODY:
      case FontType.REGULAR_BODY:
      case FontType.LIGHT_BODY: {
        return FontSize.SIZE_BODY;
      }

      case FontType.LIGHT_CAPTION: {
        return FontSize.SIZE_CAPTION;
      }
    }

    return FontSize.SIZE_BODY;
  };

  const getWeight = (font: FontType) => {
    switch (font) {
      case FontType.EXTRA_BOLD_HEAD_01:
      case FontType.EXTRA_BOLD_HEAD_02:
      case FontType.EXTRA_BOLD_HEAD_03: {
        return Weight.EXTRA_BOLD;
      }

      case FontType.BOLD_TITLE_01:
      case FontType.BOLD_TITLE_02:
      case FontType.BOLD_BODY: {
        return Weight.BOLD;
      }

      case FontType.REGULAR_TITLE_01:
      case FontType.REGULAR_BODY: {
        return Weight.REGULAR;
      }

      case FontType.LIGHT_TITLE_02:
      case FontType.LIGHT_BODY:
      case FontType.LIGHT_CAPTION: {
        return Weight.LIGHT;
      }
    }

    return Weight.REGULAR;
  };
}

export { Font, FontType, Align };
