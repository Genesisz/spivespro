import React from 'react'
import Image from 'next/image'
// Spives Web App Landing Page (1).svg
const Hero = () => {
    return (
        <div className="min-h-[70vh] h-fit max-w-screen relative overflow-hidden">
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
            <div className='max-w-7xl mx-auto flex items-center text-white h-full mt-20 md:mt-40 justify-center md:justify-end relative z-10 px-4'>
                <div className="max-w-3xl text-center md:text-right">
                    <h1 className="adumu text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-[6rem]">changing <br /> viewpoint</h1>
                    <p className="max-w-xl mx-auto md:mx-0 mt-4 font-[400] text-sm sm:text-base md:text-lg">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,</p>
                    <button className="mt-4 bg-orange-300 text-black px-4 py-2 rounded-md text-sm sm:text-base">Read Case Studies</button>
                </div>
            </div>
        </div>
    )
}

export default Hero
