import Container from "@/components/Container/Container";
import Twemoji from "@/components/Twemoji/Twemoji";

interface AboutMeShortProps {}

const AboutMeShort: React.FC<AboutMeShortProps> = () => {
  return (
    <section
      className="w-full z-10 relative min-h-screen py-12 flex flex-col items-center justify-center"
      id="about"
    >
      <Container className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
        <div className="w-full">
          <h2 className="text-2xl mb-6">About me</h2>
          <div className="max-w-[calc(16rem+18vw)] sm:max-w-[calc(24rem+18vw)]">
            <p>
              Hello stranger, My name is Tergel. I was born in 1998 and grew up
              in Mongolia. I have been coding since 2018 in a wide range of
              languages and technologies. Lately, I&apos;m interested in web
              technologies, my current stack consists of Javascript, TypeScript,
              React, Next.js, and more.
            </p>
            <p className="my-2">
              In 2020 I graduated from the{" "}
              <a
                href="https://www.num.edu.mn/en"
                target="_blank"
                rel="noreferrer"
                className="text-green-300"
              >
                National University of Mongolia
              </a>{" "}
              with a Bachelor of Applied Science degree in Computer Networking.
            </p>
            <p>
              A forever student of the game. Willing to learn and eager to work
              on projects that will help others. When I&apos;m not coding I
              write about some stuff I&apos;ve learned over at{" "}
              <a
                href="https://flare-community.vercel.app/tergelm"
                target="_blank"
                rel="noreferrer"
                className="text-green-300"
              >
                Flare
              </a>
              . I enjoy playing guitar, reading, and drawing.{" "}
              <Twemoji emoji="🎨" />
            </p>
            <p className="mt-4">
              Currently, I&apos;m focused on building our platform at Amar
              Content Service.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMeShort;
