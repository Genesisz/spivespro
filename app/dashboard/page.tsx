"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Settings,
  MapPin,
  Calendar,
  Star,
  Trophy,
  Eye,
  Target,
  Globe,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalCoaches: number;
  totalAdmins: number;
  recentUsers: number;
}

interface RecentPlayer {
  id: string;
  name: string;
  position: string;
  age: number;
  country: string;
  club: string;
  rating: number;
  image?: string;
  joinedDate: string;
}

interface ScoutingActivity {
  id: string;
  playerName: string;
  location: string;
  date: string;
  scout: string;
  status: "completed" | "scheduled" | "in-progress";
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCoaches: 0,
    totalAdmins: 0,
    recentUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const [recentPlayers, setRecentPlayers] = useState<RecentPlayer[]>([]);

  const scoutingActivities: ScoutingActivity[] = [
    {
      id: "1",
      playerName: "Emmanuel Kujo",
      location: "Lagos, Nigeria",
      date: "2024-01-16",
      scout: "Michael Johnson",
      status: "scheduled",
    },
    {
      id: "2",
      playerName: "Grace Mensah",
      location: "Kumasi, Ghana",
      date: "2024-01-15",
      scout: "Sarah Williams",
      status: "completed",
    },
    {
      id: "3",
      playerName: "Abdul Rahman",
      location: "Kano, Nigeria",
      date: "2024-01-17",
      scout: "David Smith",
      status: "in-progress",
    },
  ];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch stats and recent players in parallel
        const [statsResponse, playersResponse] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/recent-players"),
        ]);

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        } else {
          // Use dummy data for better presentation
          setStats({
            totalUsers: 2847,
            totalCoaches: 156,
            totalAdmins: 12,
            recentUsers: 47,
          });
        }

        if (playersResponse.ok) {
          const playersData = await playersResponse.json();
          setRecentPlayers(playersData.players);
        } else {
          // Keep empty array if API fails
          setRecentPlayers([]);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        // Use dummy data when API fails
        setStats({
          totalUsers: 2847,
          totalCoaches: 156,
          totalAdmins: 12,
          recentUsers: 47,
        });
        setRecentPlayers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Football Agency Dashboard
            </h1>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Players",
      value: stats.totalUsers,
      icon: Users,
      change: "+12%",
      changeType: "increase",
      subtitle: "Registered talents",
    },
    {
      title: "Scouts & Coaches",
      value: stats.totalCoaches,
      icon: Eye,
      change: "+8%",
      changeType: "increase",
      subtitle: "Active scouts",
    },
    {
      title: "Club Partnerships",
      value: 84,
      icon: Trophy,
      change: "+15%",
      changeType: "increase",
      subtitle: "Partner clubs",
    },
    {
      title: "New This Week",
      value: stats.recentUsers,
      icon: TrendingUp,
      change: "+25%",
      changeType: "increase",
      subtitle: "Fresh talent",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Football Agency Dashboard
          </h1>
          <p className="text-gray-600">
            Discover, scout and develop the next generation of football stars
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 font-medium">
              Live Scouting
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
            New Scout Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <card.icon className="w-6 h-6" />
              </div>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  card.changeType === "increase"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-black mb-1">
                {card.value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 font-medium">{card.title}</p>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Player Registrations */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-blue-900">
              Latest Talent Discoveries
            </h3>
            <Link
              href="/dashboard/users"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Players
            </Link>
          </div>

          <div className="space-y-4">
            {recentPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {player.name}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span className="bg-white px-2 py-1 rounded text-xs font-medium">
                        {player.position}
                      </span>
                      <span>{player.age} years</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{player.country}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900">
                        {player.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{player.club}</p>
                  </div>
                  <Link
                    href={`/player/${player.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-blue-900 text-white rounded text-xs hover:bg-blue-800 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scouting Activities */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-6">
            Scouting Activities
          </h3>

          <div className="space-y-4">
            {scoutingActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 border border-gray-100 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {activity.playerName}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : activity.status === "scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Scout: {activity.scout}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors">
            Schedule New Scouting
          </button>
        </div>
      </div>

      {/* Additional Stats and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regional Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-6">
            Regional Talent Distribution
          </h3>

          <div className="space-y-4">
            {[
              {
                region: "West Africa",
                players: 1247,
                percentage: 44,
                flag: "🇳🇬",
              },
              {
                region: "East Africa",
                players: 892,
                percentage: 31,
                flag: "🇰🇪",
              },
              {
                region: "Central Africa",
                players: 468,
                percentage: 16,
                flag: "🇨🇲",
              },
              {
                region: "Southern Africa",
                players: 240,
                percentage: 9,
                flag: "🇿🇦",
              },
            ].map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{region.flag}</span>
                    <span className="font-medium text-gray-900">
                      {region.region}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {region.players} players
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Insights */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-6">
            Insights & Actions
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">
                  Trending Position
                </span>
              </div>
              <p className="text-sm text-blue-700">
                Center Forward is the most sought-after position this month
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Globe className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">New Market</span>
              </div>
              <p className="text-sm text-green-700">
                3 new clubs from Europe joined our network this week
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <span className="text-gray-700 font-medium">
                  Generate Scout Report
                </span>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <span className="text-gray-700 font-medium">
                  Player Analytics
                </span>
                <Trophy className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <span className="text-gray-700 font-medium">
                  Export Database
                </span>
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
