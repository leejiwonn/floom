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

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>...</p>;
  }

  return (
    <PlayStyled>
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
      <PlayView>
        {currentPage < 5 && (
          <RoomInfo>
            <TitleDecoration />
            <Title>{data.title}</Title>
            <Creator>{data.creator}</Creator>
          </RoomInfo>
        )}
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
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
          <StepC onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
          <StepD
            light={data.light}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
          <StepE onSliderShow={setSliderShow} onNextPage={handleNextPage} />
        </Slider>
      </PlayView>
      {currentPage >= 5 && (
        <EndButton href={`/detail?category=${category}&id=${id}`}>
          체험 종료
        </EndButton>
      )}
    </PlayStyled>
  );
};

const PlayStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  background-color: #f5f2ed;
`;

const ObjectStyled = styled.div`
  width: 100%;
  height: auto;
  margin-top: 100px;
  margin-left: 40px;

  p {
    margin-bottom: 10px;
  }
`;

const PlayView = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 60px;
  padding: 40px 0;
`;

const RoomInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const TitleDecoration = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  left: -5px;
  background-color: #5ce8a4;
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const Creator = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #777;
`;

const EndButton = styled.a`
  position: absolute;
  right: 30px;
  bottom: 30px;
  padding: 15px 60px;
  border-radius: 20px;
  background-color: #4f75ee;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
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
