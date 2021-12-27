import Container from "@/components/Container/Container";
import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal";
import { BiSkipNext } from "@react-icons/all-files/bi/BiSkipNext";
import { BiSkipPrevious } from "@react-icons/all-files/bi/BiSkipPrevious";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { useSprings } from "@react-spring/web";
import clsx from "clsx";
import { useState } from "react";
import { A11y, EffectFade, Swiper } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import ProjectDeck from "../ProjectDeck/ProjectDeck";
import ControllerButton from "./ControllerButton";

interface ProjectSummaryProps {}

const cards = [
  {
    title: "Portfolio",
    description: "My previous portfolio.",
    category: "Front end",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604711/static/moon_sg2s7s_ym1fhs.webp",
    link: "https://portfolio-git-main-mtergel.vercel.app",
    github: "https://github.com/mtergel/portfolio",
    stack: ["Next.js", "Chakra UI", "fullPage.js", "Framer Motion"],
  },
  {
    title: "Fuyu",
    description: "Web based kanban board.",
    category: "Front end",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604711/static/fuyu_e5kvus_l5jaoy.webp",
    link: "https://fuyu-trello-clone.vercel.app/",
    github: "https://github.com/mtergel/fuyu-trello-clone",
    stack: ["React", "Redux"],
  },
  {
    title: "Kosame",
    description: "See the Weather Forecast right in your browser.",
    category: "Chrome Extension",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604711/static/kosame_ztujpi_rmtbny.webp",
    github: "https://github.com/mtergel/kosame-weather-app",
    stack: ["React", "Chakra UI", "DarkSky API"],
  },

  {
    title: "Senritsu",
    description: "Discover music using Spotify.",
    category: "Front end",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604483/static/senritsu1_fvroig_z4sokq.jpg",
    link: "https://senritsu.vercel.app/",
    github: "https://github.com/mtergel/senritsu",
    stack: ["Next.js", "Chakra UI", "Spotify API"],
  },

  {
    title: "Amar Content Service",
    description:
      "Inhouse product information, inventory management, sales solution.",
    category: "Front end",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604711/static/acs_ixa2i6_mse9yk.webp",
    stack: ["React", "AWS Amplify"],
  },
  {
    title: "Railway",
    description: "A simple note taking application inspired by the Notes app.",
    category: "Full Stack",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604711/static/Railway_gn1pih_qjvzbq.webp",
    link: "https://railway.vercel.app/",
    github: "https://github.com/mtergel/railway",
    stack: ["Next.js", "Tailwind CSS", "Firebase", "Tiptap"],
  },
  {
    title: "Flare",
    description: "A information sharing community for developers.",
    category: "Full Stack",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640604828/static/logo-dark_gifrow.webp",
    link: "https://flare-community.vercel.app/",
    github: "https://github.com/mtergel/flare",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Unified"],
  },
];

const to = (i: number, active: boolean) => {
  return {
    x: 0,
    y: i * -4,
    scale: 1,
    rot: active ? 0 : -10 + Math.random() * 20,
    delay: i * 100,
  };
};

