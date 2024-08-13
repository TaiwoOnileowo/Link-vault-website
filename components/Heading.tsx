import LinkSvg from "./LinkSvg";

const Heading = ({ text, color }: { text: string; color?: boolean }) => {
  return (
    <h2
      className={` pt-6 inline-flex items-center text-center ${
        color ? "bg-text-gradient-2" : "bg-text-gradient-1 "
      } scroll-reveal-heading uppercase text-transparent font-bold gap-2 text-base xs:text-lg ss:text-xl md:text-2xl`}
    >
      <LinkSvg showGradient={true} />
      {text}
    </h2>
  );
};

export default Heading;
