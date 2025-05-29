"use client";
import React from "react";
import { FileText, ImageIcon } from "lucide-react";
import { useUser } from "../../lib/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

// Define TypeScript interfaces
interface PlayerData {
  username: string;
  name: string;
  country: string;
  position: string;
  age: number;
  foot: string;
  positions: string[];
  club: string;
  stats: {
    tops: number;
    matchesPlayed: number;
    minutesPlayed: number;
  };
  team: {
    name: string;
    logo: string;
  };
  uploadedImage: string;
}

// Sample player data
const playerData: PlayerData = {
  username: "kidwonda1389",
  name: "Oba Kabiyesi",
  country: "Nigeria",
  position: "Defense",
  age: 14,
  foot: "Left Footer",
  positions: ["RM", "RW", "CB", "LM", "LWB"],
  club: "Home FC",
  stats: {
    tops: 10,
    matchesPlayed: 48,
    minutesPlayed: 11000,
  },
  team: {
    name: "Home FC",
    logo: "🇬🇧",
  },
  uploadedImage: "",
};

const App = () => {
  const { user, loading, authenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [loading, authenticated, router]);

  if (loading || !authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Use user data from session if available, otherwise fallback to static
  const player = user
    ? {
        username: user.nickname || user.email?.split('@')[0] || 'Player',
        name: user.fullName || 'Unknown Player',
        country: user.country || 'Unknown',
        position: user.position || 'Unknown',
        age: user.dateOfBirth
          ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
          : 0,
        foot: user.foot || 'Unknown',
        positions: user.selectedPositions || (user.position ? [user.position] : []),
        club: user.club || 'No Club',
        stats: user.stats || { tops: 0, matchesPlayed: 0, minutesPlayed: 0 },
        team: user.team || { name: user.club || 'No Club', logo: '⚽' },
        uploadedImage: user.uploadedImageUrl || '',
      }
    : playerData;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-8 sm:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Profile Picture */}
          <div className="md:col-span-3 mb-6 md:mb-0 flex justify-center items-center">
            <div className="bg-white rounded-lg w-32 h-32 sm:w-full sm:h-auto flex justify-center items-center">
              {player.uploadedImage ? (
                <img
                  src={player.uploadedImage}
                  alt="Player"
                  className="w-24 h-24 sm:w-auto sm:h-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Player Info */}
          <div className="md:col-span-5 mb-6 md:mb-0">
            <div className="">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold adumu text-blue-950 mb-1 sm:mb-2 tracking-tight">
                  {player.username}
                </h1>
                <div className="">
                  <span className="text-lg">🌍</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between h-fit items-start sm:items-center py-3 sm:py-4 px-3 sm:px-6 bg-white rounded-lg mb-4 sm:mb-8 shadow-sm border border-gray-100 gap-4 sm:gap-0">
                <div className="space-y-2">
                  <PlayerInfoRow label="Name" value={player.name} />
                  <PlayerInfoRow label="Country" value={player.country} />
                  <PlayerInfoRow label="Position" value={player.position} />
                  <PlayerInfoRow label="Age" value={player.age.toString()} />
                  <PlayerInfoRow label="Foot" value={player.foot} />
                  <PlayerInfoRow label="Club" value={player.club} />
                </div>

                <div className="flex flex-col items-end justify-between h-full gap-4 sm:gap-8 w-full sm:w-auto">
                  <h1 className="text-xs sm:text-sm text-blue-950 font-bold text-center">
                    {player.stats.matchesPlayed}
                    <br />
                    <span className="font-[300] text-[10px] sm:text-xs relative bottom-2 tracking-wide">APPS</span>
                  </h1>
                  <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                    {player.positions &&
                      player.positions.slice(0, 5).map((pos, index) =>
                        pos ? (
                          <PositionBadge key={`${pos}-${index}`} position={pos} active={true} />
                        ) : null
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <ActionButton
                icon={<FileText size={20} className="sm:w-6 sm:h-6" />}
                text="View Health Report"
              />
              <ActionButton icon={<ImageIcon size={20} className="sm:w-6 sm:h-6" />} text="Gallery" />
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="md:col-span-2 lg:mt-16 mb-6 md:mb-0">
            <div className="bg-white rounded-lg mb-6 sm:mb-8 shadow-md">
              <div className="flex justify-between items-center w-full mb-0 p-3 sm:p-4">
                <div className="flex items-center w-full justify-between">
                  <h3 className="font-[400] text-xs sm:text-sm">{player.team.name}</h3>
                  <span className="ml-2 text-xs sm:text-sm">{player.team.logo}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 px-2">
                <StatBar label="Matches Played" value={player.stats.matchesPlayed} />
                <StatBar label="Minutes Played" value={player.stats.minutesPlayed} />
              </div>
              <div className="mt-6 sm:mt-8">
                <div className="relative h-28 sm:h-40 flex justify-end items-end bg-blue-50 overflow-hidden">
                  <Image 
                    className="w-full" 
                    src="/images/dashboard/Vector 43 from Spives Web App.svg" 
                    width={100} 
                    height={100} 
                    alt="graph" 
                  />
                  <div className="absolute top-2 right-2 bg-blue-brand-900 text-white text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded">
                    {player.stats.minutesPlayed} Mins
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:col-span-2 lg:mt-8">
            <h3 className="text-xs text-gray-400 mb-2 sm:mb-3 font-semibold">Top 3 Positions</h3>
            <div className="rounded-lg h-fit">
              <FootballField positions={player.positions as string[]} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const PlayerInfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-[11px] sm:text-xs font-medium space-x-2">
    <div className="w-14 sm:w-16 font-[300] text-gray-500">{label}</div>
    <div className="font-[600] text-xs sm:text-sm text-blue-950">{value}</div>
  </div>
);

const PositionBadge = ({
  position,
  active = true,
}: {
  position: string;
  active?: boolean;
}) => (
  <div
    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-[500] text-[9px] sm:text-xs shadow-sm border-2 border-white ${
      active ? "bg-blue-950 text-orange-300" : "bg-gray-200 text-gray-500"
    }`}
  >
    {position}
  </div>
);

const ActionButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <button className="w-full flex flex-col items-center justify-center space-y-1 sm:space-y-2 py-2 sm:py-4 shadow-sm rounded-lg hover:bg-gray-50 transition-all">
    <span className="text-xs font-[400] mb-1 text-blue-950">{text}</span>
    {icon}
  </button>
);

const StatBar = ({ label, value }: { label: string; value: number }) => {
  // Calculate width percentage based on value
  // For matches played, use a different scaling factor than minutes played
  const isMinutes = label.includes("Minutes");
  const maxValue = isMinutes ? 15000 : 100;
  const widthPercentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="mt-2 sm:mt-4">
      <div className="flex justify-between text-xs sm:text-sm mb-1 font-medium">
        <span className="text-gray-500 font-[400] text-[10px] sm:text-xs ">{label}</span>
        <span className="font-semibold text-blue-brand-900">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 sm:h-2.5">
        <div
          className="bg-green-500 h-2 sm:h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const FootballField = ({ positions }: { positions: string[] }) => {
  return (
    <div className="relative w-full h-full bg-green-500 rounded border-2 border-white overflow-hidden">
      {/* Field markings */}

      <Image width={300} height={600} alt="field" src="/images/dashboard/Spives Web App Group 149.svg" className="h-full w-full"/>

      {/* Position markers */}
      {positions.includes("LM") && (
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-10 h-10 bg-blue-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
          LM
        </div>
      )}

      {positions.includes("LWB") && (
        <div className="absolute bottom-1/4 left-1/3 transform -translate-y-1/2 w-10 h-10 bg-blue-brand-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
          LWB
        </div>
      )}

      {positions.includes("CB") && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-brand-700 text-white rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-md">
          CB
        </div>
      )}
    </div>
  );
};

export default App;
