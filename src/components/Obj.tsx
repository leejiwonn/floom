import * as THREE from 'three';
import { useMemo, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

interface Props {
  url: string;
  position: [number, number, number];
}

const Obj = ({ url, position }: Props) => {
  const [obj, setObj] = useState<THREE.Group>();
  useMemo(() => new OBJLoader().load(url, setObj), [url]);

  return obj ? <primitive object={obj} position={position} /> : null;
};

export default Obj;
