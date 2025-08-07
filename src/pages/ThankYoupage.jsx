import { motion } from "framer-motion";
import image1 from "/thankyou/thank.jpg";
import icon from "/thankyou/Vector.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common";
import { Link } from "react-router-dom";

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
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
export default function ThankYouPage() {
  const navigate = useNavigate();

  const heroVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-white">
      <motion.div
        className="relative px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Background image */}
        <motion.img
          src={image1}
          alt="Thank you background"
          className="w-full h-[360px] object-cover"
          loading="lazy"
          decoding="async"
          width={1920}
          height={360}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        />

        {/* Centered card container */}
        <motion.div
          className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 mx-auto w-full max-w-2xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg text-center mx-auto "
            whileHover={{
              y: -5,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="flex justify-center mb-6"
              variants={iconVariants}
            >
              <motion.img
                src={icon}
                alt="Checkmark icon"
                className="h-16 w-16"
                width={64}
                height={64}
                decoding="async"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.5 },
                }}
              />
            </motion.div>

            <motion.h1 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-primary mb-4">
              <AnimatedText text="Thank You!" delay={0.4} />
            </motion.h1>

            <motion.p className="text-md text-gray-600 mb-8">
              Your form has been received. We will contact you shortly.
            </motion.p>
            <motion.div className="flex md:flex-row flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="primary" className="text-sm">
                  Go Back Home
                </Button>
              </Link>
              <Link to="/instant-quote">
                <Button variant="outline" className="text-sm">
                  Get a Quote
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-60 md:mt-40"
      ></motion.div>
    </div>
  );
}
