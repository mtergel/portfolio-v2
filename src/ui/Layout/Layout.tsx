import Container from "@/components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
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
            <HamburgerMenu containerRef={containerRef} />
          </div>
        </Container>
      </header>
      <main className="pt-24">{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
