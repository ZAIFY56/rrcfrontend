import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Service from "@/components/sections/Service";
import WhyChoose from "@/components/sections/WhyChoose";
import Purpose from "@/components/sections/Purpose";
import Feedback from "@/components/sections/Feedback";
import SustainabilityFeatures from "@/components/sections/SustainabilityFeatures";
import CourierPartners from "@/components/sections/CourierPartners";
import NewsAndArticles from "../components/sections/NewsAndArticles";
// import TrackShipment from "../components/sections/TrackShipment";
import Contact from "../components/sections/Contact";
import Careers from "../components/sections/Careers";
// Animation variants for different effects
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

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <>
      {/* Hero Section - Fade in from left */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInLeft}
      >
        <Hero />
      </motion.div>

      {/* Service Section - Fade in up with stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <Service />
      </motion.div>

      {/* WhyChoose Section - Fade in from right */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInRight}
      >
        <WhyChoose />
      </motion.div>

      {/* Purpose Section - Scale in */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleIn}
      >
        <Purpose />
      </motion.div>

      {/* Feedback Section - Fade in up */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Feedback />
      </motion.div>

      {/* SustainabilityFeatures Section - Fade in from left */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInLeft}
      >
        <SustainabilityFeatures />
      </motion.div>

      {/* CourierPartners Section - Fade in up with stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <CourierPartners />
      </motion.div>
      {/* TrackShipment Section - Scale in
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleIn}
      >
        <Careers />
      </motion.div> */}

      {/* NewsAndArticles Section - Fade in from right */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInRight}
      >
        <NewsAndArticles />
      </motion.div>

      {/* Contact Section - Fade in up */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Contact />
      </motion.div>
    </>
  );
}
