"use client";
import React from "react";
import Footer from "@/components/layout/footer";
import FootballPlatformFeatures from "@/components/home/options";
import Review from "@/components/home/review";
import Image from "next/image";
import LandingPage from "@/components/home/hero";
import Why from "@/components/home/why";

const Page = () => {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <LandingPage />
      <Why />
      <FootballPlatformFeatures />
      <Review />
      <Image
        src="/img/Spives Web App Header 1.svg"
        alt="Hero Illustration"
        width={1200}
        height={1200}
        className="w-full max-w-screen h-auto relative z-10 top-10 px-4 sm:px-0"
        priority
      />
      <Footer />
    </div>
  );
};

export default Page;
