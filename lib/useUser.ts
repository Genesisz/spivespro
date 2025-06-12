import { useSession } from 'next-auth/react';

export interface AppUser {
  id?: string;
  email?: string;
  nickname?: string;
  fullName?: string;
  country?: string;
  stateRegion?: string;
  position?: string;
  dateOfBirth?: string;
  foot?: string;
  club?: string;
  phoneNumber?: string;
  selectedPositions?: string[];
  stats?: { tops: number; matchesPlayed: number; minutesPlayed: number };
  team?: { name: string; logo: string };
  uploadedImageUrl?: string;
  uploadedImagePublicId?: string;
  uploadedFileName?: string;
  step?: number;
  createdAt?: string;
  updatedAt?: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
  };
  [key: string]: any;
}

export function useUser() {
  const { data, status } = useSession();
  console.log({status, data})
  return {
    user: (data?.user as AppUser) ?? null,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
  };
}