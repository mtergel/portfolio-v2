import Container from "@/components/Container/Container";

interface AboutMeShortProps {}

const AboutMeShort: React.FC<AboutMeShortProps> = () => {
  return (
    <section
      className="text-[#1D1D1F] bg-[#FBFBFD] w-full z-10 relative min-h-screen py-12 flex flex-col items-center justify-center"
      id="about"
    >
      <Container className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
        <div className="w-full">
          <h2 className="text-2xl mb-6">A little bit about myself</h2>
          <div className="max-w-[calc(16rem+18vw)] sm:max-w-[calc(24rem+18vw)]">
            <p className="mb-4">
              Hello stranger, I am a developer based in Mongolia focused on
              creating interactive digital experiences on the web using modern
              web technologies.
            </p>
            <h3 className="text-lg mb-2">Motivation</h3>
            <p className="mb-4">
              I graduated with a Bachelor&apos;s degree in networking in 2020.
              While searching for a job I took a React Course — turns out I am
              passionate about coding. I’ve had the privilege of working at a
              start-up as an engineer.
            </p>
            <h3 className="text-lg mb-2">Stack</h3>
            <p className="mb-4">
              I’m familiar with technologies such as JavaScript, Typescript,
              React, Next.js, CSS, SCSS, Tailwind, Framer Motion, CSS-in-JS,
              Firebase, Supabase, Prisma...
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMeShort;
