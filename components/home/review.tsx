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
    name: "Chuka Okorie",
    title: "Midfielder, Enugu Rangers",
    image: "/img/player1.jpg",
    review: "Spives helped me get noticed outside my state for the first time. Everything changed after that.",
    category: "footballers"
  },
  {
    name: "Fatima Lawal",
    title: "Forward, Nasarawa Amazons",
    image: "/img/player2.jpg",
    review: "I use Spives to track my performance and connect with new opportunities. It’s like having a manager in your pocket.",
    category: "footballers"
  },
  {
    name: "Ibrahim Saka",
    title: "Aspiring Pro, Lagos",
    image: "/img/player3.jpg",
    review: "Before Spives, I was just training and hoping. Now I’m getting feedback from real scouts. Motivation don double!",
    category: "footballers"
  },
  {
    name: "Blessing Eze",
    title: "U-20 National Team Prospect",
    image: "/img/player4.jpg",
    review: "Uploading my clips and stats on Spives got me a trial in Europe. Na God and Spives run am!",
    category: "footballers"
  },

  // 🎓 Coaches
  {
    name: "Coach Tunde B.",
    title: "Youth Coach, Lagos",
    image: "/img/coach2.jpg",
    review: "Since I started using Spives, tracking player progress has become so easy. This platform is a blessing for grassroots football.",
    category: "coaches"
  },
  {
    name: "Ngozi Umeh",
    title: "Head Coach, Abuja Academy",
    image: "/img/coach3.jpg",
    review: "Spives makes it easier for me to mentor and monitor my players. The tools are practical and built for real Nigerian challenges.",
    category: "coaches"
  },
  {
    name: "Samuel Dogo",
    title: "Technical Director, Kaduna Youth FC",
    image: "/img/coach4.jpg",
    review: "This is exactly what we need in Nigeria. Spives is saving me hours of paperwork every week.",
    category: "coaches"
  },
  {
    name: "Aisha Bello",
    title: "Women's Team Coach, Ilorin",
    image: "/img/coach5.jpg",
    review: "For the first time, my girls have access to the same digital tools as the big teams. This is the future.",
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
    review: "This is what we’ve been waiting for. I can now find and follow talent across Nigeria without being physically present.",
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
              <p className="text-gray-800 bg-white rounded-md h-[10rem] sm:h-[11rem] lg:h-[12rem] flex items-center px-3 sm:px-4 text-sm sm:text-base leading-relaxed">
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