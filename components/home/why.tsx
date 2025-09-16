import React from 'react'
import Image from 'next/image'
const Why = () => {
    return (
        <div className='h-screen relative'>
            <div className="absolute top-0 left-0 w-screen h-screen">
                <Image
                    src="/img/Soccer Game Concept (2).svg"
                    alt="hero background"
                    // fill
                    width={1000}
                    priority
                    height={1000}
                    className="object-cover object-center w-screen h-screen"
                    sizes="100vw"
                    quality={100}
                />
            </div>
            <div className="absolute top-0 left-0 w-screen h-[100vh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full gap-8 md:gap-16 relative z-10 text-white text-center md:text-right px-4'>
                <Image
                    src="/img/Card Design for Players (1).svg"
                    alt="Hero Illustration"
                    width={1200}
                    height={1200}
                    className="w-auto h-[20rem] sm:h-[24rem] md:h-[27.5rem]"
                    priority
                />
                <div className='max-w-xl w-full'>
                    <h2 className='adumu text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8'>Why do you need a <br /> player profile card?</h2>
                    <p className='text-sm sm:text-base'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                        <br /><br />
                        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                        </p>
                        <button className='bg-white text-black mt-6 md:mt-8 px-4 py-2 rounded-md text-sm sm:text-base'>
                            How it works
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Why
