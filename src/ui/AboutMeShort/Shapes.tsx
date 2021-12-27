import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh, lerp } from "three-exports";
interface ShapesProps {
  open: boolean;
}

const Shapes: React.FC<ShapesProps> = ({ open }) => {
  const group = useRef<Group>();
  const boxRef = useRef<Mesh>();
  const pyramidRef = useRef<Mesh>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.position.y = lerp(
        group.current.position.y,
        open ? (-2 + Math.sin(t)) / 2 : -3.5,
        0.1
      );
      if (open) {
        group.current.rotation.y += 0.005;
      }

      if (boxRef.current) {
        boxRef.current.rotation.x = lerp(
          boxRef.current.rotation.x,
          open ? Math.sin(t / 2) / 2 + 0.5 : 0,
          0.1
        );
      }

      if (pyramidRef.current) {
        pyramidRef.current.rotation.x = lerp(
          pyramidRef.current.rotation.x,
          open ? Math.cos(t / 2) / 2 + 0.5 : 0,
          0.1
        );
      }
    }
  });

  return (
    <group ref={group} position={[0, -3.5, 0]}>
      <mesh position={[6, 0, -6.5]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="#d25578"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={pyramidRef} position={[-3, 0, -8]}>
        <cylinderGeometry attach="geometry" args={[0, 1.5, 2, 4, 1]} />
        <meshStandardMaterial
          attach="material"
          color="#9355B6"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={boxRef} position={[1, 0, 8]}>
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial
          attach="material"
          color="#F3BF37"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Shapes;
