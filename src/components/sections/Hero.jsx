import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroImg from "/hero/hero.png";
import heroImg2 from "/hero/hero2.png";
import { Button } from "@/components/common";
import { useNavigate } from "react-router-dom";
import vantire from "/hero/vantire.png";
import arrowicon from "/hero/arrowicon.svg";
import whatsupicon from "/hero/whatsupicon.svg";
// Drop letter animation component
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

const TireTracks = ({ scrollY, tirePositions }) => {
  const xOffset = useTransform(scrollY, [0, 500], [0, -150]);

  // Controls the length of the appearing tracks
  const trackLength = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <motion.div
      className="absolute bottom-[40px] md:bottom-[61px] lg:bottom-[90px] xl:bottom-[26px] 2xl:bottom-[45px] lg:left-[0%]  z-30 w-full"
      style={{ x: xOffset }}
    >
      <div className="relative h-[50px]">
        {/* Left tire track - horizontal line */}
        <motion.div
          className="absolute bg-gray-800 h-[3px]"
          style={{
            left: tirePositions.left,
            bottom: "10px",
            width: trackLength,
            originX: 0, // Makes the line grow from the tire position
          }}
        />

        {/* Right tire track - horizontal line */}
        <motion.div
          className="absolute bg-gray-800 h-[3px]"
          style={{
            left: tirePositions.right,
            bottom: "10px",
            width: trackLength,
            originX: 0, // Makes the line grow from the tire position
          }}
        />

        {/* Optional: Add dashed effect */}
        {[0, 1, 2, 3, 4].map((i) => (
          <React.Fragment key={i}>
            <motion.div
              className="absolute bg-gray-800 h-[3px] w-[10px]"
              style={{
                left: `calc(${tirePositions.left} + ${i * 20}px)`,
                bottom: "10px",
                opacity: 1 - i * 0.2,
              }}
            />
            <motion.div
              className="absolute bg-gray-800 h-[3px] w-[10px]"
              style={{
                left: `calc(${tirePositions.right} + ${i * 20}px)`,
                bottom: "10px",
                opacity: 1 - i * 0.2,
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};
export default function Hero() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const vanX = useTransform(scrollY, [0, 500], [0, -400]);
  const vanOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const tireRotation = useTransform(scrollY, [0, 500], [0, 1080]);
  const smoothTireRotation = useSpring(tireRotation, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  const tirePositions = {
    left: "14%", // matches left tire position
    right: "77%", // matches right tire position
  };
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-2 lg:px-12 xl:px-12 2xl:px-12 lg:py-10 xl:py-12 2xl:py-12 2xl:mb-20 sm:py-8 md:py-0 flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Section */}
        <div className="mt-6 md:w-1/2 w-full text-center md:text-left mb-8 md:mb-40">
          <motion.div
            className="text-2xl md:mb-1 justify-center md:justify-normal md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold leading-tight flex"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <AnimatedText text="Swift," delay={0.2} />
            <AnimatedText text="Secure," delay={0.2} className="text-primary" />
            <AnimatedText text="Seamless," delay={0.2} />
          </motion.div>

          <motion.div
            className="text-xl justify-center md:justify-normal md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight flex"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <AnimatedText
              text="We're Already"
              delay={0.8}
              className="text-primary"
            />
            <AnimatedText text="Rolling Out!" delay={0.8} />
          </motion.div>

          <motion.div
            className="2xl:my-8 2xl:mr-44"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <p className="font-Inter mb-6 xl:text-[20px] 2xl:text-[20px] md:text-[14px] leading-[100%] tracking-wide align-middle">
              Our team specializes in fast, reliable deliveries for urgent
              needs. No matter the deadline, we're already on the move to ensure
              your order arrives on time. Trust us to handle your last-minute
              requests with speed and precision.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Button
              variant="primary"
              onClick={() => {
                const phoneNumber = "+447701000420";
                const message = "Hello, I have a question about your services";
                window.open(
                  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                  "_blank"
                );
              }}
              className="!w-auto h-[48px] md:!w-[215px] sm:!text-xs md:h-[48px]"
            >
              <img src={whatsupicon} alt="WhatsApp Icon" />
              Book a Delivery
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/instant-quote")}
              className="!w-auto lg:!w-[175px] h-[48px] md:!w-[215px] sm:!text-xs md:h-[48px]"
              icon={<img src={arrowicon} className="!w-full !h-full " />}
            >
              Instant Quote
            </Button>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <div className="2xl:ml-18 md:w-1/2 w-full relative h-[320px] md:h-[400px] lg:h-[500px] 2xl:h-[600px] mb-8 md:mb-0">
          {/* People and Boxes Image */}
          <motion.img
            src={heroImg2}
            alt="Team handling packages professionally"
            className="absolute dark:filter dark:grayscale hover:filter-none hover:grayscale-0 top-10 md:top-16 lg:top-20 xl:top-16 2xl:top-10 left-32 md:left-44 lg:left-56 xl:left-72 2xl:left-92 w-[55%] 2xl:w-[60%] z-10 object-contain"
            width={499}
            height={330}
            loading="lazy"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          />
          {/* Tagline Text */}
          <motion.div
            className="absolute font-inter top-24 md:top-32 lg:top-44 xl:top-44 2xl:top-48 right-10 md:right-6 lg:right-6 xl:right-18 2xl:right-16 z-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-primary font-bold text-xl sm:text-2xl md:text-2xl  xl:text-4xl 2xl:text-5xl leading-tight">
              <AnimatedText text="ON TIME" delay={1.2} />
            </div>
            <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl  xl:text-5xl 2xl:text-6xl leading-tight">
              <AnimatedText text="EVERY TIME" delay={1.4} />
            </div>
          </motion.div>

          <TireTracks scrollY={scrollY} tirePositions={tirePositions} />
          <motion.div
            className="absolute bottom-8 md:bottom-14 lg:bottom-20 xl:bottom-2 2xl:bottom-6 z-30"
            style={{ x: vanX, opacity: vanOpacity }}
          >
            <motion.img
              src={heroImg}
              alt="Modern delivery van in motion"
              className="w-full sm:w-[90%] md:w-[932px] object-contain sm:left-4 2xl:left-2 relative"
              width={900}
              height={600}
              loading="lazy"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            />

            {/* Tires */}
            <motion.img
              src={vantire}
              alt="Rear tire"
              className="absolute bottom-4 md:bottom-4 lg:bottom-5 xl:bottom-7 2xl:bottom-8 left-[10%] md:left-[14%] lg:left-[14%] xl:left-[13%] 2xl:left-[11%] w-[42px] md:w-[48px] lg:w-[58px] lg:h-[58px] xl:w-[70px] xl:h-[70px] 2xl:w-[88px] 2xl:h-[88px] z-40"
              style={{ rotate: smoothTireRotation }}
            />
            <motion.img
              src={vantire}
              alt="Front tire"
              className="absolute bottom-4 md:bottom-4 lg:bottom-5 xl:bottom-7  2xl:bottom-8 left-[73%] md:left-[77%] lg:left-[76%] 2xl:left-[74%] w-[42px] md:w-[48px] lg:w-[58px] lg:h-[58px]  xl:w-[70px] xl:h-[70px] 2xl:w-[88px] 2xl:h-[88px] z-40"
              style={{ rotate: smoothTireRotation }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
