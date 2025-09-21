import React from 'react'
import Image from 'next/image'
// Spives Web App Landing Page (1).svg
const Hero = () => {
    return (
        <div className="min-h-[45vh] md:min-h-screen h-fit max-w-screen relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 w-screen h-full">
                <Image
                    src="/img/Web Ap 1.svg"
                    alt="hero background"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            <div className='h-screen w-screen z-10 absolute top-0 left-0 bg-[#000066]/50'/>
            <div className='max-w-7xl mx-auto flex items-center text-white h-fit justify-center relative z-10 px-4'>
                <h1 className="adumu text-5xl text-center md:text-6xl lg:text-[7rem] leading-tight md:leading-[7rem]">HOW SPIVES <br /> TECHNOLOGY WORK</h1>
            </div>
        </div>
    )
}

export default Hero
