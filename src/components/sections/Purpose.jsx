import React from "react";
import { motion } from "framer-motion";
import image1 from "/purpose/Purpose1.png";
import image2 from "/purpose/purpose2.png";

// Drop letter animation component
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

// Animated text component that splits text and applies drop animation
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

export default function Purpose() {
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
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-8 2xl:mt-10">
      <div className="container mx-auto px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12 py-2 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <motion.h1
            className="text-xl md:text-3xl justify-center md:text-start 2xl:text-6xl font-semibold mb-6 flex"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <AnimatedText text="Our" delay={0.2} />
            <AnimatedText text="Mission" delay={0.2} className="text-primary" />
          </motion.h1>
          <div className="space-y-4 text-sm md:text-md relative">
            <motion.p
              className="mx-auto text-center md:text-start 2xl:text-[20px] pr-12"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              At Rapid Response Couriers, speed, reliability, and
              professionalism are at the core of everything we do. Specializing
              in same-day and urgent deliveries, we provide secure and
              time-critical courier services tailored to meet the needs of
              businesses and individuals across UK.
              <br />
              <br />
              With a dedicated team of trained couriers and a fleet ready to
              respond at a moment's notice, we ensure your packages reach their
              destination swiftly and safely. Whether it's legal documents,
              medical supplies, or high-value items, we handle every delivery
              with care and precision.
            </motion.p>
            <motion.img
              src={image1}
              alt="Courier delivering package"
              className="md:absolute dark:filter dark:grayscale hover:filter-none hover:grayscale-0 border-8 rounded border-[#F3F3F3] top-56 left-20 w-[100%] h-[18rem] 2xl:h-[25rem] z-50 object-cover"
              loading="lazy"
              width={500}
              height={400}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <motion.h1
            className="text-xl md:text-3xl justify-center md:text-start 2xl:text-6xl font-semibold mb-6 flex"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <AnimatedText text="Our" delay={0.4} />
            <AnimatedText text="Vision" delay={0.4} className="text-primary" />
          </motion.h1>
          <div className="space-y-4 text-sm md:text-md">
            <motion.p
              className="mx-auto text-center md:text-start 2xl:text-[20px] pr-12"
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              To become the UK's most trusted and efficient courier service,
              setting the standard for speed, security, and reliability —
              delivering peace of mind to every doorstep, on time, every
              time.{" "}
            </motion.p>
            <motion.img
              src={image2}
              alt="Future vision of delivery services"
              className="w-[90%] border-8 hover:filter-none hover:grayscale-0 rounded border-[#F3F3F3] z-50 object-contain dark:filter dark:grayscale"
              loading="lazy"
              width={600}
              height={400}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
