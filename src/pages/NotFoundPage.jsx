import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/common/button/Button";

// Animation variants
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

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12 py-16 max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div variants={scaleIn} className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary opacity-20">
            404
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={fadeInUp} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <Button variant="primary">Go Back Home</Button>
          </Link>
          <Link to="/instant-quote">
            <Button variant="outline">Get a Quote</Button>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">
            Need help? Here are some useful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/instant-quote"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Get Instant Quote
            </Link>
            <Link
              to="/terms-condition"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Terms & Conditions
            </Link>
            <a
              href="#contact"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
