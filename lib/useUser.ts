import { useSession } from 'next-auth/react';

export interface AppUser {
  id?: string;
  email?: string;
  nickname?: string;
  fullName?: string;
  country?: string;
  position?: string;
  dateOfBirth?: string;
  foot?: string;
  selectedPositions?: string[];
  stats?: { tops: number; matchesPlayed: number; minutesPlayed: number };
  team?: { name: string; logo: string };
  uploadedImage?: string;
  [key: string]: any;
}

export function useUser() {
  const { data, status } = useSession();
  return {
    user: (data?.user as AppUser) ?? null,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
  };
} 