const ProjectSummary: React.FC<ProjectSummaryProps> = () => {
  const [titleSwiper, setTitleSwiper] = useState<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(cards.length - 1);

  // The set flags all the cards that are flicked out
  const [gone] = useState(() => new Set<number>());

  // springs
  const [springs, api] = useSprings(cards.length, (i) => ({
    ...to(i, i === activeIndex),
  }));

  const handleSwipeNext = () => {
    // update index
    setActiveIndex((prev) => prev - 1);
    // update rotation on active card
    api.start((i) => {
      if (i !== activeIndex - 1) return;
      return {
        rot: 0,
      };
    });

    titleSwiper?.slideNext();
  };

  const handleClickNext = () => {
    // noop in empty period
    if (activeIndex === -1) return;

    // move card
    api.start((i) => {
      if (activeIndex !== i) return;
      const x = 100 + window.innerWidth;
      const rot = 0;
      const scale = 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: 200 },
      };
    });
    gone.add(activeIndex);

    if (activeIndex === 0) {
      // reset
      handleReset();
    } else {
      // update activeIndex
      handleSwipeNext();
    }
  };

  const handleClickPrev = () => {
    // cant go prev noop
    if (activeIndex === cards.length - 1) return;

    api.start((i) => {
      if (activeIndex + 1 === i) {
        // move back prev card
        return {
          x: 0,
          rot: 0,
          scale: 1,
          delay: undefined,
          config: { friction: 50, tension: 500 },
        };
      }

      if (activeIndex === i) {
        // rotate the current card
        return {
          x: 0,
          scale: 1,
          delay: undefined,
          rot: -10 + Math.random() * 20,
          config: { friction: 50, tension: 500 },
        };
      }
    });

    // update activeIndex
    // add it to gone
    gone.delete(activeIndex + 1);
    setActiveIndex((prev) => prev + 1);
    titleSwiper?.slidePrev();
  };

  const handleReset = () => {
    setTimeout(() => {
      gone.clear();
      api.start((i) => to(i, i === cards.length - 1));

      setActiveIndex(cards.length - 1);
      titleSwiper?.slideTo(0);
    }, 600);
  };

  return (
    <section>
      <Container className="min-h-screen pb-12 pt-12 md:pt-40 flex flex-col justify-center">
        <h2 id="projects" className="text-2xl mb-24 md:mb-6 xl:pl-[112px]">
          Here are a few projects I&apos;ve built.
        </h2>

        <div className="project-summary-container">
          <div className="project-controls">
            <div className="flex items-center gap-2 sm:flex-col lg:flex-row xl:flex-col">
              <ControllerButton
                disabled={activeIndex === cards.length - 1}
                type="button"
                onClick={handleClickPrev}
                className="prev-project"
                label="Previous"
              >
                <BiSkipPrevious className="h-7 w-7" />
              </ControllerButton>
              <ControllerButton
                type="button"
                onClick={handleClickNext}
                className="next-project"
                label="Next"
              >
                <BiSkipNext className="h-7 w-7" />
              </ControllerButton>
            </div>
          </div>
          <div className="project-carousel">
            <ReactSwiper
              modules={[A11y, EffectFade]}
              onInit={setTitleSwiper}
              slidesPerView={1}
              preventClicks={false}
              watchSlidesProgress
              speed={500}
              effect="fade"
              allowTouchMove={false}
              roundLengths
            >
              {cards
                .slice(0)
                .reverse()
                .map((i) => (
                  <SwiperSlide key={i.title}>
                    {({ isActive }) => {
                      return (
                        <div
                          className={clsx(
                            "slide-info",
                            isActive && "slide-info-active"
                          )}
                        >
                          <p className="uppercase text-xs tracking-tighter font-bold mb-1">
                            {i.category}
                          </p>
                          <h3 className="text-5xl font-bold tracking-tighter">
                            {i.title}
                          </h3>
                          <p className="tracking-tighter pt-2">
                            {i.description}
                          </p>
                          <div className="mt-8 space-y-3">
                            {i.stack && (
                              <ul className="text-gray-400 tracking-tighter flex items-center flex-wrap gap-2">
                                {i.stack.map((i) => (
                                  <li key={i}>{i}</li>
                                ))}
                              </ul>
                            )}
                            <div className="flex items-center gap-4 text-gray-400">
                              {i.github && (
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={i.github}
                                  className="hover:text-green-300"
                                  aria-label={`see repository of ${i.title}`}
                                >
                                  <FaGithub className="h-7 w-7" />
                                </a>
                              )}

                              {i.link && (
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={i.link}
                                  className="hover:text-green-300"
                                  aria-label={`see demo of ${i.title}`}
                                >
                                  <BiLinkExternal className="h-7 w-7" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </SwiperSlide>
                ))}
            </ReactSwiper>
          </div>
          <div className="project-cards">
            <ProjectDeck
              cards={cards}
              gone={gone}
              api={api}
              springs={springs}
              onReset={handleReset}
              onSwipeNext={handleSwipeNext}
            />
          </div>
          <div className="project-bottombar">
            <div className="controller-timeline">
              <span className="text-sm font-bold tracking-tighter">
                {activeIndex < 0
                  ? cards.length.toString().padStart(2, "0")
                  : (cards.length - activeIndex).toString().padStart(2, "0")}
              </span>
              <div className="controller-bar">
                <div className={"controller-bar-inner"} />
              </div>
              <span className="text-sm font-bold tracking-tighter">
                {cards.length.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProjectSummary;
