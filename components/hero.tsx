"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to /onboarding
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    handleSubmit(new Event("submit") as any);
  };

  return (
    <div className="h-[200vh] max-w-screen text-center overflow-x-hidden relative">
      <div className="absolute top-0 border border-red-500 left-0 w-screen h-[200vh]">
        <img
          src="/images/landing-page/hero-bg.png"
          alt="hero background"
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-0 left-0 w-screen h-[200vh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

      <motion.div
        className="h-[100vh] flex justify-center relative items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10 px-[1rem] md:px-[3rem]">
          <motion.h1
            className="text-[2.5rem] md:text-[5rem] leading-[2.5rem] md:leading-[5rem] text-[#FF9434] adumu"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're <br />{" "}
            <span className="text-white leading-[4rem] md:leading-[8rem] text-[4rem] md:text-[8rem] adumu">
              building <br /> something
            </span>{" "}
            <br />
            amazing
          </motion.h1>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-white text-[16px] mt-8 font-montserrat font-[700]">
              Can't wait to see what's next?
            </p>
            <p className="text-white text-[16px] font-montserrat font-[700]">
              Join the waitlist now and be among the first to exprience the
              future when we launch.
            </p>
            <p className="text-white text-[16px] font-montserrat font-[700]">
              Don't miss out - secure your{" "}
              <span className="text-[#FF9434]">sport</span> today!
            </p>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-2 justify-center items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div>
              <input
                // placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading || isSuccess}
                className="bg-white/30 border border-[#FF9434] placeholder:text-white min-w-[25rem] text-center mt-8 md:mt-4 text-white px-2 text-[11px] font-[600] py-2 rounded-sm hover:bg-opacity-90 transition-all"
              />
              {errorMessage && (
                <p className="text-red-400 text-[11px] mt-1">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-fit bg-white mt-8 md:mt-4 text-black px-6 text-[11px] font-[600] py-2 rounded-sm hover:bg-opacity-90 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : isSuccess ? (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Added to waitlist!
                </div>
              ) : (
                "Join waitlist now"
              )}
            </button>
          </motion.form>
        </div>
      </motion.div>
      <motion.div
        className="max-w-7xl relative px-[1rem] md:px-[2rem] mx-auto h-[100vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-white font-montserrat font-[700] text-[16px]">
          Why do you need a
        </p>
        <h1 className="text-white adumu text-6xl">
          player profile <span className="text-[#FF9434] adumu">cards</span>
        </h1>
        <div className="flex flex-col md:flex-row mt-8 items-center justify-center gap-12 px-[1rem] md:px-0">
          <p className="text-[17px] mt-4 text-white text-start md:w-6/12 font-[600]">
            We designed the player profile cards because every young talent
            deserves to be seen. In many African countries, limited resources
            and lack of exposure hinder young athletes' dreams. Our profile
            cards provide a platform for showcasing their skills, connecting
            them with coaches, scouts, and clubs worldwide. At Spives, we
            believe every child's dream of becoming a football star should be
            within reach.
            <br />
            <br />
            We designed the player profile cards because every young talent
            deserves to be seen. In many African countries, limited resources
            and lack of exposure hinder young athletes' dreams. Our profile
            cards provide a platform for showcasing their skills, connecting
            them with coaches, scouts, and clubs worldwide. At Spives, we
            believe every child's dream of becoming a football star should be
            within reach.
          </p>
          <motion.img
            src="/images/landing-page/2card design for players 1.png"
            className="max-h-[27.5rem] md:w-4/12"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
        </div>

      </motion.div>
    </div>
  );
};

export default LandingPage;
