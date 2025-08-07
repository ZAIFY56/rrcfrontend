import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import image1 from "/sustainabilityfeatures/feature1.png";
import image2 from "/sustainabilityfeatures/feature2.png";
import image3 from "/sustainabilityfeatures/feature3.png";
import { Card } from "@/components/common";

const DropLetter = ({ children, delay = 0, className = "" }) => (
  <motion.span
    className={className}
    initial={{ opacity: 0, y: -50, rotateX: -90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 0.6,
      delay,
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

const SUSTAINABILITY_SERVICES = [
  {
    title: "100% carbon neutral",
    icon: image1,
    description: "Our courier service is 100% carbon neutral...",
  },
  {
    title: "Less waste",
    icon: image2,
    description: "Our courier service is committed to reducing waste...",
  },
  {
    title: "Zero emission options",
    icon: image3,
    description: "Our courier service offers zero emission options...",
  },
];

export default function SustainabilityFeatures() {
  const services = useMemo(
    () => [...SUSTAINABILITY_SERVICES, ...SUSTAINABILITY_SERVICES],
    []
  );
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = isMobile ? 300 : 350;
  const gap = 24;
  const singleSetWidth = SUSTAINABILITY_SERVICES.length * (cardWidth + gap);

  const [spring, api] = useSpring(() => ({
    x: 0,
    config: { tension: 20, friction: 0, duration: 0 },
  }));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 2xl:pt-32">
      <div className="container px-6 md:px-2 lg:px-12 xl:px-12 2xl:px-12 mx-auto">
        <motion.header
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-3xl 2xl:text-6xl font-semibold text-center text-primary mb-3">
            <AnimatedText text="Delivering, not polluting" delay={0.2} />
          </h2>
          <p className="text-md 2xl:text-[20px] 2xl:mx-[26rem] text-center md:mx-[10rem] lg:mx-[14rem] mb-6">
            Delivering products efficiently while prioritizing eco-friendly
            practices...
          </p>
        </motion.header>

        {/* Mobile & Tablet Infinite Scroll */}
        <div className="lg:hidden relative mt-10 px-4">
          <div className="w-full overflow-hidden">
            <animated.div
              className="flex gap-6 py-4 cursor-grab active:cursor-grabbing"
              style={{
                width: services.length * (cardWidth + gap),
                x: spring.x,
                touchAction: "none",
              }}
              {...bind()}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 ${isMobile ? "w-[300px]" : "w-[350px]"}`}
                >
                  <Card
                    className="!w-full h-full"
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    iconProps={{
                      width: 64,
                      height: 64,
                      loading: "lazy",
                    }}
                  />
                </motion.div>
              ))}
            </animated.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {SUSTAINABILITY_SERVICES.map((_, index) => (
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
          className="hidden lg:grid grid-cols-1 justify-items-center md:grid-cols-3 gap-4 lg:mx-[8rem] mt-10 2xl:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SUSTAINABILITY_SERVICES.map((service, index) => (
            <motion.div
              key={`sustainability-${index}`}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="!w-full h-full"
                icon={service.icon}
                title={service.title}
                description={service.description}
                iconProps={{
                  width: 64,
                  height: 64,
                  loading: "lazy",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
