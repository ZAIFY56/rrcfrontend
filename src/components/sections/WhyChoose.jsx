import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ProfessionalIcon from "/whychoose/professionalicon.png";
import ReliabilityIcon from "/whychoose/Reliabilityicon.png";
import ResponsiveIcon from "/whychoose/responsiveicon.png";
import SustainabilityIcon from "/whychoose/sustainabilityicon.png";
import { Card } from "@/components/common";

const DropLetter = ({ children, delay = 0, className = "" }) => (
  <motion.span
    className={className}
    initial={{ opacity: 0, y: -50, rotateX: -90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 0.6,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
  >
    {children}
  </motion.span>
);

const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((letter, letterIndex) => (
            <DropLetter
              key={letterIndex}
              delay={delay + wordIndex * 0.1 + letterIndex * 0.05}
            >
              {letter}
            </DropLetter>
          ))}
        </span>
      ))}
    </div>
  );
};

const FEATURES = [
  {
    title: "Professional Service",
    icon: ProfessionalIcon,
    description:
      "Our experienced couriers ensure your goods are handled with care and delivered on time, every time.",
  },
  {
    title: "Reliability",
    icon: ReliabilityIcon,
    description:
      "With a network spanning the UK, we guarantee prompt collection and delivery, meeting your business deadlines consistently.",
  },
  {
    title: "Responsiveness",
    icon: ResponsiveIcon,
    description:
      "Our dedicated customer support team is available to address your needs and adapt to your requirements swiftly.",
  },
  {
    title: "Sustainability",
    icon: SustainabilityIcon,
    description:
      "Committed to ethical practices, we offer eco-friendly delivery options to help your business reduce its carbon footprint.",
  },
];

export default function WhyChoose() {
  const features = useMemo(() => [...FEATURES, ...FEATURES], []);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = isMobile ? 300 : 350;
  const gap = 24;
  const singleSetWidth = FEATURES.length * (cardWidth + gap);

  const [spring, api] = useSpring(() => ({
    x: 0,
    config: { tension: 20, friction: 0, duration: 0 },
  }));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offsetRef = useRef(0);
  useEffect(() => {
    let animationFrame;
    const speed = 1.5; // px/frame

    const loop = () => {
      offsetRef.current -= speed;
      if (Math.abs(offsetRef.current) >= singleSetWidth) {
        offsetRef.current = 0;
      }
      api.set({ x: offsetRef.current });

      // Determine active index for dots
      const normalized = Math.abs(offsetRef.current) % singleSetWidth;
      const index = Math.floor(normalized / (cardWidth + gap));
      setActiveIndex(index);

      animationFrame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrame);
  }, [api, singleSetWidth, cardWidth, gap]);

  const bind = useDrag(({ movement: [mx] }) => {
    api.set({ x: offsetRef.current + mx });
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-8" id="about">
      {/* Text Section */}
      <div className="container mx-auto px-6 md:px-15 lg:px-12 2xl:px-12 py-2 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="flex flex-col mt-10 md:flex-row gap-16">
          <motion.div
            className="md:w-1/3 text-3xl md:text-4xl 2xl:text-6xl font-semibold flex"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <AnimatedText text="Why" delay={0.2} />
            <AnimatedText
              text="Choose Us"
              delay={0.2}
              className="text-primary ml-2"
            />
          </motion.div>
          <motion.div
            className="md:w-2/3"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <p className="text-xs 2xl:text-[18px] lg:text-right text-center">
              At Rapid Response Couriers, we understand that in business, time
              isn't just money — it's everything. That's why when it's urgent,
              we're unstoppable. We specialize in fast, secure deliveries with
              zero excuses.
            </p>
            <p className="text-xs 2xl:text-[20px] lg:text-end mt-2">
              — your emergency is our express route."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile & Tablet Continuous Slider */}
      <div className="lg:hidden relative w-full mt-10 container mx-auto overflow-hidden">
        <animated.div
          className="flex gap-6 py-4 cursor-grab active:cursor-grabbing"
          style={{
            width: features.length * (cardWidth + gap),
            x: spring.x,
            touchAction: "none",
          }}
          {...bind()}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-[300px]"
            >
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="!w-full !h-full !items-center !justify-center"
                containerProps={{
                  className:
                    "!h-full !flex !flex-col !items-center !text-center",
                }}
                iconContainerProps={{ className: "!mb-4" }}
                titleProps={{ className: "!text-lg !font-bold !mb-2" }}
                descriptionProps={{ className: "!text-sm" }}
              />
            </motion.div>
          ))}
        </animated.div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {FEATURES.map((_, index) => (
            <div
              key={index}
              className={`transition-all rounded-full ${
                activeIndex === index
                  ? "bg-primary w-6 h-3"
                  : "bg-gray-300 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <motion.div
        className="hidden lg:grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-6 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {FEATURES.map((feature, index) => (
          <motion.div
            key={`feature-${index}`}
            custom={index}
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-[320px]"
          >
            <Card
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="!w-full !h-full md:!w-full !max-w-md"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
