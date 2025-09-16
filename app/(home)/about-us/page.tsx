import React from 'react'
import Image from 'next/image'
import Footer from '@/components/layout/footer'

const team = [
    {
        name: "Genesis Chukuma",
        role: "Product & Business",
        desc: "Genesis drives the vision of Spives, shaping how young African talents get seen through technology and design. With years of experience in product design, marketing, and innovation, he leads the creation of football profile cards that balance usability, trust, and impact. His focus is on making Spives the bridge between grassroots players and the global football stage.",
        dept: "MARKETING",
        tag: "BUSINESS DESIGNS",
        img: "/img/Genesis Card 1 (1).svg"
    },
    {
        name: "Funmi Ogunseyinde",
        role: "Partnetship & Operations",
        desc: "Funmi builds the backbone of Spives by forming strong partnerships with academies, scouts, and community clubs across Africa. With expertise in operations and strategy, she ensures that the platform not only runs smoothly but also grows sustainably. Her mission is to open doors for young footballers by connecting them to real opportunities through trusted networks.",
        dept: "Management",
        tag: "BUSINESS Operations",
        img: "/img/Funmi Card (1).svg"
    },
]

const Page = () => {
    return (
        <>
        <div className="min-h-screen h-fit max-w-screen relative text-center overflow-x-hidden">
            <div className="absolute top-0 left-0 w-screen h-full">
                <Image
                    src="/img/HeroBG Image from Spives Web App (1).svg"
                    alt="hero background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>
            <div className="absolute top-0 left-0 w-screen h-full bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

            <div className="flex flex-col px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-30 max-w-7xl mx-auto text-white text-center md:text-left gap-6 sm:gap-8 lg:gap-16 h-fit relative z-10">
                {/* Header Section */}
                <div className='w-full flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-6'>
                    <h1 className='adumu text-4xl sm:text-6xl lg:text-8xl leading-tight'>about us</h1>
                    <p className='text-lg sm:text-2xl lg:text-4xl max-w-sm text-center sm:text-right'>The great minds behind our work</p>
                </div>

                {/* Team Members Section */}
                <div className='flex flex-col gap-8 sm:gap-12 lg:gap-16'>
                    {team.map((member, index) => (
                        <div key={index} className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start justify-between'>
                            {/* Profile Image */}
                            <div className='w-48 sm:w-56 lg:w-60 h-88 sm:h-80 lg:h-112 relative flex-shrink-0 rounded-lg overflow-hidden'>
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    width={1000}
                                    height={1000}
                                    className='h-full w-full object-cover'
                                />
                            </div>

                            {/* Content Card */}
                            <div className='flex-1 w-full lg:w-auto text-left bg-[#000066]/50 rounded-lg border-4 sm:border-6 lg:border-8 border-orange-500/20 p-4 sm:p-5 lg:p-6 min-h-64 sm:min-h-80 lg:h-112 flex flex-col justify-center'>
                                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2'>{member.name}</h2>
                                <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-orange-400 mb-3 sm:mb-4'>{member.role}</h3>
                                <p className='mb-3 sm:mb-4 text-sm sm:text-base lg:text-xl leading-relaxed flex-1'>{member.desc}</p>
                                <p className='font-semibold text-sm sm:text-base lg:text-lg'>{member.dept} | {member.tag}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom padding for mobile */}
                <div className="h-8 sm:h-12 lg:h-16"></div>
            </div>
        </div>
        <Footer /></>
    )
}

export default Page