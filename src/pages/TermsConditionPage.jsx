import { motion } from "framer-motion";
import termsImage from "/termscondition/t1.jpg";

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

const TermsAndConditionsPage = () => {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
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
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12 mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-semibold text-primary 2xl:text-6xl mb-8"
          variants={titleVariants}
        >
          <AnimatedText text="Our Terms & Conditions" delay={0.2} />
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="flex flex-col" variants={containerVariants}>
              <motion.section className="mb-8" variants={sectionVariants}>
                <motion.h2
                  className="text-2xl font-semibold 2xl:text-[32px] text-primary mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <AnimatedText text="Introduction" delay={0.2} />
                </motion.h2>
                <motion.p
                  className="mb-4 2xl:text-[20px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Welcome to the Rapid Response Courier website These Terms &
                  Conditions govern your use of our website and the services we
                  provide. By accessing our website and/or using our services,
                  you agree to be bound by these terms.
                </motion.p>
              </motion.section>

              <motion.section className="mb-8" variants={sectionVariants}>
                <motion.h2
                  className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <AnimatedText text="Definitions" delay={0.2} />
                </motion.h2>
                <motion.ul
                  className="list-disc 2xl:text-[20px] pl-6 space-y-2 mb-4"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.li variants={listItemVariants}>
                    "Customer": The individual or entity using our courier
                    services.
                  </motion.li>
                  <motion.li variants={listItemVariants}>
                    "Package": The item(s) to be couriered.
                  </motion.li>
                  <motion.li variants={listItemVariants}>
                    "Services": The courier and delivery services provided by
                    Rapid Response Courier.
                  </motion.li>
                  <motion.li variants={listItemVariants}>
                    "Booking": The arrangement to send a package via our
                    services.
                  </motion.li>
                </motion.ul>
              </motion.section>

              <motion.section className="mb-8" variants={sectionVariants}>
                <motion.h2
                  className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <AnimatedText text="Service Provision" delay={0.2} />
                </motion.h2>
                <motion.ul
                  className="list-disc 2xl:text-[20px] pl-6 space-y-2 mb-4"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.li variants={listItemVariants}>
                    We agree to collect, transport, and deliver Packages in
                    accordance with the agreed terms.
                  </motion.li>
                  <motion.li variants={listItemVariants}>
                    We reserve the right to refuse any Booking or service at our
                    discretion, including for safety, legal, or operational
                    reasons.
                  </motion.li>
                </motion.ul>
              </motion.section>
            </motion.div>

            <motion.section className="mb-8" variants={sectionVariants}>
              <motion.h2
                className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedText text="Booking & Payment" delay={0.2} />
              </motion.h2>
              <motion.ul
                className="list-disc 2xl:text-[20px] pl-6 space-y-2 mb-4"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li variants={listItemVariants}>
                  Bookings must be made via our website or approved channels.
                </motion.li>
                <motion.li variants={listItemVariants}>
                  Payment must be completed in full before collection unless
                  otherwise agreed.
                </motion.li>
                <motion.li variants={listItemVariants}>
                  Prices are listed on our website and are subject to change
                  without notice.
                </motion.li>
                <motion.li variants={listItemVariants}>
                  We accept payment via the methods specified on our website.
                </motion.li>
              </motion.ul>
            </motion.section>

            <motion.section className="mb-8" variants={sectionVariants}>
              <motion.h2
                className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedText text="Customer Responsibilities" delay={0.2} />
              </motion.h2>
              <motion.ul
                className="list-disc 2xl:text-[20px] pl-6 space-y-2 mb-4"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li variants={listItemVariants}>
                  The Customer must ensure the Package is properly packed,
                  labeled, and safe for transportation.
                </motion.li>
                <motion.li variants={listItemVariants}>
                  The Customer must provide accurate and complete delivery and
                  contact details.
                </motion.li>
                <motion.li variants={listItemVariants}>
                  The Customer must declare if the Package contains any items
                  requiring special handling or restrictions.
                </motion.li>
              </motion.ul>
            </motion.section>
          </motion.div>

          <motion.div
            className="lg:w-1/3 lg:self-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="p-4"
              variants={imageVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <img
                src={termsImage}
                alt="Courier service terms illustration"
                className="w-full h-auto rounded-lg object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="mt-8" variants={containerVariants}>
          <motion.section className="mb-8  p-6" variants={sectionVariants}>
            <motion.h2
              className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Liability and Insurance" delay={0.2} />
            </motion.h2>
            <motion.ul
              className="list-disc 2xl:text-[20px] pl-6 space-y-2 mb-4"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={listItemVariants}>
                We accept liability for loss or damage caused by our negligence
                up to the limits specified in our insurance policy.
              </motion.li>
              <motion.li variants={listItemVariants}>
                The Customer is advised to obtain insurance for valuable,
                fragile, or sensitive items.
              </motion.li>
              <motion.li variants={listItemVariants}>
                We are not liable for loss or damage caused by improper
                packaging or illegal contents.
              </motion.li>
            </motion.ul>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <motion.h2
              className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Prohibited Items" delay={0.2} />
            </motion.h2>
            <motion.div
              className=" p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.ul
                className="list-disc 2xl:text-[20px] pl-6 space-y-2 mb-4"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li variants={listItemVariants}>
                  The Customer shall not send illegal, hazardous, or prohibited
                  items, including but not limited to explosives, drugs,
                  perishable goods, or items that violate UK law.
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <motion.h2
              className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Delivery Timeframes" delay={0.2} />
            </motion.h2>
            <motion.ul
              className="list-disc 2xl:text-[20px] pl-6 space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={listItemVariants}>
                Estimated delivery times are provided but are not guaranteed.
              </motion.li>
              <motion.li variants={listItemVariants}>
                We are not liable for delays caused by circumstances beyond our
                control, including weather, traffic, or customs procedures.
              </motion.li>
            </motion.ul>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <motion.h2
              className="text-2xl 2xl:text-[32px]  font-semibold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Claims and Complaints" delay={0.2} />
            </motion.h2>
            <motion.ul
              className="list-disc 2xl:text-[20px] pl-6 space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={listItemVariants}>
                Claims for loss, damage, or delay must be submitted within [X]
                days of delivery.
              </motion.li>
              <motion.li variants={listItemVariants}>
                All claims are subject to investigation and applicable policies.
              </motion.li>
              <motion.li variants={listItemVariants}>
                To make a claim, contact us at [contact details].
              </motion.li>
            </motion.ul>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <motion.h2
              className="text-xl 2xl:text-[32px]  font-semibold text-primary mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Data Protection" delay={0.2} />
            </motion.h2>
            <motion.ul
              className="list-disc 2xl:text-[20px] pl-6 space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={listItemVariants}>
                We will process personal data in accordance with UK GDPR and the
                Data Protection Act 2018.
              </motion.li>
              <motion.li variants={listItemVariants}>
                Personal data will only be used for the purpose of providing our
                services and in accordance with our Privacy Policy.
              </motion.li>
            </motion.ul>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <motion.h2
              className="text-xl 2xl:text-[32px]  font-semibold text-primary mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Termination" delay={0.2} />
            </motion.h2>
            <motion.ul
              className="list-disc 2xl:text-[20px] pl-6 space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={listItemVariants}>
                We may suspend or terminate our services at any time if the
                Customer breaches these Terms & Conditions or for operational
                reasons.
              </motion.li>
            </motion.ul>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <motion.h2
              className="text-xl 2xl:text-[32px] font-semibold text-primary mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText text="Governing Law" delay={0.2} />
            </motion.h2>
            <motion.ul
              className="list-disc 2xl:text-[20px] pl-6 space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={listItemVariants}>
                These Terms & Conditions are governed by the laws of England and
                Wales.
              </motion.li>
              <motion.li variants={listItemVariants}>
                Any disputes shall be subject to the exclusive jurisdiction of
                the courts of England and Wales.
              </motion.li>
            </motion.ul>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditionsPage;
