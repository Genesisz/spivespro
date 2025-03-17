import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="/images/landing-page/hero-bg.png"
          alt="hero background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

      <div className="relative z-10 px-[1rem] md:px-[3rem] flex flex-col items-center justify-center">
          <h1 className="text-[2.5rem] md:text-[5rem] leading-[2.5rem] md:leading-[5rem] text-[#FF9434] adumu">
            <span className='text-white adumu text-[6rem]'>
            404
            </span>
            <br />
            error
          </h1>
          <p className="text-white text-[16px] mt-8 font-montserrat font-[700]">
            page <span className='text-[#FF9434]'>"not found"</span> or has been moved to another link
          </p>
          <button className="bg-white mt-8 md:mt-4 text-black px-2 text-sm font-[600] py-1 rounded-sm hover:bg-opacity-90 transition-all">
            Go Home
          </button>
        </div>
    </div>
  );
};

export default NotFound;
