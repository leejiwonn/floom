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

  GREEN150: '#1D696D',
  GREEN120: '#49C294',
  GREEN100: '#5CE8A4',
  GREEN60: '#6EE0AA',
  GREEN20: '#D1ECE0',
  GREEN10: '#E8F5EF',

  YELLOW: '#FFEC44',

  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

const GradientColor = {
  BLUE: 'linear-gradient(to bottom right, #6A8AFF 0%, #4F73F3 100%)',
  GREEN: 'linear-gradient(to bottom right, #5CE8A4 0%, #3BD88D 100%)',
  GRAY: 'linear-gradient(180deg, #C4C0B6 0%, #ADA89C 100%)',
} as const;

const WallColor = {
  RED_ONE: 'rgba(242, 109, 112, 0.6)',
  RED_TWO: 'rgba(222, 78, 76, 0.9)',
  RED_THREE: 'rgba(191, 19, 18, 1)',
  YELLOW_ONE: 'rgba(242, 109, 112, 0.6)',
  YELLOW_TWO: 'rgba(222, 78, 76, 0.9)',
  YELLOW_THREE: 'rgba(191, 19, 18, 1)',
  GREEN_ONE: 'rgba(242, 109, 112, 0.6)',
  GREEN_TWO: 'rgba(222, 78, 76, 0.9)',
  GREEN_THREE: 'rgba(191, 19, 18, 1)',
  BLUE_ONE: 'rgba(242, 109, 112, 0.6)',
  BLUE_TWO: 'rgba(222, 78, 76, 0.9)',
  BLUE_THREE: 'rgba(191, 19, 18, 1)',
  PURPLE_ONE: 'rgba(242, 109, 112, 0.6)',
  PURPLE_TWO: 'rgba(222, 78, 76, 0.9)',
  PURPLE_THREE: 'rgba(191, 19, 18, 1)',
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
