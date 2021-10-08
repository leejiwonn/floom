import styled from '@emotion/styled';
import { useState } from 'react';

import { useRoom } from '~/hooks/useRoom';
import StepA from '~/components/Guide/StepA';
import StepB from '~/components/Guide/StepB';
import StepC from '~/components/Guide/StepC';
import Typography from '~/components/Typography';
import { FontType } from '~/utils/font';
import { TextColor } from '~/utils/color';

interface Props {
  category: string;
  id: string;
}

// TODO : 방 정보 부분 컴포넌트로 변경 필요
const Play = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderShow, setSliderShow] = useState(true);
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState(10);
  const [isFull, setIsPull] = useState(false);

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <PlayStyled>
      <ObjectView>
        {currentPage > 0 && (
          <Typography marginTop={100} marginLeft={50} marginBottom={10}>
            목표는 {goal}!
          </Typography>
        )}
        {currentPage > 1 && (
          <Typography marginLeft={50}>{time}분 동안 할래요 :)</Typography>
        )}
        {currentPage >= 3 && (
          <>
            <Screen
              onClick={() => setIsPull((prev) => !prev)}
              isFull={isFull}
              url={data?.screen}
            />
            <EndButton href={`/detail?category=${category}&id=${id}`}>
              <Typography font={FontType.BOLD_TITLE_02} color={TextColor.WHITE}>
                체험 종료
              </Typography>
            </EndButton>
          </>
        )}
      </ObjectView>
      {currentPage < 3 && (
        <PlayView>
          <RoomInfo>
            <TitleDecoration />
            <Typography font={FontType.BOLD_BODY}>{data?.title}</Typography>
            <Typography
              font={FontType.REGULAR_BODY}
              color={TextColor.SECONDARY}
            >
              {data?.creator}
            </Typography>
          </RoomInfo>
          {sliderShow && (
            <StepStyled>
              <Typography font={FontType.BOLD_BODY} color={TextColor.SECONDARY}>
                STEP {currentPage + 1} / 3
              </Typography>
              {currentPage === 0 && (
                <StepA
                  onChangeGoalText={setGoal}
                  placeholderInfo="목표를 입력해주세요"
                  onNextPage={handleNextPage}
                />
              )}
              {currentPage === 1 && (
                <StepB
                  goal={goal}
                  time={time}
                  onChangeTime={setTime}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              )}
              {currentPage === 2 && (
                <StepC
                  goal={goal}
                  onSliderShow={setSliderShow}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              )}
            </StepStyled>
          )}
        </PlayView>
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

const ObjectView = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Screen = styled.button<{ isFull: boolean; url: string }>`
  width: ${({ isFull }) => (isFull ? '100%' : '200px')};
  height: ${({ isFull }) => (isFull ? '100%' : '200px')};
  position: absolute;
  top: ${({ isFull }) => (isFull ? '0' : '200px')};
  right: ${({ isFull }) => (isFull ? '0' : '100px')};
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: 50%;
`;

const PlayView = styled.div`
  width: 500px;
  height: 100%;
  position: absolute;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 40px 0;
  z-index: 2;
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

const StepStyled = styled.div`
  width: 500px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  padding: 40px 20px;
  background-color: #fff;
`;

const EndButton = styled.a`
  position: absolute;
  right: 30px;
  bottom: 30px;
  padding: 15px 60px;
  border-radius: 20px;
  background-color: #4f75ee;
`;

export default Play;
