"use client";
import React, { useState } from 'react'
import { Instagram, Twitter, Facebook, Linkedin, Mail, ArrowRight, CheckCircle } from 'lucide-react'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);
  
    const handleSubmit = () => {
      if (email) {
        setSubmitted(true);
        setEmail('');
        // Here you would normally send the email to your API
      }
    };

    const handleReferralClick = async () => {
      const referralLink = 'https://go-spives-pro.vercel.app/';
      
      try {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    };
  
    return (
      <section className="bg-gradient-to-r from-blue-950 to-blue-950 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-orange-500 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-500 translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Invite Your Friends to Spives
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Share Spives with friends and earn rewards when they join. Help grow the football community together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleReferralClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      Refer a Friend <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-blue-900 font-semibold text-lg mb-4">Stay Updated</h3>
                
                {submitted ? (
                  <div className="flex items-center space-x-2 text-green-600 mb-4">
                    <CheckCircle size={20} />
                    <span>Thanks for subscribing!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <button 
                        onClick={handleSubmit}
                        className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-3">
                  Subscribe to our newsletter for exclusive football opportunities and insights.
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

export default Newsletter