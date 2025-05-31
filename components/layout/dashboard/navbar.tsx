"use client";
import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
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

const Navbar = () => {
  const { user, loading, authenticated } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !authenticated && mounted) {
      router.push("/login");
    }
  }, [loading, authenticated, router, mounted]);

  if (!mounted || loading || !authenticated) {
    return (
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
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
        stats: user.stats || { tops: 0, matchesPlayed: 0, minutesPlayed: 0 },
        team: user.team || { name: user.club || 'No Club', logo: '⚽' },
        uploadedImage: user.uploadedImageUrl || '',
      }
    : playerData;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logo/logo.svg"
            alt="Spives Logo"
            width={150}
            height={50}
            className="h-10 w-auto"
          />
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink text="Clubs" />
          <NavLink text="Coaches" />
          <NavLink text="Talents" />
          <NavLink
            text="Logout"
            onClick={() => signOut({ callbackUrl: "/login" })}
          />
        </nav>
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-2 flex items-center justify-center">
              {player.uploadedImage ? (
                <img
                  src={player.uploadedImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-xs text-gray-500">No Image</span>';
                  }}
                />
              ) : (
                <span className="text-xs text-gray-500">No Image</span>
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{player.name}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Settings size={12} className="mr-1" /> Settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Logo = () => (
  <div className="flex items-center">
    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-2">
      <div className="w-6 h-6 rounded-full border-2 border-white"></div>
    </div>
    <span className="text-blue-900 font-bold text-xl">spives</span>
  </div>
);

const NavLink = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <a
    href="#"
    className="text-gray-700 hover:text-blue-900 font-medium"
    onClick={onClick}
  >
    {text}
  </a>
);
export default Navbar;
