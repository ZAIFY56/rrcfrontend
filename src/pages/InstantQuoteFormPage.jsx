import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import heroimg from "/formgetquote/getqoute1.jpg";
import backIcon from "/getquote/prevoius.png";
import { Input, Button } from "@/components/common";
import image1 from "/formgetquote/form3.jpg";
import image2 from "/formgetquote/form1.jpg";
import image3 from "/formgetquote/form2.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";

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

const AddressSection = ({
  title,
  formData,
  prefix = "",
  handleInputChange,
}) => {
  const sectionVariants = {
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

  // Helper function to get prefixed field value
  const getFieldValue = (fieldName) => {
    const fullFieldName = prefix ? `${prefix}_${fieldName}` : fieldName;
    return formData[fullFieldName] || "";
  };

  return (
    <motion.div
      className="p-6 pb-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <motion.h2
        className="text-xl 2xl:text-[32px] font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedText text={title} delay={0.2} />
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div custom={0} variants={fieldVariants}>
          <Input
            type="text"
            placeholder="First Name *"
            name={`${prefix}_first_name`}
            value={getFieldValue("first_name")}
            onChange={handleInputChange}
            className="w-full !bg-white !border !border-primary placeholder:font-medium"
            required
          />
        </motion.div>
        <motion.div custom={1} variants={fieldVariants}>
          <Input
            type="text"
            placeholder="Last Name *"
            name={`${prefix}_last_name`}
            value={getFieldValue("last_name")}
            onChange={handleInputChange}
            className="w-full !bg-white !border !border-primary placeholder:font-medium"
            required
          />
        </motion.div>
        <motion.div
          className="md:col-span-2"
          custom={2}
          variants={fieldVariants}
        >
          <Input
            type="tel"
            placeholder="Telephone number *"
            name={`${prefix}_telephone`}
            value={getFieldValue("telephone")}
            onChange={handleInputChange}
            className="w-full !bg-white !border !border-primary placeholder:font-medium"
            required
          />
        </motion.div>
        <motion.div
          className="md:col-span-2"
          custom={3}
          variants={fieldVariants}
        >
          <Input
            type="text"
            placeholder="Address Line *"
            name={`${prefix}_address_line`}
            value={getFieldValue("address_line")}
            onChange={handleInputChange}
            className="w-full !bg-white !border !border-primary placeholder:font-medium"
            required
          />
        </motion.div>
        <motion.div custom={4} variants={fieldVariants}>
          <Input
            type="text"
            placeholder="City *"
            name={`${prefix}_city`}
            value={getFieldValue("city")}
            onChange={handleInputChange}
            className="w-full !bg-white !border !border-primary placeholder:font-medium"
            required
          />
        </motion.div>
        <motion.div custom={5} variants={fieldVariants}>
          <Input
            type="text"
            placeholder="Postcode *"
            name={`${prefix}_postcode`}
            value={getFieldValue("postcode")}
            onChange={handleInputChange}
            className="w-full !bg-white !border !border-primary placeholder:font-medium"
            required
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
const BackButton = () => (
  <motion.div
    onClick={() => window.history.back()}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{
      scale: 1.05,
      x: -5,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.95 }}
  >
    <Button className="flex items-center gap-2 !bg-white !text-primary">
      <motion.img
        src={backIcon}
        alt="Back"
        className="h-3 w-3 2xl:w-[12px]"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(48%) sepia(13%) saturate(1532%) hue-rotate(122deg) brightness(90%) contrast(87%)",
        }}
        whileHover={{
          x: -3,
          transition: { duration: 0.2 },
        }}
      />
      Back
    </Button>
  </motion.div>
);

