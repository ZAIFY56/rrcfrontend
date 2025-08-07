import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common";
import { Input } from "@/components/common";

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

const TRACKING_STEPS = [
  {
    title: "Ordered",
    time: "15:30 July 3, 2025",
    completed: true,
  },
  {
    title: "Shipped",
    time: "15:45 July 3, 2025",
    completed: true,
  },
  {
    title: "Delivered",
    time: "Estimated by 17:30",
    completed: false,
  },
];

const TrackShipment = () => {
  const statusSteps = useMemo(() => TRACKING_STEPS, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-10" id="track-order">
      <div className="container px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12 mx-auto flex flex-col md:flex-row gap-8 w-full">
        <motion.div
          className="w-full md:w-1/2 bg-white p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl 2xl:text-6xl text-center md:text-start font-semibold text-primary mb-6"
            variants={titleVariants}
          >
            <AnimatedText text="Track Your Shipment" delay={0.2} />
          </motion.h1>

          <motion.div className="mb-6" variants={titleVariants}>
            <div className="relative w-full max-w-sm 2xl:max-w-xl">
              <Input
                type="text"
                placeholder="Enter tracking number"
                className="w-full !border-none h-12 md:h-14 2xl:h-[70px] pr-36 rounded-md"
                aria-label="Tracking number input"
              />
              <Button
                className="absolute top-1/2 right-1 -translate-y-1/2 h-10 !text-sm md:h-12 px-6"
                aria-label="Track shipment"
              >
                Track Shipment
              </Button>
            </div>
          </motion.div>

          <div className="relative pl-6">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-primary"></div>

            <div className="space-y-12 py-12">
              {statusSteps.map((step, index) => (
                <motion.div
                  key={`step-${index}`}
                  className="relative flex items-start min-h-[40px]"
                  custom={index}
                  variants={stepVariants}
                >
                  <motion.div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 -ml-[12px] rounded-full border-2 
                              ${step.completed ? "bg-primary border-primary" : "bg-white border-primary"}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.3, duration: 0.5 }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 },
                    }}
                  ></motion.div>

                  <div className="pl-4 flex text-center gap-20">
                    <h3 className="font-semibold 2xl:text-[24px] mt-2 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-sm 2xl:text-[16px] text-primary mt-2">
                      {step.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.p className="mt-4 2xl:text-[16px]" variants={titleVariants}>
            Tracking Number: 0000 0000 0000
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-white p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="" variants={titleVariants}>
            <p className="text-sm 2xl:text-[20px] text-end">
              Track Your Shipment offers real-time updates on your packaging
              location and delivery status. Stay informed and have peace of mind
              with our reliable courier tracking service.
            </p>
          </motion.div>
          <motion.div
            className="aspect-w-16 mt-8 aspect-h-9 dark:filter dark:grayscale"
            variants={mapVariants}
          >
            <iframe
              title="Live Shipment Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.6064542155!2d-0.43124416199484206!3d51.52860701284126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1753978732852!5m2!1sen!2s"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="w-full rounded-lg border border-gray-200"
              aria-label="Shipment location map"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrackShipment;
