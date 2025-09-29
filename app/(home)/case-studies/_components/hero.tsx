import React from 'react'
import Image from 'next/image'
// Spives Web App Landing Page (1).svg
const Hero = () => {
    return (
        <div className="min-h-screen h-fit max-w-screen relative overflow-hidden ">
            <div className="absolute top-0 left-0 w-screen h-full">
                <Image
                    src="/img/Spives Web App Landing Page (1).svg"
                    alt="hero background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>
            <div className='flex items-right text-white h-full pt-64 md:pt-32 lg:pt-40 justify-center md:justify-end relative z-10 px-4'>
                <div className="max-w-3xl text-center  md:text-right">
                    <h1 className="adumu text-5xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-[6rem]">changing <br /> viewpoint</h1>
                    <p className="max-w-xl mx-auto md:mx-0 mt-4 font-[400] text-sm sm:text-base md:text-lg leading-relaxed">get to know more about the stories behind decision</p>
                    <button className="mt-6 bg-orange-300 text-black px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:bg-orange-400 transition-colors">Read Case Studies</button>
                </div>
            </div>
        </div>
    )
}

export default Hero
