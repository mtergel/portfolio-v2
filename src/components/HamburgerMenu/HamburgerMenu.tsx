import clsx from "clsx";
import { forwardRef, useState } from "react";

interface HamburgerMenuOption {
  initialIsOpen?: boolean;
}

type Ref = HTMLButtonElement;
type HamburgerMenuProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  HamburgerMenuOption;

const HamburgerMenu = forwardRef<Ref, HamburgerMenuProps>((props, ref) => {
  const { className, initialIsOpen, onClick, ...rest } = props;
  const [open, setOpen] = useState(initialIsOpen);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((prev) => !prev);
    onClick && onClick(e);
  };
  const merged = clsx("hamburger", className, open && "hamburger-open");

  return (
    <button ref={ref} className={merged} onClick={handleOnClick} {...rest}>
      <span />
      <span />
      <span />
    </button>
  );
});

HamburgerMenu.displayName = "HamburgerMenu";

export default HamburgerMenu;
