import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import image1 from "/courierpartner/courierpartner1.png";
import image2 from "/courierpartner/courierpartner2 (3).png";
import image3 from "/courierpartner/courierpartner3.png";
import image4 from "/courierpartner/courierpartner4.jpg";
import image5 from "/courierpartner/courierpartner5.png";
import image6 from "/courierpartner/courierpartner6 (3).png";
import image7 from "/courierpartner/courierpartner7.png";
import image8 from "/courierpartner/courierpartner8.png";
import image9 from "/courierpartner/courierpartner9.png";
import image10 from "/courierpartner/courierpartner10.png";
import image11 from "/courierpartner/courierpartner11.png";
import font1 from "/courierpartner/font1.png";
import font2 from "/courierpartner/font2.png";
import font3 from "/courierpartner/font3.png";
import font4 from "/courierpartner/font4.png";
import font5 from "/courierpartner/font5.png";
import font6 from "/courierpartner/font6.png";
import font7 from "/courierpartner/font7.png";
import font8 from "/courierpartner/font8.png";
import font9 from "/courierpartner/font9 (2).png";
import font10 from "/courierpartner/font10.png";
import font11 from "/courierpartner/font11.png";
import { Card } from "@/components/common";

// Drop letter animation
const DropLetter = ({ children, delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, y: -50, rotateX: -90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.span>
);

const AnimatedText = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-2">
          {word.split("").map((letter, li) => (
            <DropLetter key={li} delay={delay + wi * 0.1 + li * 0.05}>
              {letter}
            </DropLetter>
          ))}
        </span>
      ))}
    </div>
  );
};

const PARTNER_DATA = [
  {
    logo: image1,
    brand: font1,
  },
  {
    logo: image2,
    brand: font2,
  },
  {
    logo: image3,
    brand: font3,
  },
  {
    logo: image4,
    brand: font4,
  },
  {
    logo: image5,
    brand: font5,
  },
  {
    logo: image6,
    brand: font8,
  },
  {
    logo: image7,
    brand: font7,
  },
  {
    logo: image8,
    brand: font6,
  },
  {
    logo: image9,
    brand: font9,
  },
  {
    logo: image10,
    brand: font10,
  },
  {
    logo: image11,
    brand: font11,
  },
];
export default function CourierPartners() {
  // duplicate array for seamless loop
  const partners = useMemo(() => [...PARTNER_DATA, ...PARTNER_DATA], []);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = isMobile ? 250 : 280;
  const gap = 24;
  const singleSetWidth = PARTNER_DATA.length * (cardWidth + gap);

  const [spring, api] = useSpring(() => ({
    x: 0,
    config: { tension: 20, friction: 0, duration: 0 },
  }));

  // detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // infinite auto-scroll
  const offsetRef = useRef(0);
  useEffect(() => {
    let frame;
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

      frame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frame);
  }, [api, singleSetWidth, cardWidth, gap]);

  // drag interaction
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
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.header
          className="text-center max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-2xl md:text-5xl font-semibold text-primary mb-4">
            <AnimatedText text="Our Happy Customers" delay={0.2} />
          </h2>
          <p className="text-md 2xl:text-[20px] 2xl:mx-[6rem] lg:mx-[12rem] text-gray-600">
            We collaborate with industry leaders to deliver exceptional
            service...
          </p>
        </motion.header>

        {/* Infinite slider */}
        <div className="relative overflow-hidden">
          <animated.div
            className="flex gap-6 py-4 cursor-grab active:cursor-grabbing"
            style={{
              width: partners.length * (cardWidth + gap),
              x: spring.x,
              touchAction: "none",
            }}
            {...bind()}
          >
            {partners.map((partner, index) => (
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Card
                  className="!p-0 dark:filter dark:grayscale hover:filter-none hover:grayscale-0 !min-h-[200px] !max-w-none !w-full aspect-[4/3] relative overflow-hidden"
                  hoverEffect={true}
                >
                  <motion.img
                    src={partner.logo}
                    alt={`Partner company ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    width={600}
                    height={450}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <motion.img
                      src={partner.brand}
                      alt={`${partner.brand} brand name`}
                      className="max-w-[70%] max-h-[40%] object-contain z-10"
                      loading="lazy"
                      width={300}
                      height={100}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </animated.div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {PARTNER_DATA.map((_, index) => (
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
