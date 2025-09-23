'use client';

import React, { useState } from "react";

interface Review {
  name: string;
  title: string;
  image: string;
  review: string;
  category: 'footballers' | 'coaches' | 'scouts';
}

const reviews: Review[] = [
  // ⚽️ Footballers
  {
    name: "Chinedu",
    title: "Forward Winger",
    image: "/img/player1.jpg",
    review: "My game finally looks professional online!",
    category: "footballers"
  },
  {
    name: "Zama",
    title: "Midfielder",
    image: "/img/player2.jpg",
    review: "One link, all my highlights. Easy..",
    category: "footballers"
  },
  {
    name: "Ibrahim",
    title: "Centre Back",
    image: "/img/player3.jpg",
    review: "Coaches take me more seriously now.",
    category: "footballers"
  },
  {
    name: "Emmanuel",
    title: "Goalkeeper",
    image: "/img/player4.jpg",
    review: "I wondered what it looked like having a card that makes you look like you are already in a football game!",
    category: "footballers"
  },

  // 🎓 Coaches
  {
    name: "Uche B.",
    title: "Coach",
    image: "/img/coach2.jpg",
    review: "I can manage my whole team digitally.",
    category: "coaches"
  },
  {
    name: "Ayo",
    title: "Coach",
    image: "/img/coach3.jpg",
    review: "Now I can track my players' progress without drowning in paperwork.",
    category: "coaches"
  },
  {
    name: "Anita",
    title: "Female Coach",
    image: "/img/coach4.jpg",
    review: "It's like having a digital CV for my whole team.",
    category: "coaches"
  },
  {
    name: "Vincent C",
    title: "U13 Coach",
    image: "/img/coach5.jpg",
    review: "Spives helps me show scouts what my boys are really made of",
    category: "coaches"
  },

  // 👀 Scouts
  {
    name: "Kwesi",
    title: "Talent Scout",
    image: "/img/reviewer2.jpg",
    review: "Right now I short-list faster; the full release will be a game changer.",
    category: "scouts"
  },
  {
    name: "Ikpeme David",
    title: "Scouts",
    image: "/img/reviewer1.jpg",
    review: "I joined the test group—when scouting drops, 80% of my problem is solved.",
    category: "scouts"
  },
  {
    name: "Bola Hassan",
    title: "Independent Scout",
    image: "/img/scout1.jpg",
    review: "This is what we've been waiting for. I can now find and follow talent across Nigeria without being physically present.",
    category: "scouts"
  },
  {
    name: "Zainab Musa",
    title: "International Scout (Based in Abuja)",
    image: "/img/scout3.jpg",
    review: "Spives is putting Nigerian talent on the global map. I've already connected with clubs outside Africa through this tool.",
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
              <p className="text-gray-800 bg-white rounded-md h-[10rem] sm:h-[11rem] lg:h-[12rem] flex items-center px-3 sm:px-4 text-sm sm:text-base md:text-2xl leading-relaxed">
                &ldquo;{review.review}&rdquo;
              </p>
              <div className="flex items-center mt-3 sm:mt-4">
                {/* <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 sm:mr-4 border object-cover"
                /> */}
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
          <div className="flex flex-row bg-white gap-2 sm:gap-4 lg:gap-10 p-2 px-4 sm:px-6 lg:px-8 rounded-full shadow-lg">
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