import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';

import Typography from '~/components/Typography';
import Obj from '~/components/Obj';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { useRoom } from '~/hooks/useRoom';

interface Props {
  category: string;
  id: string;
}

const Detail = ({ category, id }: Props) => {
  const { data } = useRoom(category, id);

  return (
    <DetailStyled>
      <TitleStyled>
        <TitleDecoration />
        <Typography font={FontType.BOLD_BODY}>{data?.title}</Typography>
        <Typography font={FontType.REGULAR_BODY} color={TextColor.SECONDARY}>
          {data?.creator}
        </Typography>
      </TitleStyled>
      <ObjectStyled>
        <Canvas
          camera={{ position: [0, 0, 240], fov: 80 }}
          style={{
            width: '100%',
            height: '100%',
            top: 40,
          }}
        >
          <ambientLight />
          <pointLight intensity={1.5} position={[200, 250, 50]} />
          <Obj url="/assets/objs/speaker.obj" position={[-240, -60, 0]} />
          <Obj url="/assets/objs/light.obj" position={[0, 0, 0]} />
          <Obj url="/assets/objs/photo.obj" position={[220, -50, 0]} />
        </Canvas>
      </ObjectStyled>
      <PlayButton href={`/play?category=${category}&id=${id}`}>
        <Typography
          tag="span"
          font={FontType.BOLD_TITLE_02}
          color={TextColor.WHITE}
        >
          체험해볼래요!
        </Typography>
      </PlayButton>
    </DetailStyled>
  );
};

const DetailStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  background-color: #f5f2ed;
`;

const TitleStyled = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 20px 30px;
  border-radius: 20px;
  background-color: #fff;
`;

const TitleDecoration = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  left: -5px;
  border-radius: 10px;
  background-color: #5ce8a4;
`;

const ObjectStyled = styled.div`
  width: 100%;
  height: 400px;
`;

const PlayButton = styled.a`
  padding: 15px 60px;
  border-radius: 20px;
  background-color: #587bfa;
`;

export default Detail;
