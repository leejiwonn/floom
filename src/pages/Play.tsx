import styled from '@emotion/styled';
import { useState } from 'react';
import ReactPlayer from 'react-player';

import { useRoom } from '../hooks/useRoom';
import { GetServerSideProps } from 'next';
import Slider from '../components/Slider';

import StepA from '../components/Guide/StepA';
import StepB from '../components/Guide/StepB';
import StepC from '../components/Guide/StepC';
import StepD from '../components/Guide/StepD';
import StepE from '../components/Guide/StepE';

interface Props {
  category: string;
  id: string;
}

const Play = ({ category, id }: Props) => {
  const { data, isLoading } = useRoom(category, id);
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderShow, setSliderShow] = useState(true);
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState(10);
  const [play, setPlay] = useState(false);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>...</p>;
  }

  return (
    <PlayStyled>
      <PlayView>
        <ObjectStyled>
          {currentPage > 0 && <p>목표는 {goal}!</p>}
          {currentPage > 1 && <p>{time}분 동안 할래요 :)</p>}
          {currentPage >= 2 && (
            <ReactPlayer
              url={[...data.music]}
              width="300px"
              height="200px"
              playing={play}
            />
          )}
        </ObjectStyled>
        <Slider currentPage={currentPage} sliderShow={sliderShow}>
          <StepA
            goal={goal}
            onChangeGoalText={setGoal}
            placeholderInfo="목표를 입력해주세요"
            onNextPage={handleNextPage}
          />
          <StepB
            time={time}
            onChangePlay={setPlay}
            onChangeTime={setTime}
            onNextPage={handleNextPage}
          />
          <StepC onNextPage={handleNextPage} />
          <StepD light={data.light} onNextPage={handleNextPage} />
          <StepE onSliderShow={setSliderShow} onNextPage={handleNextPage} />
        </Slider>
      </PlayView>
      {currentPage >= 5 && (
        <EndButton href={`/detail?category=${category}&id=${id}`}>
          종료하기
        </EndButton>
      )}
    </PlayStyled>
  );
};

const PlayStyled = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  position: relative;
`;

const PlayView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const ObjectStyled = styled.div``;

const EndButton = styled.a`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  border: 1px solid #000;
  padding: 10px 30px;
`;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const category = query.category as string;
  const id = query.id as string;

  if (category == null || id == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      category,
      id,
    },
  };
};

export default Play;
