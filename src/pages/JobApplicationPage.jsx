import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common";
import {
  FaArrowLeft,
  FaCheck,
  FaArrowRight,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const DEFAULT_JOB_DATA = {
  title: "Full Stack Developer (Python) – Hybrid/Remote",
  type: "Full-time",
  location: "Multiple Locations",
  description:
    "Join our growing team at CacheLogic, where we value innovation, ownership, and adaptability.",
  responsibilities: [
    "Develop and maintain robust backend services",
    "Build and integrate REST and GraphQL APIs",
    "Write clean, tested, and efficient code",
  ],
  requirements: [
    "5+ years of professional experience",
    "Strong Python development skills",
    "Proficiency in modern web technologies",
  ],
  benefits: [
    "Flexible hybrid/remote work",
    "Competitive compensation",
    "Growth opportunities",
  ],
  deadline: "31/08/2025",
};

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

export default function JobApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobData = location.state?.jobData || DEFAULT_JOB_DATA;

  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("apply");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: null,
    experience: "",
    skills: "",
    currentSalary: "",
    expectedSalary: "",
    position: jobData.title,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  {
    submitError && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-red-50 text-red-600 rounded-md mb-4 flex items-start gap-2"
      >
        <FaTimes className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">Submission Error</p>
          <p>{submitError}</p>
          {submitError.includes("connection") && (
            <button
              onClick={handleSubmit}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Try Again
            </button>
          )}
        </div>
      </motion.div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Validate required fields
      const requiredFields = {
        fullName: "Full name",
        email: "Email address",
        resume: "Resume",
        experience: "Years of experience",
        skills: "Skills",
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !formData[key])
        .map(([_, label]) => label);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Prepare form data
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          if (value.size > 10 * 1024 * 1024) {
            throw new Error(`File ${key} is too large (max 10MB)`);
          }
          formDataToSend.append(key, value);
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      // FormSubmit configuration
      formDataToSend.append("_subject", `Job Application: ${jobData.title}`);
      formDataToSend.append("_template", "table");
      formDataToSend.append("_captcha", "false");

      // Add timeout protection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(
        "https://formsubmit.co/ajax/huzaifa26012003@gmail.com",
        {
          method: "POST",
          body: formDataToSend,
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        }
      ).finally(() => clearTimeout(timeoutId));

      // Handle HTML responses that slip through
      const contentType = response.headers.get("content-type") || "";
      let result;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        if (text.includes("success") || text.includes("Thank you")) {
          // HTML response but indicates success
          setStep(step + 1);
          return;
        }
        throw new Error("Unexpected response format");
      }

      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      if (result.success) {
        setStep(step + 1); // Show success screen
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);

      // User-friendly error messages
      let errorMessage;
      if (error.name === "AbortError") {
        errorMessage = "Request timed out. Please try again.";
      } else if (error.message.includes("Unexpected token")) {
        errorMessage = "Submission received! We'll contact you soon.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || "Submission failed. Please try again.";
      }

      setSubmitError(errorMessage);

      // Optional: Auto-retry for network errors
      if (error.message.includes("Network error") && retryCount < 2) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          handleSubmit(e);
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const nextStep = () => {
    if (step === 1 && (!formData.fullName || !formData.email)) {
      setSubmitError("Please fill in all required fields");
      return;
    }
    if (step === 2 && !formData.resume) {
      setSubmitError("Resume is required");
      return;
    }
    setSubmitError("");
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6">
          <h1 className="text-2xl font-bold">{jobData.type.toUpperCase()}</h1>
          <p className="text-sm opacity-90">
            {jobData.deadline
              ? `Apply by ${jobData.deadline}`
              : "Open application"}
          </p>
          <p className="text-lg font-medium mt-2">{jobData.title}</p>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200"></div>

        {/* Slider Tabs */}
        <div className="relative border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === "apply"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("apply")}
            >
              Apply Now
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === "details"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Job Details
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative overflow-hidden">
          {/* Job Details Panel */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "details" ? "block" : "hidden"
            }`}
          >
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Job Description
                  </h3>
                  <p className="text-gray-700">{jobData.description}</p>
                  {jobData.location && (
                    <p className="mt-2 text-gray-600">
                      <strong>Location:</strong> {jobData.location}
                    </p>
                  )}
                </div>

                {jobData.responsibilities &&
                  jobData.responsibilities.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        What You'll Do
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {jobData.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {jobData.requirements && jobData.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {jobData.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobData.benefits && jobData.benefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {jobData.benefits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t justify-center border-gray-200">
              <Button
                variant="primary"
                className="!w-auto"
                onClick={() => setActiveTab("apply")}
              >
                Continue to Application
              </Button>
            </div>
          </div>

          {/* Application Form Panel */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "apply" ? "block" : "hidden"
            }`}
          >
            {/* Progress Bar */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {step} of 3
                </span>
                <span className="text-xs text-gray-500">
                  {step === 1
                    ? "Personal Information"
                    : step === 2
                      ? "Professional Details"
                      : "Skills & Expectations"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Personal Information
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Please provide your basic contact information
                  </p>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 text-red-600 rounded-md mb-4 flex items-center gap-2"
                    >
                      <FaTimes className="flex-shrink-0" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}
                  <div className="space-y-6">
                    <motion.div
                      custom={0}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name<span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </motion.div>

                    <motion.div
                      custom={1}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Johndoe@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </motion.div>

                    <motion.div
                      custom={2}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </motion.div>

                    <div className="flex justify-between">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          onClick={() => navigate("/#careers")}
                          variant="outline"
                          className="!px-6 !py-2 flex items-center gap-2"
                          icon={<FaArrowLeft />}
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          onClick={nextStep}
                          variant="primary"
                          className="!px-6 !py-2"
                          icon={<FaArrowRight />}
                          iconPosition="right"
                        >
                          Continue
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Professional Information
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Tell us about your professional background
                  </p>

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 text-red-600 rounded-md mb-4"
                    >
                      {submitError}
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    <motion.div
                      custom={0}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="resume"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Upload Resume <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-white
                          hover:file:bg-primary-dark"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                    </motion.div>
                    <motion.div
                      custom={1}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="coverLetter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Upload Cover letter
                      </label>
                      <input
                        type="file"
                        id="coverLetter"
                        name="coverLetter"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-white
                          hover:file:bg-primary-dark"
                        accept=".pdf,.doc,.docx"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                    </motion.div>
                    <div className="flex justify-between">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="!px-6 !py-2 flex items-center gap-2"
                          icon={<FaArrowLeft />}
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          onClick={nextStep}
                          variant="primary"
                          className="!px-6 !py-2"
                          icon={<FaArrowRight />}
                          iconPosition="right"
                        >
                          Continue
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Skills & Experience
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Help us understand your qualifications
                  </p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 text-red-600 rounded-md"
                      >
                        {submitError}
                      </motion.div>
                    )}

                    <motion.div
                      custom={0}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Years of Experience{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </motion.div>

                    <motion.div
                      custom={1}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="skills"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Relevant Skills <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        rows="3"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="List your relevant skills separated by commas"
                        required
                      ></textarea>
                    </motion.div>

                    <motion.div
                      custom={2}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="currentSalary"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current Salary (optional)
                      </label>
                      <input
                        type="text"
                        id="currentSalary"
                        name="currentSalary"
                        value={formData.currentSalary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="$"
                      />
                    </motion.div>

                    <motion.div
                      custom={3}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label
                        htmlFor="expectedSalary"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expected Salary (optional)
                      </label>
                      <input
                        type="text"
                        id="expectedSalary"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="$"
                      />
                    </motion.div>

                    <div className="flex justify-between">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="!px-6 !py-2 flex items-center gap-2"
                          icon={<FaArrowLeft />}
                          disabled={isSubmitting}
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          variant="primary"
                          className="!w-auto !px-6 !py-2 flex items-center gap-2"
                          icon={
                            isSubmitting ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaCheck />
                            )
                          }
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <FaSpinner className="animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
                  >
                    <FaCheck className="h-6 w-6 text-green-600" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    <AnimatedText text="Application Submitted!" delay={0.3} />
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-6 max-w-md mx-auto"
                  >
                    Thank you for applying to the {jobData.title} position at
                    Rapid Response Couriers. We'll review your application and
                    get back to you soon.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                  >
                    <Button
                      variant="primary"
                      className="!w-auto !px-6 !py-2"
                      onClick={() => navigate("/#careers")}
                    >
                      View Other Positions
                    </Button>
                    <Button
                      variant="outline"
                      className="!px-6 !py-2"
                      onClick={() => navigate("/")}
                    >
                      Return to Home
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {new Date().getFullYear()} © All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
