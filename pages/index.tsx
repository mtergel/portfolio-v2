import Container from "@/components/Container/Container";
import Twemoji from "@/components/Twemoji/Twemoji";
import AboutMeShort from "@/ui/AboutMeShort/AboutMeShort";
import Layout from "@/ui/Layout/Layout";
import ProjectSummary from "@/ui/ProjectSummary/ProjectSummary";
import { NextPageWithLayout } from "@/utils/types";
import { animated, useSpring } from "@react-spring/web";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { BiStar } from "@react-icons/all-files/bi/BiStar";
import { GoRepoForked } from "@react-icons/all-files/go/GoRepoForked";

interface HomePageProps {
  starCount: number;
  forkCount: number;
  url: string;
  hasErrored: boolean;
}
export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  try {
    const res = await fetch(
      "https://api.github.com/repos/mtergel/portfolio-v2"
    );
    const data = await res.json();

    return {
      props: {
        starCount: data.stargazers_count,
        forkCount: data.forks_count,
        url: data.html_url,
        hasErrored: false,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        starCount: 0,
        forkCount: 0,
        url: "",
        hasErrored: true,
      },
      revalidate: 60,
    };
  }
};

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> =
  (githubProps) => {
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

        <section id="contacts">
          <div className="min-h-screen flex items-center">
            <Container className="contact-info">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl mb-4">Get In Touch</h2>
                <span className="max-w-sm">
                  I&apos;m looking new opportunities. Whether you have a
                  question or just want to say hi, I&apos;ll try my best to get
                  back to you!
                </span>
                <a
                  className="mt-4 rounded border border-green-300 text-green-300 px-5 py-2"
                  href="mailto:tergelm@gmail.com"
                >
                  Say Hi
                </a>
              </div>
            </Container>
          </div>
        </section>
        {!githubProps.hasErrored && (
          <a
            href={githubProps.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300 focus:text-green-300 text-gray-400 transition-colors flex flex-col items-center justify-center gap-1 text-sm text-center pb-6"
          >
            <p>Designed & Built by Tergel</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span>{githubProps.starCount}</span>
                <BiStar />
              </div>
              <div className="flex items-center space-x-1">
                <span>{githubProps.forkCount}</span>
                <GoRepoForked />
              </div>
            </div>
          </a>
        )}
      </div>
    );
  };

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Home;
