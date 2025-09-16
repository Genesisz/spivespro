import React from 'react'
import Image from 'next/image'
const Hero = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-center h-fit justify-between gap-8 px-4'>
            <div className='max-w-3xl text-center lg:text-left'>
                <h1 className='adumu text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-400'>
                    FAQs
                </h1>
                <p className='mt-6 lg:mt-12 text-base sm:text-lg lg:text-xl text-white'>At Spives, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share your data when you use our website, applications, and services. By using Spives, you agree to the practices described below.</p>
            </div>

            <Image
                src="/img/2 Card 2 Design.svg"
                alt="Background"
                width={500}
                height={500}
                className="w-[15rem] sm:w-[18rem] lg:w-[20rem] h-auto flex-shrink-0"
            />
        </div>
    )
}

export default Hero
