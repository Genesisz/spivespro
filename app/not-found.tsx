import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
const NotFound = () => {
  return (
    <div className='max-w-screen overflow-x-hidden'>
    <Navbar />
    <div className="h-screen w-screen flex justify-center items-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          width={1000}
          height={1000}
          src="/img/Web App Image 1 (2).svg"
          alt="hero background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

      <div className="relative z-10 px-[1rem] md:px-[3rem] flex flex-col items-center justify-center">
          <h1 className="text-[2.5rem] md:text-[7rem] leading-[2.5rem] md:leading-[5rem] text-[#fff] adumu">
            404
          </h1>
          <p className="text-white text-center text-[16px] mt-8 font-bold">
            Offside
          </p>
          <p className="text-white text-center text-[16px] mt-2 font-[700]">
            Looks like this page has been moved
          </p>
          <button className="bg-white mt-8 md:mt-4 text-black px-2 text-sm font-[600] py-1 rounded-sm hover:bg-opacity-90 transition-all">
            Go Home
          </button>
        </div>
    </div>
    <Footer />
    </div>
  );
};

export default NotFound;
