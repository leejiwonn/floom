const BlueColor = {
  BLUE100: '#587BFA',
  BLUE80: '#98AFF9',
  BLUE40: '#DFE9FB',
  BLUE20: '#E3ECFC',
} as const;

const GrayColor = {
  GRAY100: '#C4C0B6',
  GRAY60: '#EAE8E4',
  GRAY20: '#F9F9F9',
} as const;

const DarkColor = {
  DARK100: '#333333',
  DARK70: '#777777',
  DARK40: '#BDBDBD',
  DARK10: '#F0F0F0',
} as const;

const GreenColor = {
  GREEN100: '#5CE8A4',
  GREEN150: '#1D696D',
  GREEN10: '#E8F5EF',
} as const;

type BlueColor = typeof BlueColor[keyof typeof BlueColor];
type GrayColor = typeof GrayColor[keyof typeof GrayColor];
type DarkColor = typeof DarkColor[keyof typeof DarkColor];
type GreenColor = typeof GreenColor[keyof typeof GreenColor];

export { BlueColor, GrayColor, DarkColor, GreenColor };
