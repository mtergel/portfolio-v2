import Container from "@/components/Container/Container";
import { BiSkipNext } from "@react-icons/all-files/bi/BiSkipNext";
import { BiSkipPrevious } from "@react-icons/all-files/bi/BiSkipPrevious";
import { useSprings } from "@react-spring/web";
import clsx from "clsx";
import Link from "next/link";
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
    title: "Fuyu",
    description: "Web based kanban board.",
    category: "Front end",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640348251/static/fuyu_e5kvus.png",
    link: "/project/flare-community",
  },
  {
    title: "Kosame",
    description: "See the Weather Forecast right in your browser.",
    category: "Chrome Extension",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640346512/static/kosame_ztujpi.png",
    link: "/project/flare-community",
  },
  {
    title: "Senritsu",
    description: "Discover music using Spotify.",
    category: "Front end",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640345489/static/senritsu1_fvroig.png",
    link: "/project/flare-community",
  },
  {
    title: "Railway",
    description: "A simple note taking application inspired by the Notes app.",
    category: "Full Stack",
    image:
      "https://res.cloudinary.com/flare-community/image/upload/v1640347935/static/Railway_gn1pih.png",
    link: "/project/flare-community",
  },
  {
    title: "Flare",
    description: "A information sharing community for developers.",
    category: "Full Stack",
    image: "https://flare-community.vercel.app/logo-dark.png",
    link: "/project/flare-community",
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
    <Container>
      <div className="h-[calc(100vh-88px)]">
        <div className="project-summary-container">
          <div className="grid justify-center items-center relative w-full select-none h-[calc(70vmin+5rem)]">
            <ProjectDeck
              cards={cards}
              gone={gone}
              api={api}
              springs={springs}
              onReset={handleReset}
              onSwipeNext={handleSwipeNext}
            />
          </div>
        </div>
        <div>
          <h2 className="sr-only">Featured Projects.</h2>
        </div>
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
                      <Link href={i.link} passHref prefetch={false}>
                        <a className="text-5xl font-bold tracking-tighter hover:underline">
                          {i.title}
                        </a>
                      </Link>
                      <p className="tracking-tighter pt-2">{i.description}</p>
                    </div>
                  );
                }}
              </SwiperSlide>
            ))}
        </ReactSwiper>
        <div className="mt-12">
          <div className="flex items-center space-x-2">
            <ControllerButton
              disabled={activeIndex === cards.length - 1}
              type="button"
              onClick={handleClickPrev}
              className="prev-project"
            >
              <BiSkipPrevious className="h-7 w-7" />
            </ControllerButton>
            <ControllerButton
              type="button"
              onClick={handleClickNext}
              className="next-project"
            >
              <BiSkipNext className="h-7 w-7" />
            </ControllerButton>
          </div>
          <div className="pl-4">
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
      </div>
    </Container>
  );
};

export default ProjectSummary;
