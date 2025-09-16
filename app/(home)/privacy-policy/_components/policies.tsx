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
        title: "Information We Collect",
        description: "Personal Information: name, email address, phone number, or other information you provide when registering, subscribing, or contacting us.\n\nUsage Data: information on how you interact with our website or app, such as pages visited, time spent, IP address, device type, and browser type.\n\nCookies & Tracking Data: small files stored on your device that help us improve user experience, analyze trends, and deliver relevant content."
    },
    {
        number: "2",
        title: "How Your Information is Used",
        description: "• Provide, maintain, and improve Spives services.\n• Personalize user experiences and content.\n• Communicate with you, including sending updates, newsletters, or promotional offers.\n• Analyze site usage and performance for better service delivery.\n• Ensure legal compliance and prevent fraudulent activity."
    },
    {
        number: "3",
        title: "Sharing of Information",
        description: "Personal data collected is neither sold nor rented. However, information may be shared with trusted third parties in the following cases:\n\nService Providers: such as payment processors, analytics providers, or hosting partners, who help us run Spives.\n\nLegal Obligations: if required by law, regulation, or legal request.\n\nBusiness Transfers: if Spives is involved in a merger, acquisition, or asset sale."
    },
    {
        number: "4",
        title: "Cookies & Tracking",
        description: "Spives uses cookies and similar tracking technologies to:\n\n• Remember user preferences.\n• Understand how users interact with our services.\n• Improve security and user experience.\n\nYou can choose to disable cookies in your browser settings, but some features of Spives may not function properly as a result."
    },
    {
        number: "5",
        title: "Data Security",
        description: "Precautions are taken to protect your data against unauthorized access, alteration, or disclosure. However, no online method of storage or transmission is 100% secure, absolute security is not guaranteed."
    },
    {
        number: "6",
        title: "Your Rights",
        description: "Depending on your location, you may have the right to:\n\n• Access the personal information we hold about you.\n• Request corrections or removal of your data.\n• Withdraw consent for marketing communications.\n\nTo exercise these rights, please contact us at: support@gospives.pro"
    },
    {
        number: "7",
        title: "Children's Privacy",
        description: "Spives is designed for children over the age of 13, and protecting their privacy is our highest priority.\n\nWe strictly limit the collection and use of personal information. Children are never required to provide their real names, home addresses, phone numbers, or any personally identifying information that could put them at risk. Instead, children interact on Spives using safe identifiers such as nicknames, avatars, or codes that cannot be traced back to their real identities.\n\nWe may collect limited non-identifiable information (such as age range, device type, or general location) to improve the platform and personalize the experience. This information is anonymous and never shared with third parties for marketing.\n\nParents or guardians are encouraged to be actively involved. We provide tools and transparency so families can monitor their child's activity. If we ever learn that a child has submitted personal data by mistake, we will delete it promptly. Parents or guardians can contact us anytime to access, review, or request deletion of their child's data.\n\nCOPPA Compliance:\nSpives complies with the Children's Online Privacy Protection Act (COPPA), which requires parental consent for the collection of personal information from children from 13. We:\n\n• Obtain verifiable parental consent before collecting any information that could identify a child.\n• Clearly explain what information we collect, why we collect it, and how it is used.\n• Provide parents with the right to review, limit, or delete their child's information at any time.\n• Ensure that children's data is kept secure and never used for advertising or profiling.\n\nBy using Spives, parents and guardians acknowledge and consent to our practices in protecting children's online privacy."
    },
    {
        number: "8",
        title: "Changes to This Policy",
        description: "Privacy policy may be updated periodically. A revised version of the update would be posted on this page stating the date of the update."
    },
    {
        number: "9",
        title: "Contact Us",
        description: "Any questions, concerns, or requests related to this Privacy Policy, feel free to contact us at:\n\nsupport@gospives.pro\ninfo@gospives.pro"
    }
];

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

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
                                    <h2 className="text-lg sm:text-xl lg:text-3xl font-[500] text-white leading-tight">
                                        {section.number}. {section.title}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Description */}
                        <div className="lg:col-span-8">
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

export default PrivacyPolicy;