import React from 'react'
import Image from 'next/image'

const Why = () => {
    return (
        <div className='min-h-screen relative'>
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full">
                <Image
                    src="/img/Soccer Game Concept (2).svg"
                    alt="hero background"
                    width={1000}
                    priority
                    height={1000}
                    className="object-cover object-center w-full h-full"
                    sizes="100vw"
                    quality={100}
                />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

            {/* Main Content Container */}
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-end min-h-screen gap-6 sm:gap-8 lg:gap-16 relative z-10 text-white text-center lg:text-right px-4 sm:px-6 md:px-8 py-8 lg:py-0'>
                
                {/* Player Card Image */}
                <div className="flex-shrink-0 order-1 lg:order-1">
                    <Image
                        src="/img/Card Design for Players (1).svg"
                        alt="Player Profile Card"
                        width={1200}
                        height={1200}
                        className="w-auto h-[350px] xs:h-[380px] sm:h-[420px] md:h-[360px] lg:h-[400px] xl:h-[440px] object-contain"
                        priority
                    />
                </div>
                
                {/* Text Content */}
                <div className='max-w-xl w-full order-2 lg:order-2'>
                    <h2 className='adumu text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl mb-4 sm:mb-6 lg:mb-8 leading-tight'>
                        Why do you need a <br className="hidden sm:block" /> 
                        <span className="sm:hidden">player profile card?</span>
                        <span className="hidden sm:inline">player profile card?</span>
                    </h2>
                    
                    <p className='text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0'>
                        Our player profile cards serve as digital spotlights for young African athletes with extraordinary potential. In regions where visibility is limited and opportunities scarce, these profiles bridge crucial gaps between talent and opportunity.
                        <br /><br />
                        Each card showcases an athlete&apos;s unique abilities, performance metrics, and career highlights—creating a professional digital identity that catches the attention of scouts, coaches, and clubs worldwide.
                    </p>
                    
                    <button className='bg-white hover:bg-gray-100 transition-colors text-black mt-6 sm:mt-8 px-6 py-3 rounded-md text-sm sm:text-base font-medium shadow-lg'>
                        How it works
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Why