import Container from "@/components/Container/Container";
import HamburgerMenu from "@/components/HamburgerMenu/HamburgerMenu";
import Image from "next/image";
import Link from "next/link";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className="top-bar">
        <Container>
          <div className="flex items-center justify-between relative py-5">
            <Link href="/" passHref>
              <a className="flex items-center space-x-2">
                <Image
                  src="/assets/moon.svg"
                  alt="logo"
                  width={36}
                  height={36}
                />
                <span className="font-medium text-2xl">Tergel</span>
              </a>
            </Link>

            <HamburgerMenu />
          </div>
        </Container>
      </header>
      {/* <main>{children}</main> */}
      <footer></footer>
    </>
  );
};

export default Layout;
