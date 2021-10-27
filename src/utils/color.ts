const BasicColor = {
  BLUE110: '#4F75EE',
  BLUE100: '#587BFA',
  BLUE90: '#728FF6',
  BLUE80: '#98AFF9',
  BLUE40: '#DFE9FB',
  BLUE20: '#E3ECFC',
  BLUE10: '#ECF1FA',

  GRAY100: '#C4C0B6',
  GRAY70: '#E1E1E1',
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
  GREEN20: '#D1ECE0',
  GREEN10: '#E8F5EF',

  RED100: '#F47053',
  RED70: '#F9AA98',
  RED30: '#FAEBE8',

  YELLOW100: '#FFEC44',
  YELLOW70: '#FFF6A1',
  YELLOW30: '#FFFBDA',

  LIGHT_GREEN100: '#7AD3A8',
  LIGHT_GREEN70: '#BCE9D3',
  LIGHT_GREEN30: '#E4F6EE',

  LIGHT_BLUE100: '#85B6FF',
  LIGHT_BLUE70: '#C2DAFF',
  LIGHT_BLUE30: '#E7F0FF',

  PURPLE100: '#B598F2',
  PURPLE70: '#DACCF9',
  PURPLE30: '#F0EAFC',

  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

const GradientColor = {
  BLUE: 'linear-gradient(to bottom right, #6A8AFF 0%, #4F73F3 100%)',
  GREEN: 'linear-gradient(to bottom right, #5CE8A4 0%, #3BD88D 100%)',
  GRAY: 'linear-gradient(180deg, #C4C0B6 0%, #ADA89C 100%)',
} as const;

const WallColor = {
  RED_ONE: BasicColor.RED100,
  RED_TWO: BasicColor.RED70,
  RED_THREE: BasicColor.RED30,
  YELLOW_ONE: BasicColor.YELLOW100,
  YELLOW_TWO: BasicColor.YELLOW70,
  YELLOW_THREE: BasicColor.YELLOW30,
  GREEN_ONE: BasicColor.LIGHT_GREEN100,
  GREEN_TWO: BasicColor.LIGHT_GREEN70,
  GREEN_THREE: BasicColor.LIGHT_GREEN30,
  BLUE_ONE: BasicColor.LIGHT_BLUE100,
  BLUE_TWO: BasicColor.LIGHT_BLUE70,
  BLUE_THREE: BasicColor.LIGHT_BLUE30,
  PURPLE_ONE: BasicColor.PURPLE100,
  PURPLE_TWO: BasicColor.PURPLE70,
  PURPLE_THREE: BasicColor.PURPLE30,
} as const;

type BasicColor = typeof BasicColor[keyof typeof BasicColor];
type GradientColor = typeof GradientColor[keyof typeof GradientColor];
type WallColor = typeof WallColor[keyof typeof WallColor];

export const getWallColor = (wallColor: string, light?: string) => {
  return light
    ? WallColor[(wallColor + `_${light}`) as keyof typeof WallColor]
    : WallColor[(wallColor + '_ONE') as keyof typeof WallColor];
};

export { BasicColor, GradientColor, WallColor };
