import Container from "@/components/Container/Container";
import HamburgerButton from "@/components/HamburgerButton/HamburgerButton";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";

interface HamburgerMenuProps {
  containerRef: RefObject<HTMLDivElement>;
}

const links: {
  link: string;
  title: string;
}[] = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "#about",
    title: "About",
  },
  {
    link: "#projects",
    title: "Projects",
  },
  {
    link: "#contacts",
    title: "Contacts",
  },
];

/**
 * Component for showing navgiation drawer.
 *
 * @component
 */
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ containerRef }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      // Detach listener when component unmounts
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    open
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [open]);

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
        <div
          role="dialog"
          aria-labelledby="Navigation"
          className={clsx("nav-container", open && "pointer-events-auto")}
        >
          <div className={overlayCx} />
          <div className={contenxtCx}>
            <div className="nav-inner-backdrop" />
            <Container className="nav-inner">
              <nav className="flex items-center flex-grow pt-24">
                {/* TODO: MAKE THIS KEYBOARD SUPPORT TABBALE + ARROW KEYS */}
                <ul className="nav-inner-list">
                  {links.map((i) => (
                    <li key={i.link}>
                      <a href={i.link} onClick={onClose}>
                        {i.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="nav-inner-footer">
                <ul>
                  <li>
                    <a
                      href="https://github.com/mtergel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/tergel-munkhdelger-303977174"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://drive.google.com/file/d/1h9Dcc627dLgw49nHsg79XsEuVdFC4S5x/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-white focus:text-white"
                    >
                      Resume
                    </a>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
        </div>
      </Portal.Root>
    </>
  );
};

export default HamburgerMenu;
