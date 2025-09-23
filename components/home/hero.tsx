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
                <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:pl-[5%] mx-auto text-white text-center lg:text-left items-center justify-between lg:gap-16 min-h-screen relative z-10 pt-8 lg:py-0">
                    <div />
                    {/* Text Content - Centered on mobile */}
                    <div className="max-w-3xl flex-shrink-0 lg:order-1 flex flex-col justify-center lg:justify-start h-full lg:h-auto">
                        <h1 className="adumu text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-400 leading-tight">
                            become a pro <br /> 
                            <span className="text-white">with ease</span>
                        </h1>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
                            Get noticed with professional player profile cards — your digital football identity built to impress coaches, inspire teammates, and attract scouts
                        </p>
                        <Link href="/login" className="mt-6 w-fit bg-orange-300 hover:bg-orange-400 transition-colors text-black px-6 py-3 rounded-md text-sm sm:text-base font-medium shadow-lg">
                            Create a profile card
                        </Link>
                    </div>
                    
                    {/* Hero Images - Bottom on mobile */}
                    <div className="w-full max-w-5xl relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-screen overflow-hidden flex items-end justify-center lg:order-2 mt-8 lg:mt-0">
                        {/* Background illustration - hidden on small screens to reduce clutter */}
                        <Image
                            src="/img/Spives Web App Design (5).svg"
                            alt="Hero Illustration Background"
                            width={800}
                            height={800}
                            className="hidden sm:block w-full h-auto object-contain absolute top-0 -left-4 md:-left-8 lg:-left-15 opacity-50 sm:opacity-70"
                            priority
                        />
                        
                        {/* Main hero image */}
                        <Image
                            src="/img/Spives Web App Design.svg"
                            alt="Hero Illustration"
                            width={1200}
                            height={1200}
                            className="w-auto h-[380px] xs:h-[320px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[55rem] relative z-10 object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;