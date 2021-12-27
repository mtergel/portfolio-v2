import Container from "@/components/Container/Container";
import { useSpring } from "@react-spring/core";
import { animated as three } from "@react-spring/three";
import { animated } from "@react-spring/web";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const Model = dynamic(() => import("./Macbook"), { ssr: false });
const Shapes = dynamic(() => import("./Shapes"), { ssr: false });

interface AboutMeShortProps {}

const AboutMeShort: React.FC<AboutMeShortProps> = () => {
  // This flag controls open state, alternates between true & false
  const [open, setOpen] = useState(false);
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ open: Number(open) });

  return (
    <animated.section
      style={{ background: props.open.to([0, 1], ["#FBFBFD", "#EEEFFE"]) }}
      className="text-[#1D1D1F] w-full z-10 relative min-h-screen py-12 flex flex-col items-center justify-center"
    >
      <Container className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
        <div className="relative cursor-grab active:cursor-grabbing flex-shrink-0 h-[250px] w-full md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]">
          <Canvas dpr={[1, 2]} camera={{ fov: 35, position: [0, 0, -35] }}>
            {/* @ts-ignore */}
            <three.pointLight
              position={[10, 10, -10]}
              intensity={2}
              color={props.open.to([0, 1], ["#FBFBFD", "#EEEFFE"])}
            />
            <Suspense fallback={null}>
              <group
                rotation={[0, Math.PI, 0]}
                onClick={(e) => (e.stopPropagation(), setOpen(!open))}
              >
                <Model
                  open={open}
                  hinge={props.open.to([0, 1], [1.575, -0.425])}
                  position={[0, 0, -1]}
                />
              </group>
              <Shapes open={open} />
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                screenSpacePanning={false}
                maxPolarAngle={Math.PI / 2}
                enablePan={false}
                enableZoom={false}
                autoRotate={!open}
                autoRotateSpeed={0.5}
              />
              <Environment preset="city" />
            </Suspense>
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -4.5, 0]}
              opacity={0.4}
              width={20}
              height={20}
              blur={2}
              far={4.5}
            />
          </Canvas>
          <div className="absolute bottom-0">
            <span
              className={clsx(
                "opacity-0 transition-opacity duration-700 text-xs bg-black text-white p-2",
                !open && "opacity-100"
              )}
            >
              Click on the notebook
            </span>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-2xl mb-6">A little bit about myself</h2>
          <div className="max-w-[calc(16rem+18vw)] sm:max-w-[calc(24rem+18vw)]">
            <p className="mb-4">
              Hello stranger, I am a developer based in Mongolia focused on
              creating interactive digital experiences on the web using modern
              web technologies.
            </p>
            <h3 className="text-lg mb-2">Motivation</h3>
            <p className="mb-4">
              I graduated with a Bachelor&apos;s degree in networking in 2020.
              While searching for a job I took a React Course — turns out I am
              passionate about coding. I’ve had the privilege of working at a
              start-up as an engineer.
            </p>
            <h3 className="text-lg mb-2">Stack</h3>
            <p className="mb-4">
              I’m familiar with technologies such as JavaScript, Typescript,
              React, Next.js, CSS, SCSS, Tailwind, Framer Motion, CSS-in-JS,
              Firebase, Supabase, Prisma...
            </p>
          </div>
        </div>
      </Container>
    </animated.section>
  );
};

export default AboutMeShort;
