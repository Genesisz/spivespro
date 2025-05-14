"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import FootballPlatformFeatures from "@/components/home/options";
import Dashboard from "@/components/home/dashboard";

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
      // Simulate API call to /onboarding\
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
    <>
      <div className="min-h-[200vh] max-w-screen relative text-center overflow-x-hidden">
        <div className="absolute top-0 left-0 w-screen h-[100vh]">
          <img
            src="/images/landing-page/hero-bg.png"
            alt="hero background"
            className="w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-0 w-screen h-[100vh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

        <motion.div
          className="h-[100vh] flex justify-center relative items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 px-[1rem] md:px-[3rem]">
            <motion.h1
              className="text-[2.5rem] md:text-[4rem] leading-[2.5rem] md:leading-[4rem] text-white adumu"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're <br />{" "}
              <span className="text-[#FF9434] leading-[4rem] md:leading-[6rem] text-[4rem] md:text-[7rem] adumu">
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
              <p className="text-white text-[16px] mt-8 font-montserrat font-[400] md:font-[700]">
                Can't wait to see what's next?
              </p>
              <p className="text-white text-[16px] font-montserrat font-[400] md:font-[700]">
                Join the waitlist now and be among the first to exprience the
                future when we launch.
              </p>
              <p className="text-white text-[16px] font-montserrat font-[400] md:font-[700]">
                Don't miss out - secure your{" "}
                <span className="text-[#FF9434]">sport</span> today!
              </p>
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              className="flex  gap-2 justify-center items-center"
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
                  className="bg-white/30 border border-[#FF9434] placeholder:text-white min-w-[15rem] md:min-w-[17.5rem] text-center mt-8 md:mt-4 text-white px-2 text-[11px] md:text-[13px] font-[600] py-2 md:py-3 rounded-sm hover:bg-opacity-90 transition-all"
                />
                {errorMessage && (
                  <p className="text-red-400 text-[11px] mt-1">
                    {errorMessage}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-fit bg-[#FF9434] mt-8 md:mt-4 text-black px-3 md:px-6 text-[11px] md:text-[13px] font-[400] py-2 md:py-3 rounded-sm hover:bg-opacity-90 transition-all disabled:opacity-70"
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
        <div className="bg-white w-full min-h-screen overflow-y-hidden h-fit flex relative px-[1rem] md:px-[2rem] py-[3rem]">
          <motion.div
            className="max-w-7xl relative  mx-auto flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row mt-8 items-center justify-center gap-12">
              <div className="lg:w-6/12 text-start">
                <p className="text-black font-[400] md:font-[700] text-[16px]">
                  Why do you need a
                </p>
                <h1 className="text-blue-950 adumu text-4xl">
                  player profile{" "}
                  <span className="text-[#FF9434] adumu">cards</span>
                </h1>
                <p className="text-[14px] md:text-[17px] mt-3 text-black text-start font-[300]">
                  We designed the player profile cards because every young
                  talent deserves to be seen. In many African countries, limited
                  resources and lack of exposure hinder young athletes' dreams.
                  Our profile cards provide a platform for showcasing their
                  skills, connecting them with coaches, scouts, and clubs
                  worldwide. At Spives, we believe every child's dream of
                  becoming a football star should be within reach.
                  <br />
                  <br />
                  We designed the player profile cards because every young
                  talent deserves to be seen. In many African countries, limited
                  resources and lack of exposure hinder young athletes' dreams.
                  Our profile cards provide a platform for showcasing their
                  skills, connecting them with coaches, scouts, and clubs
                  worldwide. At Spives, we believe every child's dream of
                  becoming a football star should be within reach.
                </p>
                <motion.form
                  onSubmit={handleSubmit}
                  className="flex flex-row gap-2 mt-4 md:mt-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div>
                    <div className="relative rounded-sm p-[1px] bg-gradient-to-r from-[#FF9434] via-[#FF9434] to-gray-100 mt-8 md:mt-4 w-full min-w-[15rem] md:min-w-[17.5rem]">
                      <input
                        // placeholder="Enter Email"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={isLoading || isSuccess}
                        className="w-full bg-gray-100 placeholder:text-white text-center text-white px-2 text-[13px] font-[600] py-2 md:py-3 rounded-sm hover:bg-opacity-90 transition-all"
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-red-400 text-[11px] mt-1">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-fit bg-[#FF9434] mt-8 md:mt-4 text-black px-3 md:px-6 text-[11px] md:text-[13px] font-[400] py-2 md:py-3 rounded-sm hover:bg-opacity-90 transition-all disabled:opacity-70"
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
              <motion.img
                src="/images/landing-page/Player Card 2025 GLD.svg"
                className="max-h-[27.5rem] md:w-6/12"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <FootballPlatformFeatures />
      <Dashboard />
      <Footer />
    </>
  );
};

export default LandingPage;
