import React from "react";
import Image from "next/image";
const Dashboard = () => {
  return (
    <div className="md:min-h-[65rem] py-40 bg-white relative overflow-hidden flex justify-center items-center">
      <Image
        src="/images/landing-page/Vector 53 from Spives Web App.png"
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="dashboard"
        width={1000}
        height={1000}
      />
      <Image
        src="/images/landing-page/Talent Profile Page from Figma.svg"
        className="max-w-7xl w-full h-auto z-10 relative"
        alt="dashboard"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default Dashboard;
