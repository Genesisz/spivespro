"use client";
import React, { useState } from "react";
import { Instagram, Twitter, Facebook, Linkedin, Edit, Save, X, Music, ArrowLeft, ImageIcon } from "lucide-react";
import { useUser } from "../../../lib/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GalleryPage = () => {
  const { user, loading, authenticated } = useUser();
  const router = useRouter();
  
  // Social media state
  const [socials, setSocials] = useState({
    instagram: user?.socials?.instagram || '',
    twitter: user?.socials?.twitter || '',
    facebook: user?.socials?.facebook || '',
    linkedin: user?.socials?.linkedin || '',
    tiktok: user?.socials?.tiktok || ''
  });
  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);


  // Social media update function
  const updateSocialMedia = async () => {
    setSocialLoading(true);
    try {
      const response = await fetch('/api/user/update-socials', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(socials),
      });

      if (response.ok) {
        const data = await response.json();
        setSocials(data.socials);
        setIsEditingSocials(false);
      } else {
        console.error('Failed to update social media');
      }
    } catch (error) {
      console.error('Error updating social media:', error);
    } finally {
      setSocialLoading(false);
    }
  };

  if (loading || !authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-fit bg-white font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-950 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <ImageIcon size={24} className="text-blue-950" />
            <h1 className="text-2xl font-bold text-blue-950">Gallery & Social Media</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-8 w-full">
        {/* Gallery Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-950 mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for gallery items */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors">
              Upload Photos
            </button>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-950">Social Media Links</h2>
            <button
              onClick={() => isEditingSocials ? updateSocialMedia() : setIsEditingSocials(true)}
              disabled={socialLoading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors"
            >
              {socialLoading ? (
                <span>Saving...</span>
              ) : isEditingSocials ? (
                <>
                  <Save size={16} />
                  Save
                </>
              ) : (
                <>
                  <Edit size={16} />
                  Edit
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SocialMediaInput
              icon={<Instagram size={20} />}
              label="Instagram"
              value={socials.instagram}
              onChange={(value) => setSocials(prev => ({ ...prev, instagram: value }))}
              isEditing={isEditingSocials}
              placeholder="https://instagram.com/username"
            />
            <SocialMediaInput
              icon={<Twitter size={20} />}
              label="Twitter"
              value={socials.twitter}
              onChange={(value) => setSocials(prev => ({ ...prev, twitter: value }))}
              isEditing={isEditingSocials}
              placeholder="https://twitter.com/username"
            />
            <SocialMediaInput
              icon={<Facebook size={20} />}
              label="Facebook"
              value={socials.facebook}
              onChange={(value) => setSocials(prev => ({ ...prev, facebook: value }))}
              isEditing={isEditingSocials}
              placeholder="https://facebook.com/username"
            />
            <SocialMediaInput
              icon={<Linkedin size={20} />}
              label="LinkedIn"
              value={socials.linkedin}
              onChange={(value) => setSocials(prev => ({ ...prev, linkedin: value }))}
              isEditing={isEditingSocials}
              placeholder="https://linkedin.com/in/username"
            />
            <SocialMediaInput
              icon={<Music size={20} />}
              label="TikTok"
              value={socials.tiktok}
              onChange={(value) => setSocials(prev => ({ ...prev, tiktok: value }))}
              isEditing={isEditingSocials}
              placeholder="https://tiktok.com/@username"
            />
          </div>

          {isEditingSocials && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setIsEditingSocials(false);
                  setSocials({
                    instagram: user?.socials?.instagram || '',
                    twitter: user?.socials?.twitter || '',
                    facebook: user?.socials?.facebook || '',
                    linkedin: user?.socials?.linkedin || '',
                    tiktok: user?.socials?.tiktok || ''
                  });
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Social Media Input Component
const SocialMediaInput = ({
  icon,
  label,
  value,
  onChange,
  isEditing,
  placeholder
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  placeholder: string;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
    <div className="text-blue-950">{icon}</div>
    <div className="flex-1">
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      {isEditing ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="text-sm text-blue-950">
          {value ? (
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              {value.length > 30 ? `${value.substring(0, 30)}...` : value}
            </a>
          ) : (
            <span className="text-gray-400">Not set</span>
          )}
        </div>
      )}
    </div>
  </div>
);

export default GalleryPage;
