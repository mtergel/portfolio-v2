import Container from "@/components/Container/Container";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { Suspense } from "react";
import Model from "./Macbook";
import Shapes from "./Shapes";

interface AboutMeShortProps {}

const AboutMeShort: React.FC<AboutMeShortProps> = () => {
  return (
    <div className="bg-[#f0f0f0] text-[#1D1D1F] w-full z-10 relative min-h-screen py-12 flex flex-col items-center justify-center">
      <Container className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
        <div className="w-full">
          <h2 className="text-2xl mb-6">A little bit about myself</h2>
          <div className="max-w-[calc(12rem+18vw)]">
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
              start-up as an engineer..
            </p>
            <h3 className="text-lg mb-2">Stack</h3>
            <p className="mb-4">
              I’m familiar with technologies such as JavaScript, Typescript,
              React, Next.js, CSS, SCSS, Tailwind, Framer Motion, CSS-in-JS,
              Firebase, Supabase, Prisma...
            </p>

            <Link href="/about" passHref prefetch={false}>
              <a className="text-[#0066CC]">See more</a>
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0 h-[300px] w-full md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]">
          <Canvas dpr={[1, 2]} camera={{ fov: 35, position: [0, 0, -30] }}>
            <pointLight
              position={[10, 10, -10]}
              intensity={2}
              color={"#f0f0f0"}
            />
            <Suspense fallback={null}>
              <group rotation={[0, Math.PI, 0]}>
                <Model position={[0, 0, -1]} />
                {/* <Model
                open={open}
                hinge={props.open.to([0, 1], [1.575, -0.425])}
              /> */}
              </group>
              <Shapes />

              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} makeDefault />
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
        </div>
      </Container>
    </div>
  );
};

export default AboutMeShort;
