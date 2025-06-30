"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import FootballPlatformFeatures from "@/components/home/options";
import Dashboard from "@/components/home/profile";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="min-h-[200vh] montserrat max-w-screen relative text-center overflow-x-hidden">
      <div className="absolute top-0 left-0 w-screen h-[100dvh]">
        <img
          src="/images/landing-page/hero-bg.png"
          alt="hero background"
          className="w-full h-[150%] object-cover object-bottom"
          style={{ marginTop: '-50vh' }}
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
              We&apos;re <br />{" "}
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
                Ready to get started?
              </p>
              <p className="text-white text-[16px] font-montserrat font-[400] md:font-[700]">
                Join us today and be part of the future of sports.
              </p>
              <p className="text-white text-[16px] font-montserrat font-[400] md:font-[700]">
                Don&apos;t miss out - secure your{" "}
                <span className="text-[#FF9434]">sport</span> today!
              </p>
            </motion.div>
            <motion.div
              className="flex justify-center items-center mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/register">
                <button className="w-fit bg-[#FF9434] text-black px-6 md:px-8 text-[13px] md:text-[15px] font-[600] py-3 md:py-4 rounded-sm hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
              </Link>
            </motion.div>
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
                  resources and lack of exposure hinder young athletes&apos; dreams.
                  Our profile cards provide a platform for showcasing their
                  skills, connecting them with coaches, scouts, and clubs
                  worldwide. At Spives, we believe every child&apos;s dream of
                  becoming a football star should be within reach.
                  <br />
                  <br />
                  We designed the player profile cards because every young
                  talent deserves to be seen. In many African countries, limited
                  resources and lack of exposure hinder young athletes&apos; dreams.
                  Our profile cards provide a platform for showcasing their
                  skills, connecting them with coaches, scouts, and clubs
                  worldwide. At Spives, we believe every child&apos;s dream of
                  becoming a football star should be within reach.
                </p>
                <motion.div
                  className="flex justify-start mt-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href="/register" className="w-fit bg-[#FF9434] text-black px-6 md:px-8 text-[13px] md:text-[15px] font-[600] py-3 md:py-4 rounded-sm hover:bg-opacity-90 transition-all">
                  
                      Get Started
                  </Link>
                </motion.div>
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
