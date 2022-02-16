import Container from "@/components/Container/Container";

interface AboutMeShortProps {}

const AboutMeShort: React.FC<AboutMeShortProps> = () => {
  return (
    <section
      className="w-full z-10 relative min-h-screen py-12 flex flex-col items-center justify-center"
      id="about"
    >
      <Container className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
        <div className="w-full">
          <h2 className="text-2xl mb-6">A little bit about myself</h2>
          <div className="max-w-[calc(16rem+18vw)] sm:max-w-[calc(24rem+18vw)]">
            <p className="mb-4">
              Hello stranger, I&apos;m a {new Date().getFullYear() - 1998}
              -year-old developer based in Mongolia.
            </p>
            <p>
              A forever student of the game. Willing to learn and improve and
              eager to work on projects that will make an impact. Currently
              I&apos;m focused on building our platform at Amar Content Service.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMeShort;
