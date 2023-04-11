import Container from "@/components/Container/Container";

interface AboutMeShortProps {}

const AboutMeShort: React.FC<AboutMeShortProps> = () => {
  return (
    <section
      className="w-full z-10 relative min-h-screen flex flex-col items-center justify-center"
      id="about"
    >
      <Container className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-6">About me</h2>
          <div className="text-lg font-light max-w-[calc(16rem+18vw)] sm:max-w-[calc(24rem+18vw)]">
            Hi, I&apos;m <span className="text-green-300">Tergel</span>, a
            software developer student who is passionate about building
            innovative and impactful software solutions. I enjoy exploring new
            technologies and frameworks to enhance my development skills. I also
            have a solid understanding of software development concepts such as
            algorithms, data structures, and software design patterns. I believe
            in continuous learning and keeping up with the latest industry
            trends, and I actively seek out opportunities to expand my knowledge
            and skills. In my free time, I enjoy participating in coding
            challenges, contributing to open-source projects, and attending tech
            meetups. If you&apos;re looking for a dedicated and enthusiastic
            software developer to contribute to your team or project, feel free
            to contact me. I am eager to apply my skills and knowledge to create
            impactful software solutions.
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMeShort;
