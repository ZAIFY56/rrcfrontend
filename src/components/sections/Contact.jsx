import React from "react";
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

const ContactUs = () => {
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

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contactVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-12" id="contact-us">
      <div className="container mx-auto px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12">
        <div className="bg-white overflow-hidden">
          <motion.h2
            className="text-3xl text-center md:text-start text-primary 2xl:text-6xl font-semibold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={titleVariants}
          >
            <AnimatedText text="Contact Us" delay={0.2} />
          </motion.h2>
          <div className="p-6 md:p-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="py-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={formVariants}
            >
              <h2 className="text-xl 2xl:text-[44px] font-semibold mt-2">
                Submit your Details
              </h2>
              <form
                className="space-y-4 py-4"
                action="https://formsubmit.co/huzaifa26012003@gmail.com"
                method="POST"
              >
                {/* Hidden FormSubmit Config */}
                <input
                  type="hidden"
                  name="_next"
                  value="https://rrcsdh.netlify.app/thank-you"
                />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Submission"
                />
                <input type="hidden" name="_replyto" value="%email%" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value="Thank you for contacting us! We will get back to you shortly."
                />
                <input
                  type="hidden"
                  name="_autoresponse_subject"
                  value="Thank you for contacting us"
                />

                {/* Name */}
                <motion.div custom={0} variants={fieldVariants}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-5/6 !border-none"
                    required
                    aria-label="Your name"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div custom={1} variants={fieldVariants}>
                  <Input
                    type="tel"
                    id="number"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-5/6 !border-none"
                    required
                    aria-label="Phone number"
                  />
                </motion.div>

                {/* Email */}
                <motion.div custom={2} variants={fieldVariants}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-5/6 !border-none"
                    required
                    aria-label="Email address"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  className="w-5/6"
                  custom={3}
                  variants={fieldVariants}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] align-top pt-3 resize-none"
                    aria-label="Your message"
                  ></textarea>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  custom={4}
                  variants={fieldVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    className="!w-5/6"
                    aria-label="Submit form"
                  >
                    Submit
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            <motion.div
              className="space-y-2 mt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={contactVariants}
            >
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="text-xl 2xl:text-[32px] font-semibold mt-2 mb-2">
                  Address
                </h3>
                <address className="text-gray-600 2xl:text-[20px] text-md not-italic">
                  London, United Kingdom
                </address>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-xl 2xl:text-[32px] font-semibold mt-2 mb-2">
                  Contact Info
                </h3>
                <p className="text-gray-600 2xl:text-[20px] text-md">
                  <a
                    href="mailto:info@rrcourires.co.uk"
                    className="hover:text-primary transition-colors"
                  >
                    info@rrcourires.co.uk
                  </a>
                </p>
                <p className="text-gray-600 2xl:text-[20px] text-md mt-2">
                  <a
                    href="tel:+443301335997"
                    className="hover:text-primary transition-colors"
                  >
                    +443301335997
                  </a>
                </p>
                <h3 className="text-xl 2xl:text-[32px] font-semibold mt-2 mb-2">
                  For Urgent Bookings
                </h3>
                <p className="text-gray-600 2xl:text-[20px] text-md mt-2">
                  <a
                    href="tel:+447701000420"
                    className="hover:text-primary transition-colors"
                  >
                    +447701000420
                  </a>
                </p>
              </motion.div>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3 className="text-xl 2xl:text-[32px] font-semibold mt-2">
                  Opening hours
                </h3>
                <ul className="space-y-1 text-gray-600 mt-2">
                  <li className="2xl:text-[20px] text-md">
                    Open 24/7 -we're always here for you
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactUs);
