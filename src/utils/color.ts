const BasicColor = {
  BLUE100: '#587BFA',
  BLUE80: '#98AFF9',
  BLUE40: '#DFE9FB',
  BLUE20: '#E3ECFC',

  GRAY100: '#C4C0B6',
  GRAY60: '#EAE8E4',
  GRAY20: '#F9F9F9',

  DARK100: '#333333',
  DARK70: '#777777',
  DARK40: '#BDBDBD',
  DARK10: '#F0F0F0',

  GREEN100: '#5CE8A4',
  GREEN150: '#1D696D',
  GREEN10: '#E8F5EF',

  YELLOW: '#FFCA42',
  WHITE: '#FFFFFF',
} as const;

const BackgroundColor = {
  // TODO : 업데이트 필요
  DEPTH_L: BasicColor.DARK10,
} as const;

const TextColor = {
  // TODO : 업데이트 필요
  PRIMARY: BasicColor.DARK100,
  SECONDARY: BasicColor.DARK70,
  WHITE: BasicColor.WHITE,
} as const;

const GraphicColor = {
  YELLOW: BasicColor.YELLOW,
} as const;

type BackgroundColor = typeof BackgroundColor[keyof typeof BackgroundColor];
type TextColor = typeof TextColor[keyof typeof TextColor];
type GraphicColor = typeof GraphicColor[keyof typeof GraphicColor];

export { BackgroundColor, TextColor, GraphicColor };
