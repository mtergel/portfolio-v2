import Container from "@/components/Container/Container";
import HamburgerButton from "@/components/HamburgerButton/HamburgerButton";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import Link from "next/link";
import { RefObject, useEffect, useState } from "react";

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
    link: "/about",
    title: "About",
  },
  {
    link: "/project",
    title: "Projects",
  },
  {
    link: "/contact",
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
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

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
                <ul className="nav-inner-list">
                  {links.map((i) => (
                    <li key={i.link}>
                      <Link href={i.link} passHref prefetch={false}>
                        <a>{i.title}</a>
                      </Link>
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
                      GITHUB
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/tergel-munkhdelger-303977174"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LINKED IN
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
