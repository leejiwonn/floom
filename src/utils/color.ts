const BasicColor = {
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

  YELLOW: '#FFCA42',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

const GradientColor = {
  BLUE: 'linear-gradient(to bottom right, #6A8AFF 0%, #4F73F3 100%)',
  GREEN: 'linear-gradient(to bottom right, #5CE8A4 0%, #3BD88D 100%)',
} as const;

type BasicColor = typeof BasicColor[keyof typeof BasicColor];
type GradientColor = typeof GradientColor[keyof typeof GradientColor];

export { BasicColor, GradientColor };
