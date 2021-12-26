import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface ShapesProps {}

const Shapes: React.FC<ShapesProps> = () => {
  const group = useRef<THREE.Group>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y += 0.001;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.sin(t / 2) / 8 + 0.5,
        0.5
      );
    }
  });

  return (
    <group ref={group}>
      <mesh position={[5.5, 3, -6]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="#d25578"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[-3, 2.5, -6]}>
        <tetrahedronGeometry attach="geometry" args={[1.5]} />
        <meshStandardMaterial
          attach="material"
          color="#9355B6"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 5, 6]}>
        <torusBufferGeometry attach="geometry" args={[1, 0.4, 8, 100]} />
        <meshStandardMaterial
          attach="material"
          color="#F3BF37"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Shapes;
