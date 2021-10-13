const BasicColor = {
  BLUE100: '#587BFA',
  BLUE90: '#728FF6',
  BLUE80: '#98AFF9',
  BLUE40: '#DFE9FB',
  BLUE20: '#E3ECFC',
  BLUE10: '#ECF1FA',

  GRAY100: '#C4C0B6',
  GRAY60: '#EAE8E4',
  GRAY20: '#F9F9F9',
  GRAY10: '#ECECEC',

  DARK100: '#333333',
  DARK70: '#777777',
  DARK40: '#BDBDBD',
  DARK10: '#F0F0F0',

  GREEN100: '#5CE8A4',
  GREEN150: '#1D696D',
  GREEN60: '#6EE0AA',
  GREEN10: '#E8F5EF',

  YELLOW: '#FFCA42',
  WHITE: '#FFFFFF',
} as const;

const GradientColor = {
  BLUE: 'linear-gradient(to bottom right, #6A8AFF 0%, #4F73F3 100%)',
  GREEN: 'linear-gradient(to bottom right, #5CE8A4 0%, #3BD88D 100%)',
} as const;

const BackgroundColor = {
  // TODO : 업데이트 필요
  DEPTH_L: BasicColor.DARK10,
  GRADIENT: GradientColor.BLUE,
  WHITE: BasicColor.WHITE,
} as const;

const TextColor = {
  // TODO : 업데이트 필요
  PRIMARY: BasicColor.DARK100,
  SECONDARY: BasicColor.DARK70,
  WHITE: BasicColor.WHITE,
  GREEN: BasicColor.GREEN100,
} as const;

const GraphicColor = {
  YELLOW: BasicColor.YELLOW,
  WHITE: BasicColor.WHITE,
  BLUE1_D: BasicColor.BLUE90,
  BLUE2_D: BasicColor.BLUE80,
  GRAY1_L: BasicColor.GRAY10,
  GRAY2_L: BasicColor.GRAY20,
  GREEN2_D: BasicColor.GREEN60,
  GRADIENT: GradientColor.GREEN,
} as const;

type BackgroundColor = typeof BackgroundColor[keyof typeof BackgroundColor];
type TextColor = typeof TextColor[keyof typeof TextColor];
type GraphicColor = typeof GraphicColor[keyof typeof GraphicColor];

export { BackgroundColor, TextColor, GraphicColor };
