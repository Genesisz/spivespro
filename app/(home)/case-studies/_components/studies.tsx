import React from 'react'
import Image from 'next/image'

const studies = [
    {
        title: "The harsh truth:",
        description: "Studies suggest that less than 0.1% of African grassroots footballers ever get seen by a licensed scout. Of those who are scouted, even fewer make it into an academy, let alone sign professional contracts."
    },
    {
        title: "Huge Talent Pool, Few Opportunities:",
        description: "Across Africa, millions of young footballers showcase their skills on local pitches, schools, and community leagues every day. Yet only a handful are ever seen by scouts or academies. Globally, less than 1% of academy players turn professional — and in Africa, the chances are even slimmer due to limited scouting networks."
    },
    {
        title: "Exploitation & Fake Agents:",
        description: "Many young African footballers fall victim to fake agents who exploit their dreams with false promises of trials abroad. Families often make huge sacrifices, only for players to end up stranded. This widespread fraud creates mistrust, making it harder for genuine scouts to find talent and leaving many opportunities lost."
    }
]

const Studies = () => {
    return (
        <div className="min-h-fit md:min-h-[100vh] h-fit max-w-screen relative overflow-hidden">
            <div className="absolute top-0 left-0 w-screen h-full">
                <Image
                    src="/img/Web App Image 1.svg"
                    alt="hero background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>
               <div className="absolute top-0 left-0 w-screen h-[100vh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

            <div className='max-w-7xl mx-auto flex items-center text-white h-full mt-20 md:mt-40 justify-center md:justify-start relative z-10 px-4'>
                <div className="max-w-3xl text-center md:text-left">
                    {studies.map((study, index) => (
                        <div key={index} className="mb-8 md:mb-12">
                            <h2 className="adumu text-2xl sm:text-3xl md:text-4xl mb-4">{study.title}</h2>
                            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl max-w-full">{study.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Studies;
