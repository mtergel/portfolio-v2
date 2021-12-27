import Container from "@/components/Container/Container";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { useResponsive } from "context/responsive";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

interface LayoutProps {}

const links: {
  link: string;
  title: string;
}[] = [
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useResponsive();

  return (
    <div className="flex flex-col">
      <header className="top-bar">
        <Container id="nav-container" ref={containerRef}>
          <div className="flex items-center justify-between relative py-5 z-40">
            <Link href="/" passHref>
              <a className="flex items-center space-x-2" aria-label="Home">
                <Image
                  src="/assets/moon.svg"
                  alt="logo"
                  width={36}
                  height={36}
                />
                <span className="font-medium text-2xl tracking-tighter">
                  Tergel
                </span>
              </a>
            </Link>
            {isMobile ? (
              <HamburgerMenu containerRef={containerRef} />
            ) : (
              <nav className="h-12 flex items-center">
                <ul className="nav-links">
                  {links.map((i) => (
                    <li key={i.link}>
                      <a href={i.link}>{i.title}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </Container>
      </header>
      <main className="min-h-screen flex-grow">{children}</main>
      <footer className="border-t border-t-gray-700 border-opacity-80 pt-8 pb-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-1 mb-4 md:col-span-3 space-y-2">
              <Link href="/" passHref>
                <a className="flex items-center space-x-2" aria-label="Home">
                  <Image
                    src="/assets/moon.svg"
                    alt="logo"
                    width={36}
                    height={36}
                  />
                  <span className="font-medium text-2xl tracking-tighter">
                    Tergel
                  </span>
                </a>
              </Link>
              <p className="text-sm text-gray-500">
                Front end developer. Personal Portfolio.
              </p>
            </div>
          </div>
          <div className="text-gray-500 flex items-center space-x-6">
            <a
              href="https://github.com/mtergel"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white focus:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tergel-munkhdelger-303977174"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white focus:text-white"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/portfolio-ab064.appspot.com/o/Tergel's%20Resume.pdf?alt=media&token=be5ab162-5c1b-4fb9-8656-c5906033ded3"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white focus:text-white"
            >
              Resume
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
