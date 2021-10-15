import { BasicColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import Typography from '../Typography';
import StepTemplate from './StepTemplate';

interface Props {
  objective: string;
  onSliderShow: (value: boolean) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepC = ({ objective, onSliderShow, onPrevPage, onNextPage }: Props) => {
  const handleNextStepButtonClick = () => {
    onNextPage();
    onSliderShow(false);
  };

  return (
    <StepTemplate
      title={
        <>
          <Typography
            tag="span"
            font={FontType.EXTRA_BOLD_HEAD_03}
            color={BasicColor.BLUE100}
          >
            {objective}
          </Typography>
          에
          <br />
          몰입하며 이룰 작은 목표들을 적어주세요.
        </>
      }
      prevButtonText="이전"
      onPrevPage={onPrevPage}
      nextButtonText="이제 방을 체험해볼까요?"
      onNextPage={handleNextStepButtonClick}
    />
  );
};

export default StepC;
