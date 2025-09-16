'use client';

import React from 'react';

interface PolicySection {
    number: string;
    title: string;
    description: string;
}

const policySections: PolicySection[] = [
    {
        number: "1",
        title: "What is Spives?",
        description: "Spives is a platform that helps young footballers showcase their talent safely and connect with opportunities, while protecting their privacy. Using player profile cards"
    },
    {
        number: "2",
        title: "Is Spives safe for children under 13?",
        description: "Yes. Spives is built with children’s safety as the top priority. Kids never use their real names, addresses, or personal details on the platform. All interactions are monitored and guided by strict safety rules."
    },
    {
        number: "3",
        title: "Do parents need to give permission?",
        description: "Yes. Parents or guardians must provide consent before a child can use Spives. Parents also have full control to view, manage, or delete their child’s information at any time."
    },
    {
        number: "4",
        title: "What personal information do you collect?",
        description: "We collect only what’s necessary — like a nickname, age range, and football-related details (e.g., preferred position, skill level). We don’t collect addresses, phone numbers, or anything that could put a child at risk."
    },
    {
        number: "5",
        title: "Can my child get scouted directly through Spives?",
        description: "Spives increases visibility by creating safe player profiles that highlight skills and stats. While scouts and academies may view profiles, there are no guarantees of being recruited. Our goal is to improve chances while protecting kids."
    },
    {
        number: "6",
        title: "How do I delete my child’s profile?",
        description: "Parents can request profile deletion at any time by contacting us through the support page. Once deleted, all personal data is permanently removed."
    },
    {
        number: "7",
        title: "Does Spives cost money?",
        description: "Basic access is free. Premium features (like custom profile designs, video uploads, or verified stats) may come with a subscription, but payment is always handled by parents or guardians."
    },
    {
        number: "8",
        title: "How does Spives prevent fake scouts or agents?",
        description: "We verify scouts and academies before allowing them to connect with players. Any suspicious accounts are removed immediately to protect children."
    }
];

const Faq: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-20">

            {/* Policy Sections */}
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
                {policySections.map((section, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start"
                    >
                        {/* Left Side - Number and Title */}
                        <div className="lg:col-span-4">
                            <div className="flex items-start gap-4 lg:flex-col lg:gap-4">
                                {/* Title with Number */}
                                <div className="flex-1 lg:flex-none">
                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-[500] text-white leading-tight">
                                        {section.number}. {section.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className='hidden md:flex lg:col-span-2'/>
                        {/* Right Side - Description */}
                        <div className="lg:col-span-6">
                            <div className="prose prose-gray max-w-none">
                                {section.description.split('\n\n').map((paragraph, paragraphIndex) => {
                                    // Check if paragraph contains bullet points
                                    if (paragraph.includes('•')) {
                                        const lines = paragraph.split('\n');
                                        return (
                                            <div key={paragraphIndex} className={paragraphIndex > 0 ? 'mt-6' : ''}>
                                                {lines.map((line, lineIndex) => {
                                                    if (line.trim().startsWith('•')) {
                                                        return (
                                                            <div key={lineIndex} className="flex items-start gap-3 mb-3">
                                                                <span className="text-white font-bold mt-1">•</span>
                                                                <span className="text-gray-200 leading-relaxed text-base sm:text-lg">
                                                                    {line.replace('•', '').trim()}
                                                                </span>
                                                            </div>
                                                        );
                                                    } else if (line.trim()) {
                                                        return (
                                                            <p key={lineIndex} className="text-gray-200 leading-relaxed mb-3 text-base sm:text-lg">
                                                                {line.trim()}
                                                            </p>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        );
                                    } else {
                                        // Regular paragraph
                                        return (
                                            <p
                                                key={paragraphIndex}
                                                className={`text-gray-200 leading-relaxed text-base sm:text-lg ${paragraphIndex > 0 ? 'mt-4' : ''}`}
                                            >
                                                {paragraph}
                                            </p>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;