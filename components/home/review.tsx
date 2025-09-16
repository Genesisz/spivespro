'use client';

import React, { useState } from "react";
import Image from "next/image";

// TypeScript interfaces
interface Review {
  name: string;
  title: string;
  image: string;
  review: string;
  category: 'footballers' | 'coaches' | 'scouts';
}

// Enhanced reviews data with categories
const reviews: Review[] = [
  {
    name: "Jane Smith",
    title: "Aspiring Footballer",
    image: "/img/reviewer2.jpg",
    review: "Creating my player profile on Spives was a game-changer. The user-friendly interface and comprehensive features made it easy to highlight my strengths and get noticed by scouts.",
    category: "footballers"
  },
  {
    name: "Mike Johnson",
    title: "Youth Footballer",
    image: "/img/reviewer3.jpg",
    review: "Spives provided me with the tools and exposure I needed to take my football career to the next level. The platform's focus on player development and opportunities is unmatched.",
    category: "footballers"
  },
  {
    name: "Sarah Williams",
    title: "Professional Player",
    image: "/img/reviewer1.jpg",
    review: "The networking opportunities on Spives are incredible. I connected with coaches from different leagues and found opportunities I never knew existed.",
    category: "footballers"
  },
  {
    name: "Coach David Thompson",
    title: "Academy Coach",
    image: "/img/coach1.jpg",
    review: "As a coach, Spives has revolutionized how I discover new talent. The detailed player profiles and video analysis tools are exceptional for identifying potential.",
    category: "coaches"
  },
  {
    name: "Maria Rodriguez",
    title: "Youth Development Coach",
    image: "/img/coach2.jpg",
    review: "The platform's coaching tools have streamlined my player evaluation process. I can now track progress and identify areas for improvement more effectively.",
    category: "coaches"
  },
  {
    name: "James Wilson",
    title: "Professional Coach",
    image: "/img/coach3.jpg",
    review: "Spives has become an essential part of my coaching toolkit. The ability to connect with players globally and share training insights is invaluable.",
    category: "coaches"
  },
  {
    name: "Alex Morgan",
    title: "Professional Scout",
    image: "/img/scout1.jpg",
    review: "The scouting features on Spives are game-changing. I can identify promising talent from anywhere in the world and track their development over time.",
    category: "scouts"
  },
  {
    name: "Roberto Silva",
    title: "Regional Scout",
    image: "/img/scout2.jpg",
    review: "Spives has made talent scouting more efficient than ever. The comprehensive player database and advanced filtering options save me countless hours.",
    category: "scouts"
  },
  {
    name: "Emma Clarke",
    title: "International Scout",
    image: "/img/scout3.jpg",
    review: "The global reach of Spives is impressive. I've discovered exceptional talent from emerging markets that I would never have found otherwise.",
    category: "scouts"
  },
  {
    name: "Emma Clarke",
    title: "International Scout",
    image: "/img/scout3.jpg",
    review: "The global reach of Spives is impressive. I've discovered exceptional talent from emerging markets that I would never have found otherwise.",
    category: "scouts"
  }
];

type TabType = 'footballers' | 'coaches' | 'scouts';

const Review: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('footballers');

  const filteredReviews = reviews.filter(review => review.category === activeTab);

  const tabLabels: Record<TabType, string> = {
    'footballers': 'Footballers',
    'coaches': 'Coaches', 
    'scouts': 'Scouts'
  };

  return (
    <div className="md:min-h-[25rem] pt-16 lg:pt-20 bg-white relative overflow-hidden">
      <div className="text-center px-4 sm:px-6">
        <h1 className="adumu text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-950 mb-4 sm:mb-6">
          What people say
        </h1>
        <p className="text-base sm:text-lg text-blue-900 max-w-3xl mx-auto">
          Discover what our satisfied customers have said about their experiences with our platform.
        </p>
      </div>
{/* bg-[#B9B9E7]/30 */}
      <div className=" p-4 sm:p-6 lg:p-8 mt-8 sm:mt-12 lg:mt-16">
        {/* Reviews Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredReviews.map((review, index) => (
            <div key={index} className="bg-orange-400 rounded-lg shadow-md p-2 mx-auto w-full max-w-sm">
              <p className="text-gray-800 bg-white rounded-md h-[10rem] sm:h-[11rem] lg:h-[12rem] flex items-center px-3 sm:px-4 text-sm sm:text-base leading-relaxed">
                "{review.review}"
              </p>
              <div className="flex items-center mt-3 sm:mt-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 sm:mr-4 border object-cover"
                />
                <div>
                  <h3 className="text-sm sm:text-md font-[500] text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {review.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation - Mobile Responsive */}
        <div className="mt-8 sm:mt-12 lg:mt-16 mx-auto w-fit">
          <div className="flex flex-col sm:flex-row bg-white gap-2 sm:gap-4 lg:gap-10 p-2 px-4 sm:px-6 lg:px-8 rounded-full shadow-lg">
            {(Object.keys(tabLabels) as TabType[]).map((role, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(role)}
                className={`${
                  activeTab === role 
                    ? 'bg-orange-400 py-2 rounded-full text-white shadow-md' 
                    : 'py-2 hover:bg-gray-50'
                } px-3 sm:px-4 transition-all duration-200 ease-in-out`}
              >
                <h3 className={`text-sm sm:text-base lg:text-lg font-[400] ${
                  activeTab === role ? 'text-white' : 'text-blue-950'
                }`}>
                  {tabLabels[role]}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;