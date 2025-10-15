"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const LandingPage = () => {
    return (
        <>
            <div className="min-h-screen max-w-screen relative text-center overflow-x-hidden">
                {/* Background Image */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                        src="/img/HeroBG Image from Spives Web App (1).svg"
                        alt="hero background"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

                {/* Main Content Container */}
                <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:pl-[5%] mx-auto text-white text-center items-center justify-center lg:justify-between lg:gap-16 min-h-screen relative z-10 pt-8 lg:py-0">
                    <div />
                    {/* Text Content - Centered on all screens */}
                    <div className="max-w-3xl flex-shrink-0 lg:order-1 flex flex-col items-center lg:items-start justify-center h-full lg:h-auto">
                        <h1 className="adumu text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-400 leading-tight">
                            become a pro <br /> 
                            <span className="text-white">with ease</span>
                        </h1>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
                            Get noticed with professional player profile cards — your digital football identity built to impress coaches, inspire teammates, and attract scouts
                        </p>
                        <Link href="/register" className="mt-6 w-fit bg-orange-300 hover:bg-orange-400 transition-colors text-black px-6 py-3 rounded-md text-sm sm:text-base font-medium shadow-lg">
                            Create a profile card
                        </Link>
                    </div>
                    
                    {/* Hero Images - Hidden on mobile, visible on large screens */}
                    <div className="hidden lg:flex w-full max-w-5xl relative h-[600px] xl:h-screen overflow-hidden items-end justify-center lg:order-2">
                        {/* Background illustration */}
                        <Image
                            src="/img/Spives Web App Design (5).svg"
                            alt="Hero Illustration Background"
                            width={800}
                            height={800}
                            className="w-full h-auto object-contain absolute top-0 -left-4 md:-left-8 lg:-left-15 opacity-50 sm:opacity-70"
                            priority
                        />
                        
                        {/* Main hero image */}
                        <Image
                            src="/img/Spives Web App Design.svg"
                            alt="Hero Illustration"
                            width={1200}
                            height={1200}
                            className="w-auto h-[500px] xl:h-[55rem] relative z-10 object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;