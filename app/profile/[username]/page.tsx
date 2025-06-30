"use client";
import React, { useEffect, useState } from "react";
import { Share2, Star, MapPin, Mail, Globe, Target } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
    goals?: number;
    assists?: number;
    rating?: number;
  };
  team: {
    name: string;
    logo: string;
  };
  uploadedImage: string;
  email?: string;
  bio?: string;
  joinedDate?: string;
  status?: 'active' | 'scouted' | 'contracted' | 'potential';
}

// Enhanced sample player data for public viewing
const samplePlayers: { [key: string]: PlayerData } = {
  "kemi-adebayo": {
    username: "kemi-adebayo",
    name: "Kemi Adebayo",
    country: "Nigeria",
    position: "CF",
    age: 17,
    foot: "Right Footer",
    positions: ["CF", "LW", "RW"],
    club: "Lagos Youth FC",
    stats: {
      tops: 15,
      matchesPlayed: 42,
      minutesPlayed: 3780,
      goals: 28,
      assists: 12,
      rating: 8.5
    },
    team: {
      name: "Lagos Youth FC",
      logo: "🇳🇬",
    },
    uploadedImage: "",
    email: "kemi.adebayo@email.com",
    bio: "Passionate striker with exceptional pace and finishing ability. Currently developing skills at Lagos Youth FC academy.",
    joinedDate: "2024-01-15",
    status: "scouted"
  },
  "samuel-osei": {
    username: "samuel-osei",
    name: "Samuel Osei",
    country: "Ghana",
    position: "RW",
    age: 16,
    foot: "Left Footer",
    positions: ["RW", "LW", "AM"],
    club: "Accra Stars",
    stats: {
      tops: 12,
      matchesPlayed: 38,
      minutesPlayed: 3420,
      goals: 15,
      assists: 22,
      rating: 7.8
    },
    team: {
      name: "Accra Stars",
      logo: "🇬🇭",
    },
    uploadedImage: "",
    email: "samuel.osei@email.com",
    bio: "Creative winger with excellent dribbling skills and vision. Known for creating opportunities for teammates.",
    joinedDate: "2024-01-14",
    status: "potential"
  },
  "amara-diallo": {
    username: "amara-diallo",
    name: "Amara Diallo",
    country: "Senegal",
    position: "CM",
    age: 18,
    foot: "Right Footer",
    positions: ["CM", "CAM", "CDM"],
    club: "Dakar United",
    stats: {
      tops: 18,
      matchesPlayed: 45,
      minutesPlayed: 4050,
      goals: 8,
      assists: 16,
      rating: 8.2
    },
    team: {
      name: "Dakar United",
      logo: "🇸🇳",
    },
    uploadedImage: "",
    email: "amara.diallo@email.com",
    bio: "Versatile midfielder with strong passing range and tactical awareness. Future leader on the pitch.",
    joinedDate: "2024-01-13",
    status: "contracted"
  }
};

function getStatusInfo(status: string) {
  switch (status) {
    case 'scouted':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Under Scout Review' };
    case 'contracted':
      return { bg: 'bg-green-100', text: 'text-green-700', label: 'Contracted Player' };
    case 'potential':
      return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Rising Talent' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Active Player' };
  }
}

function getCountryFlag(country: string) {
  const flags: { [key: string]: string } = {
    'Nigeria': '🇳🇬',
    'Ghana': '🇬🇭',
    'Senegal': '🇸🇳',
    'South Africa': '🇿🇦',
    'Kenya': '🇰🇪',
    'Cameroon': '🇨🇲'
  };
  return flags[country] || '🌍';
}

export default function PublicProfile() {
  const params = useParams();
  const username = params.username as string;
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerData() {
      try {
        // Try to fetch from API first
        const response = await fetch(`/api/profile/${username}`);
        if (!response.ok) {
          // Fallback to sample data if API fails
          const samplePlayer = samplePlayers[username];
          if (samplePlayer) {
            setPlayer(samplePlayer);
          } else {
            setError("Player not found");
          }
        } else {
          const data = await response.json();
          setPlayer(data);
        }
      } catch {
        // Use sample data as fallback
        const samplePlayer = samplePlayers[username];
        if (samplePlayer) {
          setPlayer(samplePlayer);
        } else {
          setError("Player not found");
        }
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchPlayerData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading player profile...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-500 text-2xl">⚽</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Player Not Found</h1>
          <p className="text-gray-600 mb-4">The player profile you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(player.status || 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-blue-900 hover:text-blue-800 font-medium">
              ← Back to Spives
            </Link>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  {player.uploadedImage ? (
                    <img
                      src={player.uploadedImage}
                      alt={player.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 text-2xl font-bold">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 text-2xl">
                    {getCountryFlag(player.country)}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                    {player.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {player.position}
                    </span>
                    <span className="text-gray-600">{player.age} years old</span>
                    <span className="text-gray-600">{player.foot}</span>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                    <Target className="w-4 h-4 mr-1" />
                    {statusInfo.label}
                  </div>
                </div>

                {player.stats.rating && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-gray-900">{player.stats.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                  </div>
                )}
              </div>

              {player.bio && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{player.bio}</p>
                </div>
              )}
            </div>

            {/* Player Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Performance Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{player.stats.matchesPlayed}</div>
                  <div className="text-sm text-gray-600">Matches Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {Math.floor(player.stats.minutesPlayed / 60)}h {player.stats.minutesPlayed % 60}m
                  </div>
                  <div className="text-sm text-gray-600">Playing Time</div>
                </div>
                {player.stats.goals !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{player.stats.goals}</div>
                    <div className="text-sm text-gray-600">Goals</div>
                  </div>
                )}
                {player.stats.assists !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{player.stats.assists}</div>
                    <div className="text-sm text-gray-600">Assists</div>
                  </div>
                )}
              </div>

              {/* Positions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Playing Positions</h3>
                <div className="flex flex-wrap gap-2">
                  {player.positions.map((pos, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {pos}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Interested in scouting or recruiting {player.name.split(' ')[0]}? 
                  Connect with us through Spives platform for official inquiries.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Contact Scout</span>
                  </button>
                  <Link href="/register" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Globe className="w-4 h-4" />
                    <span>Join Spives</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Club & Additional Info */}
          <div className="space-y-6">
            {/* Club Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-blue-900 mb-4">Current Club</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{player.team.logo}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{player.club}</h4>
                  <p className="text-sm text-gray-600">{player.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{player.country}</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-blue-900 mb-4">Profile Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Username</span>
                  <span className="font-medium">@{player.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium">{player.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preferred Foot</span>
                  <span className="font-medium">{player.foot}</span>
                </div>
                {player.joinedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined Spives</span>
                    <span className="font-medium">
                      {new Date(player.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Share Profile */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3">Share This Profile</h3>
              <p className="text-sm text-blue-700 mb-4">
                Help {player.name.split(' ')[0]} get discovered by sharing their profile with scouts and coaches.
              </p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 