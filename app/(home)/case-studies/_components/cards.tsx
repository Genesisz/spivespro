'use client';

import React from 'react';
import Image from 'next/image';

interface CardContent {
    position: 'left' | 'right';
    title: string;
    description: string;
    bg: string;
    profile: string;
}

const cardContent: CardContent[] = [
    {
        position: "right",
        title: "The One Who Passed His Prime:",
        description: "Emeka was once the brightest star on his street, dazzling crowds at every youth tournament. Coaches called him \"the next big thing.\"\n\nBut as years passed, opportunities never came. Now in his early thirties, with younger players taking the spotlight, he knows his window has closed. His talent was never in doubt — but talent alone was never enough.",
        bg: "/img/HeroBG Image from Spives Web App (1).svg",
        profile: "/img/Web App Design (3).svg"
    },
    {
        position: "left",
        title: "The One Who Feels Invisible:",
        description: "Kwame trains harder than anyone on his team, yet every time scouts visit, he’s overlooked. He wonders if it’s his size, his background, or simply bad luck. \"\n\nDeep down, fear grows: What if nobody ever notices me? Every missed chance feels heavier, and the dream that once fueled him now feels like a shadow he’s chasing.",
        bg: "/img/HeroBG Image from Spives Web App (1).svg",
        profile: "/img/Web App Image 1 (1).svg"
    },
    {
        position: "right",
        title: "The One Who Still Hopes:",
        description: "Abiola is only 14, full of energy and belief. He watches the older boys in his neighborhood who never got their break, and he prays he won’t be like them. \"\n\nEvery night he tells himself, I’ll make it. I won’t let my story end before it starts. His dream is fragile but alive — carried on the hope that one day, someone will see him.",
        bg: "/img/HeroBG Image from Spives Web App (1).svg",
        profile: "/img/Web App Design (4).svg"
    }
];

const Cards: React.FC = () => {
    return (
        <div className="overflow-hidden">
            {cardContent.map((card, index) => (
                <section
                    key={index}
                    className="min-h-screen h-fit w-full relative overflow-hidden"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={card.bg}
                            alt="Background"
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

                    {/* Content Container */}
                    <div className="relative z-10 w-full h-full min-h-screen flex items-center justify-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div
                                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 ${card.position === 'right' ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Text Content */}
                                <div className={`flex-1 text-white text-center ${card.position == "left" ? "lg:text-left" : "lg:text-right"} max-w-lg`}>
                                    <h2 className={`max-w-md ${card.position == "left" ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"} adumu text-xl sm:text-2xl lg:text-3xl xl:text-5xl mb-3 sm:mb-4 leading-tight`}>
                                        {card.title}
                                    </h2>
                                    <div className="text-sm sm:text-base lg:text-xl leading-relaxed opacity-90">
                                        {card.description.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className={index > 0 ? 'mt-4' : ''}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Image Content */}
                                <div className="flex-1 flex items-center justify-center max-w-xs lg:max-w-lg">
                                    <div className="relative w-full h-96 sm:h-[25rem] lg:h-[32rem] xl:h-[35rem] flex items-end justify-center bg-white/20 p-1 rounded-md">
                                        <Image
                                            src={card.profile}
                                            alt="Profile illustration"
                                            width={500}
                                            height={800}
                                            className="w-auto h-full max-h-full object-cover rounded-md"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Cards;