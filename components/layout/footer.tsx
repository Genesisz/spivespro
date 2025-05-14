// import React from 'react';
// const Footer = () => {
//   return (
//     <footer className="w-full px-[1rem] md:px-[2rem] py-[1.5rem] text-start">
//       <div className="flex flex-col md:flex-row gap-6 justify-between text-[12px]">
//         <div className="underline">
//           <h1 className=" font-[600]">Stay Informed. Join Now</h1>
//           <p>Sign up for our newsletter to receive the latest updates</p>
//         </div>
//         <div>
//           <div className="flex gap-2">
//             <input
//               placeholder="Your Email Address"
//               className="border  border-gray-600 text-gray-600 placeholder:text-gray-600 py-1 px-2 min-w-[15rem]"
//             />
//             <button className="border border-gray-600 px-4 py-1">
//               Subscribe
//             </button>
//           </div>
//           <p className="mt-2 text-[10px] font-[600]">
//             By subscribing, you have agreed to our Privacy Policy.
//           </p>
//         </div>
//       </div>
//       <hr className="my-6 border-gray-600" />
//       <div className='flex justify-between items-center'>
//         <img
//           src="/images/spives.png"
//           alt="spives logo"
//           className="h-6 w-auto object-contain"
//         />

//         <p className="underline text-[11px]">@2024 Spives. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#03033E] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <Image
                  src="/logo/logo.svg"
                  alt="Spives Logo"
                  width={150}
                  height={50}
                  className="h-10 w-auto"
                />
              </div>
            </Link>

            <div className="text-gray-300 space-y-2">
              <p>Lagos, Nigeria.</p>
              <p>
                <a
                  href="mailto:info@gospives.pro"
                  className="hover:text-amber-500 transition-colors duration-300"
                >
                  info@gospives.pro
                </a>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="bg-navy-800 hover:bg-amber-500 p-2.5 rounded-full transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="bg-navy-800 hover:bg-amber-500 p-2.5 rounded-full transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="bg-navy-800 hover:bg-amber-500 p-2.5 rounded-full transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="bg-navy-800 hover:bg-amber-500 p-2.5 rounded-full transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
            {/* Solutions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/solutions/reduce"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Reduce
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/transition"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Transition
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/resources/case-studies"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/webinars"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newsletter"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t-[.1px] border-blue-950 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">All right reserved.</p>
          <p className="text-gray-400">Copyright © Spives 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
