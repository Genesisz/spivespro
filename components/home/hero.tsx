"use client";
import React from "react";
import Image from "next/image";
const LandingPage = () => {
    return (
        <>
            <div className="min-h-[100vh] max-w-screen relative text-center overflow-x-hidden">
                <div className="absolute top-0 left-0 w-screen h-screen">
                    <Image
                        src="/img/HeroBG Image from Spives Web App (1).svg"
                        alt="hero background"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                </div>
                <div className="absolute top-0 left-0 w-screen h-[100vh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

                <div className="flex flex-col md:flex-row px-4 md:pl-[5%] mx-auto text-white text-center md:text-left items-center justify-center gap-8 md:gap-16 h-screen relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="adumu text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-400">become a pro <br /> <span className="text-white">with ease</span></h1>
                        <p className="mt-2 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
                        <button className="mt-4 bg-orange-300 text-black px-4 py-2 rounded-md text-sm sm:text-base">Create a profile card</button>
                    </div>
                    <div className="max-w-5xl w-full relative h-full overflow-hidden flex items-end justify-center">
                        <Image
                            src="/img/Spives Web App Design (5).svg"
                            alt="Hero Illustration"
                            width={800}
                            height={800}
                            className="w-full h-auto object-contain absolute top-0 -left-15 opacity-70"
                            priority
                        />
                        <Image
                            src="/img/Untitled design (7) (1).svg"
                            alt="Hero Illustration"
                            width={1200}
                            height={1200}
                            className="w-auto h-[25rem] sm:h-[30rem] md:h-[35rem] lg:h-[40rem] relative z-10"
                            priority
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
