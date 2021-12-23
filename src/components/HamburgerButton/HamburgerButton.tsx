import clsx from "clsx";
import { forwardRef } from "react";

interface HamburgerButtonOption {
  open: boolean;
}

type Ref = HTMLButtonElement;
type HamburgerButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  HamburgerButtonOption;

const HamburgerButton = forwardRef<Ref, HamburgerButtonProps>((props, ref) => {
  const { className, open, ...rest } = props;
  const merged = clsx("hamburger", className, open && "hamburger-open");

  return (
    <button ref={ref} className={merged} {...rest}>
      <span />
      <span />
      <span />
    </button>
  );
});

HamburgerButton.displayName = "HamburgerButton";

export default HamburgerButton;
