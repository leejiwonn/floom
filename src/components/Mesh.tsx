import * as THREE from 'three';
import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  scale: [number, number, number];
}

const Mesh = ({ position, scale }: Props) => {
  const mesh = useRef<THREE.Mesh>();
  const [hovered, setHover] = useState(false);

  useFrame(() => (mesh.current!.rotation.x = mesh.current!.rotation.y += 0.01));

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={scale}
      onClick={(e) => console.log(e)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
};

export default Mesh;
