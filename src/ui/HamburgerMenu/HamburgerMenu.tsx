import HamburgerButton from "@/components/HamburgerButton/HamburgerButton";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import { RefObject, useState } from "react";

interface HamburgerMenuProps {
  containerRef: RefObject<HTMLDivElement>;
}

/**
 * Component for showing navgiation drawer.
 *
 * @component
 */
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ containerRef }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const overlayCx = clsx("nav-overlay", open && "nav-overlay-open");
  const contenxtCx = clsx("nav-content", open && "nav-content-open");

  return (
    <>
      <HamburgerButton
        open={open}
        aria-label={open ? "Close Navigation" : "Open Navigation"}
        onClick={() => toggleOpen()}
      />
      <Portal.Root containerRef={containerRef}>
        <div className={clsx("nav-container", open && "pointer-events-auto")}>
          <div className={overlayCx} />
          <div className={contenxtCx}>
            <div className="nav-inner-backdrop" />
            <nav className="nav-inner">
              <div>SMOKING</div>
              <div>ON</div>
              <div>TOP FIVES.</div>
            </nav>
          </div>
        </div>
      </Portal.Root>
      {/* <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <HamburgerButton
          open={open}
          aria-label={open ? "Close Navigation" : "Open Navigation"}
          onClick={() => toggleOpen()}
        />
        <DialogPrimitive.Portal container={containerRef.current}>
          <DialogPrimitive.Overlay className={overlayCx} />
          <DialogPrimitive.Content className={contenxtCx}>
            <nav>
              <DialogPrimitive.Title className="sr-only">
                Navigation
              </DialogPrimitive.Title>
         
            </nav>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root> */}
    </>
  );
};

export default HamburgerMenu;
