import Container from "@/components/Container/Container";
import Twemoji from "@/components/Twemoji/Twemoji";
import Layout from "@/ui/Layout/Layout";
import ProjectDeck from "@/ui/ProjectDeck/ProjectDeck";
import { NextPageWithLayout } from "@/utils/types";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Container>
        <p>
          Hi there <Twemoji emoji="👋" />, I&apos;m
        </p>
        <h1 className="text-6xl mb-4 font-black text-green-300">Tergel.</h1>
        <p>
          Front end developer <Twemoji emoji="👨‍💻" />
        </p>
      </Container>
      <div className="flex items-center justify-center h-screen w-screen relative overflow-hidden">
        <ProjectDeck />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Home;
