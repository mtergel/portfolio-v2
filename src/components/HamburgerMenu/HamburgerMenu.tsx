import clsx from "clsx";
import { forwardRef } from "react";
import { animated } from "react-spring";
interface HamburgerMenuOption {}

type Ref = HTMLButtonElement;
type HamburgerMenuProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  HamburgerMenuOption;

const HamburgerMenu = forwardRef<Ref, HamburgerMenuProps>((props, ref) => {
  const { className, ...rest } = props;
  const merged = clsx("hamburger", className);
  return (
    <button ref={ref} className={merged} {...rest}>
      <animated.span />
      <animated.span />
      <animated.span />
    </button>
  );
});

HamburgerMenu.displayName = "HamburgerMenu";

export default HamburgerMenu;
