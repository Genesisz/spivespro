"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Newsletter from "@/components/layout/profile/news-letter";
import Footer from "@/components/layout/footer";

// Define TypeScript interfaces
interface PlayerData {
  fullName: string;
  position: string;
  club: string;
  country: string;
  age: number;
  profileImage?: string;
  stats: {
    pace?: number;
    shooting?: number;
    passing?: number;
    dribbling?: number;
    defending?: number;
    physical?: number;
  };
  achievements: Array<{
    title: string;
    date: string;
  }>;
  status: string;
  joinedDate: string | null;
}

// Transform API data to UI format
const transformPlayerData = (apiData: PlayerData) => {
  // Get positions array from the position field
  const positions = apiData.position ? [apiData.position] : [];

  return {
    username: apiData.fullName?.split(" ")[0] || "Player",
    name: apiData.fullName || "Unknown Player",
    country: apiData.country || "Unknown",
    position: apiData.position || "Unknown",
    age: apiData.age || 0,
    foot: "Not Specified",
    club: apiData.club || "Unaffiliated",
    positions,
    stats: {
      matchesPlayed: 0,
      minutesPlayed: 0,
    },
    team: {
      name: apiData.club || "Unaffiliated",
      logo: "⚽",
    },
    uploadedImage: apiData.profileImage || "",
  };
};

const PlayerInfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-500 text-xs sm:text-sm">{label}:</span>
    <span className="text-blue-950 font-medium text-xs sm:text-sm">
      {value}
    </span>
  </div>
);

const StatBar = ({ label, value }: { label: string; value: number }) => {
  const maxValue = 100;
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] sm:text-xs text-gray-600">{label}</span>
        <span className="text-[10px] sm:text-xs font-medium text-blue-950">
          {value}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1">
        <div
          className="bg-blue-brand-900 h-1 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const FootballField = ({ positions }: { positions: string[] }) => {
  return (
    <div className="relative w-full h-full bg-green-500 rounded border-2 border-white overflow-hidden">
      {/* Field markings */}
      <Image
        width={300}
        height={600}
        alt="field"
        src="/images/profile/Spives Web App Group 149.svg"
        className="h-full w-full"
      />

      {/* Position markers */}
      {positions.includes("LM") && (
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 w-10 h-10 bg-blue-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
          LM
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

export default function PlayerProfile() {
  const params = useParams();
  const [rawPlayer, setRawPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const response = await fetch(`/api/player/${params.username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }
        const data = await response.json();
        setRawPlayer(data);
      } catch (err) {
        console.error("Error fetching player:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load player profile"
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.username) {
      fetchPlayerData();
    }
  }, [params.username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error || !rawPlayer) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Player Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            {error || "Unable to load player profile"}
          </p>
        </div>
      </div>
    );
  }

  // Transform the raw player data to our UI format with safe defaults
  const player = transformPlayerData(rawPlayer);

  return (
    <div className="flex  montserrat flex-col min-h-fit bg-white font-sans">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-8 sm:py-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Profile Picture */}
          <div className="md:col-span-3 mb-6 md:mb-0 flex justify-center items-center">
            <div className="bg-white rounded-lg w-32 h-32 sm:w-full sm:h-full flex justify-center items-center">
              {player.uploadedImage ? (
                <Image
                  src={player.uploadedImage}
                  alt={player.name}
                  width={1000}
                  height={1000}
                  className="w-40 h-40 sm:w-full sm:h-full object-cover rounded-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.display = "none";
                    img.parentElement
                      ?.querySelector(".fallback-image")
                      ?.classList.remove("hidden");
                  }}
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center fallback-image">
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
                {player.country === "Nigeria" && (
                  <div className="">
                    <Image
                      src="/images/profile/Nigeria Icon.png"
                      width={40}
                      height={20}
                      alt="Nigeria Flag"
                    />
                  </div>
                )}
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
                    <span className="font-[300] text-[10px] sm:text-xs relative bottom-2 tracking-wide">
                      APPS
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="md:col-span-2 lg:mt-16 mb-6 md:mb-0">
            <div className="bg-white rounded-lg mb-6 sm:mb-8 shadow-md">
              <div className="flex justify-between items-center w-full mb-0 p-3 sm:p-4">
                <div className="flex items-center w-full justify-between">
                  <h3 className="font-[400] text-xs sm:text-sm">
                    {player.team.name}
                  </h3>
                  <span className="ml-2 text-xs sm:text-sm">
                    {player.team.logo}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 px-2">
                <StatBar
                  label="Matches Played"
                  value={player.stats.matchesPlayed}
                />
                <StatBar
                  label="Minutes Played"
                  value={player.stats.minutesPlayed}
                />
              </div>
              <div className="mt-6 sm:mt-8">
                <div className="relative h-28 sm:h-40 flex justify-end items-end bg-blue-50 overflow-hidden">
                  <Image
                    className="w-full"
                    src="/images/profile/Vector 43 from Spives Web App.svg"
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
            <div className="">
              <h3 className="text-xs text-gray-400 mb-2 sm:mb-3 font-semibold">
                Top 3 Positions
              </h3>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap mb-4">
                {/* {player.positions.slice(0, 3).map((pos, index) => (
                  <PositionBadge key={`${pos}-${index}`} position={pos} active={true} />
                ))} */}
              </div>
              <div className="rounded-lg h-fit">
                <FootballField positions={player.positions} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
