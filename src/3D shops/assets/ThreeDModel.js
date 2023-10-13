import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';

function Model() {
  const { nodes, materials } = useGLTF('/wedding.gltf');

  return (
    <mesh
      geometry={nodes.wedding_dress_ver_1.geometry}
      material={materials.materials}
    />
  );
}

export default function ThreeDModel() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <Model />
    </Canvas>
  );
}
