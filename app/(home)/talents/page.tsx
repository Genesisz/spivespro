"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
interface TalentData {
  _id: string;
  fullName: string;
  email: string;
  position?: string;
  club?: string;
  role: string;
  country?: string;
  uploadedImageUrl?: string;
  createdAt: string;
  age?: number;
  rating?: number;
  status?: "active" | "scouted" | "contracted" | "potential";
  lastActivity?: string;
  selectedPositions: string[];
  foot: string;
}

export default function TalentsPage() {
  const [talents, setTalents] = useState<TalentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    powerFoot: "",
    age: "",
    position: "",
    search: "",
  });

  const fetchTalents = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        powerFoot: filters.powerFoot,
        age: filters.age,
        position: filters.position,
        search: filters.search,
      });

      const response = await fetch(`/api/talents?${queryParams}`);
      console.log({ response });
      if (!response.ok) throw new Error("Failed to fetch talents");

      const data = await response.json();
      console.log({ data });
      setTalents(data.talents);
      setTotalPages(Math.ceil(data.total / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error("Error fetching talents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, [currentPage, filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen montserrat bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.powerFoot}
            onChange={(e) => handleFilterChange("powerFoot", e.target.value)}
          >
            <option value="">Power Foot</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.age}
            onChange={(e) => handleFilterChange("age", e.target.value)}
          >
            <option value="">Age</option>
            <option value="14-16">14-16</option>
            <option value="17-19">17-19</option>
            <option value="20+">20+</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.position}
            onChange={(e) => handleFilterChange("position", e.target.value)}
          >
            <option value="">Position</option>
            <option value="GK">Goalkeeper</option>
            <option value="CB">Center Back</option>
            <option value="LB">Left Back</option>
            <option value="RB">Right Back</option>
            <option value="CDM">Defensive Mid</option>
            <option value="CM">Central Mid</option>
            <option value="CAM">Attacking Mid</option>
            <option value="LW">Left Wing</option>
            <option value="RW">Right Wing</option>
            <option value="ST">Striker</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search talents..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setFilters({ powerFoot: "", age: "", position: "", search: "" });
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Update
          </button>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {talents.map((talent) => (
            <div
              key={talent._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative rounded-md overflow-hidden aspect-square flex justify-center items-center">
                <div>
                  <img
                    src={
                      talent.uploadedImageUrl ||
                      "/images/profile/default-avatar.png"
                    }
                    alt={talent.fullName}
                    className="w-full h-full object-cover relative z-10"
                  />
                  <img
                    src="/images/player card bg.svg"
                    alt={talent.fullName}
                    className="w-full h-full object-cover absolute top-0 left-0"
                  />
                </div>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <div className="w-5 h-5">
                    <Image
                      src="/images/profile/Nigeria Icon.png"
                      width={40}
                      height={20}
                      alt=""
                    />
                  </div>
                  <span className="text-xs bg-white">NG</span>
                </div>
                <div className="absolute top-2 right-2">
                  <img
                    src="/images/profile/Spives Web App Icon.svg"
                    alt="Spives"
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <div className="flex h-fit gap-1 border-2 border-blue-950 bg-blue-950 mt-1 rounded-md">
                <div className="w-8/12 p-2 bg-white rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-sm truncate">
                    {talent.fullName}
                  </h3>
                  {/* <span className="text-lg font-bold">10</span> */}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="text-blue-950">
                    <p>{talent.position}</p>
                    <p>{talent.age}</p>
                    <p>{talent.foot} footer</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex gap-1 mt-1">
                  {
                    talent.selectedPositions.map((position, index) => (
                      <div key={index} className="w-7 text-[10px] flex items-center justify-center text-orange-200 h-7 rounded-full bg-blue-900">
                        {position}
                      </div>
                    ))
                  }
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl text-blue-950 font-[500]">10</h1>
                    <p className="text-xs">Apps</p>
                  </div>
                </div>
                </div>
                <div className="w-4/12 h-full my-auto">
                <FootballField positions={talent.selectedPositions} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-900 text-white"
                    : "border border-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



const FootballField = ({ positions }: { positions: string[] }) => {
  return (
    <div className="relative w-full h-full bg-green-500 rounded-md overflow-hidden">
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

      {/* {positions.includes("LWB") && (
        <div className="absolute bottom-1/4 left-1/3 transform -translate-y-1/2 w-10 h-10 bg-blue-brand-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
          LWB
        </div>
      )} */}

      {positions.includes("CB") && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-brand-700 text-white rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-md">
          CB
        </div>
      )}
    </div>
  );
};
