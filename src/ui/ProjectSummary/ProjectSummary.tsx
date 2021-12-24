import Container from "@/components/Container/Container";
import { useState } from "react";
import ProjectDeck from "../ProjectDeck/ProjectDeck";
import { BiSkipNext } from "@react-icons/all-files/bi/BiSkipNext";
import { BiSkipPrevious } from "@react-icons/all-files/bi/BiSkipPrevious";
import { useSprings } from "@react-spring/web";

interface ProjectSummaryProps {}

const cards = [
  "https://m.media-amazon.com/images/I/81GTBNDWCfL._SS500_.jpg",
  "https://m.media-amazon.com/images/I/91dkpgT92CL._SY355_.jpg",
  "https://m.media-amazon.com/images/I/71WPk8O1dtL._SS500_.jpg",
  "https://classicrockreview.files.wordpress.com/2021/07/bleach.png",
  "https://images.theconversation.com/files/421858/original/file-20210917-31825-dmecrb.jpg?ixlib=rb-1.1.0&rect=36%2C26%2C3458%2C3468&q=45&auto=format&w=926&fit=clip",
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
  };

  const handleClickNext = () => {
    // noop in empty period
    if (activeIndex === -1) return;

    if (activeIndex === 0) {
      // reset
      handleReset();
    }
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

    // update activeIndex
    handleSwipeNext();
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
        };
      }

      if (activeIndex === i) {
        // rotate the current card
        return {
          rot: -10 + Math.random() * 20,
        };
      }
    });

    // update activeIndex
    setActiveIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setTimeout(() => {
      gone.clear();
      api.start((i) => to(i, i === cards.length - 1));

      setActiveIndex(cards.length - 1);
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
          <p>{`Title for slide: ${activeIndex}`}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={activeIndex === cards.length - 1}
            type="button"
            onClick={handleClickPrev}
          >
            <BiSkipPrevious />
          </button>
          <button type="button" onClick={handleClickNext}>
            <BiSkipNext />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProjectSummary;
