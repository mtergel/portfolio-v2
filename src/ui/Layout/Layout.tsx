import Container from "@/components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useResizeDetector } from "react-resize-detector";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";

interface LayoutProps {}

const links: {
  link: string;
  title: string;
}[] = [
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, ref } = useResizeDetector();

  return (
    <div className="flex flex-col" ref={ref}>
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
            {width && width < 768 ? (
              <HamburgerMenu containerRef={containerRef} />
            ) : (
              <nav className="h-12 flex items-center">
                <ul className="nav-links">
                  {links.map((i) => (
                    <li key={i.link}>
                      <Link href={i.link} passHref prefetch={false}>
                        <a>{i.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </Container>
      </header>
      <main className="pt-28 min-h-screen flex-grow">{children}</main>
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
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
