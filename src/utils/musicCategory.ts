export const getMusicCategoryName = (category: string) => {
  if (category === 'calm') {
    return '차분한';
  } else if (category === 'chill out') {
    return '편안한';
  } else if (category === 'dark') {
    return '어두운';
  } else if (category === 'epic') {
    return '웅장한';
  } else if (category === 'happy') {
    return '신나는';
  } else if (category === 'inspirational') {
    return '영감을 주는';
  } else if (category === 'quiet') {
    return '조용한';
  } else if (category === 'romantic') {
    return '사랑스러운';
  }
};
