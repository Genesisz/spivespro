import React from 'react'

const harshTruths = [
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

const HarshTruthSection = () => {
    return (
        <div className='bg-[#191153]'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
                <div className="grid gap-12 sm:gap-16 lg:gap-28">
                    {harshTruths.map((truth, index) => (
                        <div key={index} className="">
                            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white adumu mb-3 sm:mb-4">
                                {truth.title}
                            </h2>
                            <p className="text-sm sm:text-base lg:text-xl text-white/90 leading-relaxed">
                                {truth.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default HarshTruthSection