'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Form submitted:', formData);

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-[100vh] max-w-screen relative text-center overflow-x-hidden">
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


            <div className="relative z-10 flex items-center justify-center h-fit min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Side - Contact Form */}
                    <div className="order-2 lg:order-1 px-4 sm:px-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-left font-black text-white mb-4 adumu uppercase tracking-tight">
                            contact us
                        </h1>
                        <div className="bg-orange-400/20 text-left backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/20">
                            {/* Header */}
                            <div className="mb-8">

                                <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
                                    Let's Kick Off the Conversation – we're ready to listen,
                                    <span className="hidden sm:inline"><br /></span>
                                    <span className="sm:hidden">{" "}</span>
                                    support, and help you shine
                                </p>
                            </div>

                            {/* Contact Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-white/90 text-sm font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className="block text-white/90 text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-start w-full overflow-visible">
                        <Image
                            src="/img/Spives Web App Design (6).svg"
                            width={1500}
                            height={1500}
                            alt="phone logo"
                            className='w-full max-w-[20rem] sm:max-w-[30rem] lg:max-w-[45rem] xl:max-w-[60rem] h-auto 
                                     relative lg:right-20 scale-100 lg:scale-110 transform transition-all duration-300
                                     -mt-8 sm:-mt-0'
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;