import Twemoji from "@/components/Twemoji/Twemoji";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <p>
        Hi there <Twemoji emoji="👋" />, I&apos;m
      </p>
      <h1 className="text-6xl mb-4 font-black text-green-300">Tergel.</h1>
      <p>
        Front end developer <Twemoji emoji="👨‍💻" />
      </p>
    </div>
  );
};

export default Home;
