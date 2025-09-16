import React from "react";
import Image from "next/image";
import { Eye, Target, Rocket, Shield, Activity, BarChart2 } from "lucide-react";
const features = [
  {
    title: "Get Discovered",
    description:
      "Publish your player profile and stats to scouts and coaches across Africa and beyond.",
    icon: Eye,
  },
  {
    title: "Connect with Coaches",
    description:
      "Directly connect with coaches and academies looking for players with your exact skillset and position.",
    icon: Activity,
  },
  {
    title: "Track Performance Feedback",
    description:
      "Get notified when coaches review your profile or show interest — know who's watching and who wants to reach out.",
    icon: BarChart2,
  },
  {
    title: "Target the Right Opportunities",
    description:
      "Match with academies and clubs based on your preferred position, age group, skill level, and playing style.",
    icon: Target,
  },
  {
    title: "Boost Your Profile",
    description:
      "Level up your player card with verified data, performance highlights, and visual insights into your game.",
    icon: Rocket,
  },
  {
    title: "Secure the Right Move",
    description:
      "Put yourself in the best position to receive offers from serious football programs that suit your ambition.",
    icon: Shield,
  },
];
export default function FootballPlatformFeatures() {
  return (
    <div className="bg-[#03033E] text-white h-fit min-h-screen overflow-hidden pt-20 md:pt-32 pb-16 px-4 relative">
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="md:text-center mb-16">
          <h2 className="text-5xl md:text-4xl font-bold mb-4 adumu">
            Maximize your options
          </h2>
          <p className="text-[14px] md:text-lg mb-4">
            Get in front of more coaches. Access more programs. Start more
            conversations.
          </p>

          <div className="flex md:justify-center">
            <button className="bg-white text-sm md:text-base  font-[300] md:font-[400] text-black py-2 md:py-3 px-4 md:px-8 rounded-md transition duration-200">
              Create a profile card
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map(({ title, description, icon: Icon }, index) => (
            <div className="card-wrapper h-[12rem] md:h-[15rem]" key={index}>
              <div className="card-content flex flex-col justify-center p-8">
                <div className="flex justify-start mb-6">
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-[600] mb-2">{title}</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex flex-col relative lg:flex-row items- justify-between pt-16">
          <div className="absolute top-0 bg-orange-800/20 w-[150vw] h-[40rem] -left-[15rem]"/>
          <div className="lg:w-1/2 mb-8 lg:mb-0 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold adumu leading-tight">
              The Dream <br /> starts
              
              with <br /> a <span className="text-orange-400">Kick.</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex justify-end absolute right-0 -bottom-52 md:-bottom-72 items-end h-fit ml-auto">
        <Image
          width={1000}
          height={500}
          src="/images/landing-page/Footshoe Design.png"
          alt="Orange football boots"
          className="rounded-lg object-cover h-auto w-[42.5rem] border"
        />
        <Image
          width={1000}
          height={500}
          src="/images/landing-page/Footshoe Design.png"
          alt="Orange football boots"
          className="rounded-lg absolute -bottom-4 right-20 object-cover h-auto w-[42.5rem] border"
        />
      </div>
    </div>
  );
}
