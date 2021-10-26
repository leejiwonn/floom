import EMOJI from '~/constants/emoji';

export const getCategoryEmoji = (category: string) => {
  if (category === '학습') {
    return EMOJI.STUDY;
  } else if (category === '업무') {
    return EMOJI.WORK;
  } else if (category === '휴식') {
    return EMOJI.REST;
  }
};
