import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Crown, Shield, User, Eye, Medal, Target, Clock } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getRoleIcon(role: string) {
  switch (role) {
    case "admin":
      return Crown;
    case "coach":
      return Shield;
    default:
      return User;
  }
}

export function getPlayerStatus(status: string) {
  switch (status) {
    case "scouted":
      return { bg: "bg-yellow-100", text: "text-yellow-700", icon: Eye };
    case "contracted":
      return { bg: "bg-green-100", text: "text-green-700", icon: Medal };
    case "potential":
      return { bg: "bg-blue-100", text: "text-blue-700", icon: Target };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", icon: Clock };
  }
}
