import styled from '@emotion/styled';
import { RoomWallColor, RoomLight } from '~/types/Room';
import { getWallColor } from '~/utils/color';

interface Props {
  wallColor: RoomWallColor;
  light: RoomLight;
}

const BackgroundFilter = ({ wallColor, light }: Props) => {
  return (
    <>
      <ObjectBlendOverlay
        wallColor={wallColor}
        light={light}
        data-html2canvas-ignore="true"
      />
      <ObjectBlendOverlay
        wallColor={wallColor}
        light={light}
        data-html2canvas-ignore="true"
      />
    </>
  );
};

const ObjectBlendOverlay = styled.div<{
  wallColor: RoomWallColor;
  light: RoomLight;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
  background-color: ${({ wallColor, light }) => getWallColor(wallColor, light)};
  mix-blend-mode: overlay;
  opacity: 0.7;
`;

export default BackgroundFilter;
