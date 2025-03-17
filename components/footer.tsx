import React from 'react';
const Footer = () => {
  return (
    <footer className="w-full px-[1rem] md:px-[2rem] py-[1.5rem] text-start">
      <div className="flex flex-col md:flex-row gap-6 justify-between text-[12px]">
        <div className="underline">
          <h1 className=" font-[600]">Stay Informed. Join Now</h1>
          <p>Sign up for our newsletter to receive the latest updates</p>
        </div>
        <div>
          <div className="flex gap-2">
            <input
              placeholder="Your Email Address"
              className="border  border-gray-600 text-gray-600 placeholder:text-gray-600 py-1 px-2 min-w-[15rem]"
            />
            <button className="border border-gray-600 px-4 py-1">
              Subscribe
            </button>
          </div>
          <p className="mt-2 text-[10px] font-[600]">
            By subscribing, you have agreed to our Privacy Policy.
          </p>
        </div>
      </div>
      <hr className="my-6 border-gray-600" />
      <div className='flex justify-between items-center'>
        <img
          src="/images/spives.png"
          alt="spives logo"
          className="h-6 w-auto object-contain"
        />

        <p className="underline text-[11px]">@2024 Spives. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;