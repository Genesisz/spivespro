import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#03033E] text-white py-16 relative">
      <Image
        src="/img/Spives Web App Image 25 (1).svg"
        alt="hero background"
        fill
        priority
        className="object-cover object-center opacity-20"
        sizes="100vw"
      />
      <div className="max-w-7xl relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <Image
                  src="/logo/logo.svg"
                  alt="Spives Logo"
                  width={100}
                  height={50}
                  className="h-8 w-auto"
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
            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Solution</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/case-studies"
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-300 font-[300]"
                  >
                    Technology
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
                    href="/case-studies"
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
                    href="/webinars"
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
                    href="/privacy-policy"
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
