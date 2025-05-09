"use client";
import React from "react";
import { Settings, FileText, ImageIcon } from "lucide-react";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
        username: user.nickname || user.email,
        name: user.fullName || "",
        country: user.country || "",
        position: user.position || "",
        age: user.dateOfBirth
          ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
          : "",
        foot: user.foot || "",
        positions: Array.isArray(user.selectedPositions)
          ? user.selectedPositions.filter(
              (p): p is string => typeof p === "string"
            )
          : user.position
          ? [user.position]
          : [],
        stats: user.stats || { tops: 0, matchesPlayed: 0, minutesPlayed: 0 },
        team: user.team || { name: "", logo: "" },
        uploadedImage: user.uploadedImage || "",
      }
    : playerData;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
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
            <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden mr-2">
              <img
                src={
                  player.uploadedImage
                    ? `/uploads/${player.uploadedImage}`
                    : "/api/placeholder/100/100"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
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
