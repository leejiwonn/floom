export const getCatecory = (category: string) => {
  if (category === 'work') {
    return '업무';
  } else if (category === 'study') {
    return '학습';
  } else if (category === 'rest') {
    return '휴식';
  }
};
