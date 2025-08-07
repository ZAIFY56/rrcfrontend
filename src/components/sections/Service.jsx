import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Samedayicon from "/service/samedeliveryicon.png";
import Nextdayicon from "/service/nextdayicon.png";
import Economicalicon from "/service/ecnomicserviceicon.png";
import Outofhoursicon from "/service/outofhoursService.png";
import aeroplanimg from "/service/aeroplane.png";
import { Card } from "@/components/common";

const DropLetter = ({ children, delay = 0, className = "" }) => {
  return (
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
};

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

const SERVICE_DATA = [
  {
    title: "Same Day Delivery",
    icon: Samedayicon,
    description: "Direct, dedicated same-day collection and delivery.",
  },
  {
    title: "Next Day Delivery",
    icon: Nextdayicon,
    description: "Reliable next-day delivery with overnight service.",
  },
  {
    title: "Economical Service",
    icon: Economicalicon,
    description: "Affordable option for non-urgent deliveries.",
  },
  {
    title: "Out of Hours Services",
    icon: Outofhoursicon,
    description:
      "Timely deliveries with strict deadlines for pick-up/drop-off.",
  },
  {
    title: "AOG",
    icon: aeroplanimg,
    description:
      "Rapid Response Couriers: Fast, secure, and on-time delivery of urgent aircraft parts, tools, and documents, 24/7",
  },
];

export default function Service() {
  const services = useMemo(() => [...SERVICE_DATA, ...SERVICE_DATA], []);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = isMobile ? 250 : 300;
  const gap = 24; // px
  const singleSetWidth = SERVICE_DATA.length * (cardWidth + gap);

  // spring for continuous motion
  const [spring, api] = useSpring(() => ({
    x: 0,
    config: { tension: 20, friction: 0, duration: 0 },
  }));

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous animation
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

      // calculate current visible index for dots
      const normalized = Math.abs(offsetRef.current) % singleSetWidth;
      const index = Math.floor(normalized / (cardWidth + gap));
      setActiveIndex(index);

      animationFrame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrame);
  }, [api, singleSetWidth, cardWidth, gap]);

  // Drag support
  const bind = useDrag(({ movement: [mx], down }) => {
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
    <section className="py-2 2xl:mt-12" id="services">
      <div className="container px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12 mx-auto w-full">
        <motion.header
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-2xl md:text-5xl 2xl:text-6xl font-semibold text-center text-primary mb-4">
            <AnimatedText text="Services You Can Trust" delay={0.2} />
          </h2>
          <p className="font-Inter xl:text-[18px] 2xl:text-[20px] md:text-[14px] text-center md:mx-[10rem] lg:mx-[13rem] xl:mx-[18rem] 2xl:mx-[24rem] leading-[100%] tracking-wide align-middle">
            Trust Rapid Response Couriers for fast, secure, and reliable courier
            services that ensure your parcels arrive safely and on time. Count
            on us for dependable logistics you can rely on every step of the
            way.
          </p>
        </motion.header>

        <div className="relative overflow-hidden">
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
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 ${
                  isMobile ? "w-[250px]" : "w-[300px]"
                }`}
              >
                <Card
                  className="!w-full !h-full"
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  hoverEffect={true}
                  containerProps={{
                    className:
                      "!h-full !flex !flex-col !items-center !text-center",
                  }}
                  iconContainerProps={{
                    className: "!mb-4",
                  }}
                  titleProps={{
                    className: "!text-lg md:!text-xl !font-bold !mb-2",
                  }}
                  descriptionProps={{
                    className: "!text-sm md:!text-base",
                  }}
                />
              </motion.div>
            ))}
          </animated.div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {SERVICE_DATA.map((_, index) => (
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
      </div>
    </section>
  );
}
