// source: https://codesandbox.io/s/github/pmndrs/react-spring/tree/master/demo/src/sandboxes/cards-stack?file=/src/App.tsx:3305-3438
// modified.

import {
  animated,
  SpringValue,
  to as interpolate,
  SpringRef,
} from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React from "react";

interface ProjectDeckProps {
  cards: string[];
  gone: Set<number>;
  springs: {
    x: SpringValue<number>;
    y: SpringValue<number>;
    scale: SpringValue<number>;
    rot: SpringValue<number>;
  }[];
  api: SpringRef<{
    x: number;
    y: number;
    scale: number;
    rot: number;
  }>;
  onReset: () => void;
  onSwipeNext: () => void;
}

const trans = (r: number, s: number) =>
  `rotateX(5deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const ProjectDeck: React.FC<ProjectDeckProps> = ({
  cards,
  gone,
  springs,
  api,
  onReset,
  onSwipeNext,
}) => {
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity[0] > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        if (gone.size !== cards.length) onSwipeNext();
      }
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length) {
        onReset();
      }
    }
  );

  return (
    <>
      {springs.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} className="card-container" style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            className="card"
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </>
  );
};

export default ProjectDeck;
