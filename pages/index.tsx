import Container from "@/components/Container/Container";
import Twemoji from "@/components/Twemoji/Twemoji";
import AboutMeShort from "@/ui/AboutMeShort/AboutMeShort";
import Layout from "@/ui/Layout/Layout";
import ProjectSummary from "@/ui/ProjectSummary/ProjectSummary";
import { NextPageWithLayout } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";

const Home: NextPageWithLayout = () => {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const calc = (x: number, y: number) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2,
  ];
  const trans1 = (x: number, y: number) =>
    `translate3d(${x / 10}px,${y / 10}px,0)`;
  const trans2 = (x: number, y: number) =>
    `translate3d(${x / 8 + 120}px,${y / 8 - 120}px,0)`;
  const trans3 = (x: number, y: number) =>
    `translate3d(${x / 6 - 160}px,${y / 6 + 40}px,0)`;
  const trans4 = (x: number, y: number) =>
    `translate3d(${x / 12}px,${y / 10 - 235}px,0)`;
  const trans5 = (x: number, y: number) =>
    `translate3d(${x / 3.5 + 135}px,${y / 6 + 115}px,0)`;
  const trans7 = (x: number, y: number) =>
    `translate3d(${x / 9 - 4}px,${y / 10 + 275}px,0)`;
  const trans6 = (x: number, y: number) =>
    `translate3d(${x / 10 + 185}px,${y / 10 + 275}px,0)`;
  const trans8 = (x: number, y: number) =>
    `translate3d(${x / 10 - 185}px,${y / 10 + 275}px,0)`;

  return (
    <div
      className="h-full overflow-x-hidden pt-[88px]"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <section>
        <Container className="min-h-[calc(100vh-88px)] flex items-center justify-between relative">
          <div className="flex flex-col justify-center z-10">
            <p>
              Hi there <Twemoji emoji="👋" />, I&apos;m
            </p>
            <h1 className="text-8xl my-2 mb-4 font-black text-green-300">
              Tergel
            </h1>
            <p>
              Front end developer <Twemoji emoji="👨‍💻" />
            </p>
          </div>
          <div className="hero-card-container">
            <div className="hero-card">
              <animated.div
                className="card1"
                style={{ transform: props.xy.to(trans1) }}
              />
              <animated.div
                className="card2"
                style={{ transform: props.xy.to(trans2) }}
              />
              <animated.div
                className="card3"
                style={{ transform: props.xy.to(trans3) }}
              />
              <animated.div
                className="card4"
                style={{ transform: props.xy.to(trans4) }}
              />
              <animated.div
                className="card5"
                style={{ transform: props.xy.to(trans5) }}
              />
              <animated.div
                className="card6"
                style={{ transform: props.xy.to(trans6) }}
              />
              <animated.div
                className="card7"
                style={{ transform: props.xy.to(trans7) }}
              />
              <animated.div
                className="card8"
                style={{ transform: props.xy.to(trans8) }}
              />
            </div>
          </div>
        </Container>
      </section>

      <AboutMeShort />

      <ProjectSummary />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Home;
