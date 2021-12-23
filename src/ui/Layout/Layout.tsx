import Container from "@/components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useResizeDetector } from "react-resize-detector";

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
    <div className="w-full h-full" ref={ref}>
      <header className="top-bar">
        <Container id="nav-container" ref={containerRef}>
          <div className="flex items-center justify-between relative py-5 z-40">
            <Link href="/" passHref>
              <a className="flex items-center space-x-2">
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
      <main className="pt-24">{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