export default function InstantQuoteFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVanPrice, setSelectedVanPrice] = useState(() => {
    const savedPrice = sessionStorage.getItem("quotePrice");
    return savedPrice
      ? parseFloat(savedPrice)
      : location.state?.totalPrice || 90.0;
  }); // Get dates and times from location state
  const [pickupDate, setPickupDate] = useState(
    location.state?.pickupDate || ""
  );
  const [pickupTime, setPickupTime] = useState(
    location.state?.pickupTime || ""
  );
  const [dropoffDate, setDropoffDate] = useState(
    location.state?.dropoffDate || ""
  );
  const [dropoffTime, setDropoffTime] = useState(
    location.state?.dropoffTime || ""
  );

  const [paymentMethod, setPaymentMethod] = useState(() => {
    const savedMethod = sessionStorage.getItem("quotePaymentMethod");
    return savedMethod || "cash";
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    // Initialize form data from sessionStorage if available
    const savedData = sessionStorage.getItem("quoteFormData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  // Restore from sessionStorage on mount
  useEffect(() => {
    const savedPickupDate = sessionStorage.getItem("quotePickupDate");
    const savedPickupTime = sessionStorage.getItem("quotePickupTime");
    const savedDropoffDate = sessionStorage.getItem("quoteDropoffDate");
    const savedDropoffTime = sessionStorage.getItem("quoteDropoffTime");

    if (savedPickupDate) setPickupDate(savedPickupDate);
    if (savedPickupTime) setPickupTime(savedPickupTime);
    if (savedDropoffDate) setDropoffDate(savedDropoffDate);
    if (savedDropoffTime) setDropoffTime(savedDropoffTime);
  }, []);

  // When receiving props from location state
  useEffect(() => {
    if (location.state?.pickupDate) {
      setPickupDate(location.state.pickupDate);
      sessionStorage.setItem("quotePickupDate", location.state.pickupDate);
    }
    if (location.state?.pickupTime) {
      setPickupTime(location.state.pickupTime);
      sessionStorage.setItem("quotePickupTime", location.state.pickupTime);
    }
    if (location.state?.dropoffDate) {
      setDropoffDate(location.state.dropoffDate);
      sessionStorage.setItem("quoteDropoffDate", location.state.dropoffDate);
    }
    if (location.state?.dropoffTime) {
      setDropoffTime(location.state.dropoffTime);
      sessionStorage.setItem("quoteDropoffTime", location.state.dropoffTime);
    }
    if (location.state?.totalPrice) {
      setSelectedVanPrice(location.state.totalPrice);
      sessionStorage.setItem(
        "quotePrice",
        location.state.totalPrice.toString()
      );
    }
  }, [location.state]);

  // Check for Stripe redirect with success and restore form data
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("payment_success") === "true") {
      setPaymentCompleted(true);
      // Remove the query param from URL without reload
      window.history.replaceState({}, document.title, window.location.pathname);

      // Restore form data from sessionStorage
      const savedData = sessionStorage.getItem("quoteFormData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    // Save to sessionStorage on each change
    sessionStorage.setItem("quoteFormData", JSON.stringify(updatedData));
  };

  // Handle pickup date change
  const handlePickupDateChange = (e) => {
    const value = e.target.value;
    setPickupDate(value);
    sessionStorage.setItem("quotePickupDate", value);

    // If pickup date changes and is after current dropoff date, reset dropoff date
    if (value > dropoffDate) {
      setDropoffDate(value);
      sessionStorage.setItem("quoteDropoffDate", value);
    }
  };

  // Handle pickup time change
  const handlePickupTimeChange = (e) => {
    const value = e.target.value;
    setPickupTime(value);
    sessionStorage.setItem("quotePickupTime", value);
  };

  // Handle dropoff date change
  const handleDropoffDateChange = (e) => {
    const value = e.target.value;
    // Ensure dropoff date is not before pickup date
    if (value >= pickupDate) {
      setDropoffDate(value);
      sessionStorage.setItem("quoteDropoffDate", value);
    }
  };

  // Handle dropoff time change
  const handleDropoffTimeChange = (e) => {
    const value = e.target.value;
    setDropoffTime(value);
    sessionStorage.setItem("quoteDropoffTime", value);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataEncoded = new URLSearchParams();

      // Add all form data fields
      for (const key in formData) {
        formDataEncoded.append(key, formData[key]);
      }

      // Determine the actual payment method used
      const actualPaymentMethod = paymentCompleted ? "card" : paymentMethod;

      // Add additional fields with correct payment method
      formDataEncoded.append("paymentMethod", actualPaymentMethod);
      formDataEncoded.append("amount", selectedVanPrice);
      formDataEncoded.append("pickup_date", pickupDate);
      formDataEncoded.append("pickup_time", pickupTime);
      formDataEncoded.append("dropoff_date", dropoffDate);
      formDataEncoded.append("dropoff_time", dropoffTime);
      formDataEncoded.append(
        "paymentStatus",
        paymentCompleted
          ? "paid"
          : actualPaymentMethod === "cash"
            ? "pending"
            : "paid"
      );
      formDataEncoded.append("_captcha", "false");
      formDataEncoded.append("_template", "table");
      formDataEncoded.append("_subject", "New Quote Request");

      // Rest of your submission code...
      const response = await fetch(
        "https://formsubmit.co/ajax/01bd15225bbe2ad46eaa9a30b3978ce5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formDataEncoded.toString(),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed");
      }

      sessionStorage.removeItem("quoteFormData");
      sessionStorage.removeItem("quotePrice");
      navigate("/thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      // Show error to user
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("quoteFormData", JSON.stringify(formData));
    sessionStorage.setItem("quotePrice", selectedVanPrice.toString());

    // Save form data before payment
    sessionStorage.setItem("quoteFormData", JSON.stringify(formData));

    if (paymentMethod === "cash" || paymentCompleted) {
      await handleSubmitForm(e);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Initialize Stripe with validation
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

      if (!stripe) {
        throw new Error(
          "Stripe failed to initialize. Please check your public key."
        );
      }
      sessionStorage.setItem("quotePaymentMethod", paymentMethod);

      // 2. Create checkout session
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: selectedVanPrice,
            metadata: {
              ...formData,
              pickup_date: pickupDate,
              pickup_time: pickupTime,
              dropoff_date: dropoffDate,
              dropoff_time: dropoffTime,
            },
            return_url: `${window.location.origin}${window.location.pathname}?payment_success=true&pickup_date=${encodeURIComponent(pickupDate)}&pickup_time=${encodeURIComponent(pickupTime)}&dropoff_date=${encodeURIComponent(dropoffDate)}&dropoff_time=${encodeURIComponent(dropoffTime)}`,
          }),
        }
      );

      // 3. Validate response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to create payment session"
        );
      }

      const session = await response.json();

      // 4. Validate session ID
      if (!session?.id) {
        console.error("Invalid session response:", session);
        throw new Error("Invalid payment session received from server");
      }

      // 5. Redirect to checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const sidebarVariants = {
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
    <div className="bg-white relative">
      <motion.div
        className="relative px-6 md:px-15 lg:px-12 xl:px-12 2xl:px-12"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <motion.img
          src={heroimg}
          alt="Hero"
          className="w-full  h-[360px] object-cover"
          loading="lazy"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        />
        <motion.div
          className="absolute mx-[4rem] lg:mx-[16rem] 2xl:rounded-lg 2xl:top-68 top-80 left-0 right-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2 className="bg-white text-primary p-6 text-xl md:text-4xl 2xl:text-6xl font-semibold text-center rounded-md">
            <AnimatedText text="Instant Quotes" delay={0.2} />
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        className="lg:hidden text-end bg-white p-4 pt-20 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BackButton className="flex ml-52 gap-2" />
      </motion.div>
      <form onSubmit={handlePayment}>
        {/* Hidden FormSubmit Config */}
        <input
          type="hidden"
          name="_next"
          value="https://rrcsdh.netlify.app/thank-you"
        />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_subject" value="New Contact Submission" />
        <input type="hidden" name="_replyto" value="%email%" />
        <input
          type="hidden"
          name="_autoresponse"
          value={`Thank you for your quote request! Here are the details we received:

Your details:
First Name: %first_name%
Last Name: %last_name%
Email: %email%
Telephone: %telephone%
Collection Date: %selected_date%
Collection Time: %selected_time%
Collection Address:
Address Line: %collection_address_line%
City: %collection_city%
Postcode: %collection_postcode%

Delivery Address:
Address Line: %delivery_address_line%
City: %delivery_city%
Postcode: %delivery_postcode%

Notes: %notes%

We'll process your request and get back to you shortly.`}
        />
        <input
          type="hidden"
          name="_autoresponse_subject"
          value="Thank you for contacting us"
        />
        <input type="hidden" name="pickup_date" value={pickupDate} />
        <input type="hidden" name="pickup_time" value={pickupTime} />
        <input type="hidden" name="dropoff_date" value={dropoffDate} />
        <input type="hidden" name="dropoff_time" value={dropoffTime} />
        <div className="container mx-auto mt-4 md:mt-14 flex flex-col lg:flex-row gap-8 px-4">
          <motion.div
            className="lg:w-3/4 bg-white"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariants}
          >
            <motion.div
              className="p-6 pb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl 2xl:text-[32px] font-semibold mb-4">
                <AnimatedText text="Your details:" delay={0.2} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Input
                    type="text"
                    placeholder="First Name *"
                    name="first_name"
                    className="w-full !bg-white !border !border-primary placeholder:font-medium"
                    required
                    value={formData.first_name || ""}
                    onChange={handleInputChange}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Input
                    type="text"
                    placeholder="Last Name *"
                    name="last_name"
                    className="w-full !bg-white !border !border-primary placeholder:font-medium"
                    required
                    value={formData.last_name || ""}
                    onChange={handleInputChange}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Input
                    type="email"
                    placeholder="Email *"
                    name="email"
                    className="w-full !bg-white !border !border-primary placeholder:font-medium"
                    required
                    value={formData.email || ""}
                    onChange={handleInputChange}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Input
                    type="tel"
                    placeholder="Telephone number *"
                    name="telephone"
                    className="w-full !bg-white !border !border-primary placeholder:font-medium"
                    required
                    value={formData.telephone || ""}
                    onChange={handleInputChange}
                  />
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="lg:hidden p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <img
                src={image1}
                alt="Courier service"
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
            </motion.div>
            <AddressSection
              title="Collection Address"
              prefix="collection"
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <motion.div
              className="lg:hidden p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <img
                src={image2}
                alt="Delivery van"
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
            </motion.div>
            <AddressSection
              title="Delivery Address"
              prefix="delivery"
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <motion.div
              className="lg:hidden p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <img
                src={image3}
                alt="Shipping package"
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="p-6 pb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl 2xl:text-[32px] font-semibold mb-2">
                <AnimatedText text="Collection & Delivery Times" delay={0.2} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm mb-2 2xl:text-[16px] font-medium">
                    Pickup:
                  </p>
                  <p className="text-sm 2xl:text-[16px]">
                    Date: {pickupDate || "Not specified"}
                  </p>
                  <p className="text-sm 2xl:text-[16px]">
                    Time: {pickupTime || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-2 2xl:text-[16px] font-medium">
                    Dropoff:
                  </p>
                  <p className="text-sm 2xl:text-[16px]">
                    Date: {dropoffDate || "Not specified"}
                  </p>
                  <p className="text-sm 2xl:text-[16px]">
                    Time: {dropoffTime || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Add date/time adjustment fields if needed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm mb-1">
                    Adjust Pickup Date:
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={handlePickupDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="p-1 border text-gray-600 rounded text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Adjust Pickup Time:
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={handlePickupTimeChange}
                    className="p-1 border text-gray-600 rounded text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Adjust Dropoff Date:
                  </label>
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={handleDropoffDateChange}
                    min={pickupDate}
                    className="p-1 border text-gray-600 rounded text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Adjust Dropoff Time:
                  </label>
                  <input
                    type="time"
                    value={dropoffTime}
                    onChange={handleDropoffTimeChange}
                    className="p-1 border text-gray-600 rounded text-sm w-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 pb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl 2xl:text-[32px] font-semibold mb-2">
                <AnimatedText text="NOTES" delay={0.2} />
              </h2>
              <p className="text-sm mb-4 2xl:text-[20px]">
                Please provide details such as dimensions, weight, loading notes
                etc.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Input
                  type="text"
                  placeholder="Any additional details to help your delivery..."
                  name="notes"
                  className="w-full 2xl:text-[16px] !2xl:w-[464px] !bg-white !border !border-primary placeholder:font-medium h-12 pt-2"
                  required
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                />
              </motion.div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              className="p-6 pb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl 2xl:text-[32px] font-semibold mb-4">
                <AnimatedText text="Payment Method" delay={0.2} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash" && !paymentCompleted}
                    onChange={() => setPaymentMethod("cash")}
                    className="mr-2 h-4 w-4"
                    disabled={paymentCompleted}
                  />
                  <label htmlFor="cash" className="text-sm 2xl:text-[20px]">
                    Pay with Cash
                  </label>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card" || paymentCompleted}
                    onChange={() => setPaymentMethod("card")}
                    className="mr-2 h-4 w-4"
                    disabled={paymentCompleted}
                  />
                  <label htmlFor="card" className="text-sm 2xl:text-[20px]">
                    Pay with Card
                  </label>
                  {paymentCompleted && (
                    <span className="ml-2 text-green-600 text-sm">
                      ✓ Payment Successful
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Terms and Conditions - Only required for form submission */}
            {!paymentCompleted && (
              <motion.div
                className="p-6 space-y-4 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mr-2 h-4 w-4 appearance-none border border-primary rounded checked:bg-primary checked:border-transparent focus:ring-0 focus:ring-offset-0"
                    required={!paymentCompleted} // Only required if payment not completed
                  />
                  <span className="text-sm 2xl:text-[20px]">
                    I have read and accepted the T&Cs{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <input
                    type="checkbox"
                    id="loading"
                    name="loading_notice"
                    className="mr-2 h-4 w-4 appearance-none border border-primary rounded checked:bg-primary checked:border-transparent focus:ring-0 focus:ring-offset-0"
                    required={!paymentCompleted} // Only required if payment not completed
                  />
                  <span className="text-sm 2xl:text-[20px]">
                    I have read and agree to the loading notice below{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="p-6 flex flex-col items-start pt-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-2xl font-bold text-primary">
                  £{selectedVanPrice.toFixed(2)}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4 px-8 !w-auto py-3 bg-primary text-white rounded font-medium flex items-center transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      {paymentCompleted
                        ? "Complete Booking"
                        : paymentMethod === "cash"
                          ? "Book Now"
                          : "Pay Now"}
                      <FaArrowRight className="md:ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="hidden lg:flex lg:w-1/4 flex-col gap-6 h-fit"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sidebarVariants}
          >
            <motion.div
              className="bg-white p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <BackButton className="2xl:text-xl" />
            </motion.div>
            <motion.div
              className="bg-white p-4 rounded-lg space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={image1}
                alt="Courier service"
                className="w-full h-auto rounded-md"
                loading="lazy"
                variants={imageVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
              <motion.img
                src={image2}
                alt="Delivery van"
                className="md:pt-20 2xl:pt-0 w-full h-auto rounded-md"
                loading="lazy"
                variants={imageVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
              <motion.img
                src={image3}
                alt="Shipping package"
                className="md:pt-44 2xl:pt-0 w-full h-auto rounded-md"
                loading="lazy"
                variants={imageVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
