import StepTemplate from './StepTemplate';

interface Props {
  goal: string;
  onSliderShow: (value: boolean) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const StepC = ({ goal, onSliderShow, onPrevPage, onNextPage }: Props) => {
  const handleNextStepButtonClick = () => {
    onNextPage();
    onSliderShow(false);
  };

  return (
    <StepTemplate
      subTitle="이제 마지막이예요!"
      title={<>{goal}을(를) 위해 작은 목표를 작성해보세요.</>}
      prevButtonText="이전"
      onPrevPage={onPrevPage}
      nextButtonText="이제 방을 체험해볼까요?"
      onNextPage={handleNextStepButtonClick}
    />
  );
};

export default StepC;
