"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Linkedin, Save, Edit3, Plus, Trash2, ExternalLink, Video } from 'lucide-react';

interface SocialMediaData {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  tiktok?: string;
}

interface SocialMediaUpdateProps {
  currentSocials?: SocialMediaData;
  onUpdate?: (socials: SocialMediaData) => void;
}

const SocialMediaUpdate: React.FC<SocialMediaUpdateProps> = ({ 
  currentSocials = {}, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socials, setSocials] = useState<SocialMediaData>(currentSocials);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    setSocials(currentSocials);
  }, [currentSocials]);

  const validateUrl = (url: string) => {
    if (!url) return true; // Empty is okay
    const urlPattern = /^https?:\/\/.+/;
    return urlPattern.test(url);
  };

  const handleInputChange = (platform: keyof SocialMediaData, value: string) => {
    setSocials(prev => ({ ...prev, [platform]: value }));
    
    // Clear error if it exists
    if (errors[platform]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
    
    // Clear success message when editing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleDelete = (platform: keyof SocialMediaData) => {
    setSocials(prev => ({ ...prev, [platform]: '' }));
    if (errors[platform]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    // Validate URLs
    const newErrors: Record<string, string> = {};
    
    Object.entries(socials).forEach(([platform, url]) => {
      if (url && !validateUrl(url)) {
        newErrors[platform] = 'Please enter a valid URL (starting with http:// or https://)';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/user/update-socials', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instagram: socials.instagram || '',
          twitter: socials.twitter || '',
          facebook: socials.facebook || '',
          linkedin: socials.linkedin || '',
          tiktok: socials.tiktok || ''
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update social media');
      }

      const data = await response.json();
      setIsEditing(false);
      setSuccessMessage('Social media links updated successfully!');
      onUpdate?.(socials);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating socials:', error);
      setErrors({ general: 'Failed to update social media. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSocials(currentSocials);
    setErrors({});
    setSuccessMessage('');
    setIsEditing(false);
  };

  const socialPlatforms = [
    {
      key: 'instagram' as keyof SocialMediaData,
      icon: Instagram,
      label: 'Instagram',
      placeholder: 'https://instagram.com/username',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50'
    },
    {
      key: 'twitter' as keyof SocialMediaData,
      icon: Twitter,
      label: 'Twitter',
      placeholder: 'https://twitter.com/username',
      color: 'text-blue-400',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'facebook' as keyof SocialMediaData,
      icon: Facebook,
      label: 'Facebook',
      placeholder: 'https://facebook.com/username',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'linkedin' as keyof SocialMediaData,
      icon: Linkedin,
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/in/username',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'tiktok' as keyof SocialMediaData,
      icon: Video,
      label: 'TikTok',
      placeholder: 'https://tiktok.com/@username',
      color: 'text-black',
      bgColor: 'bg-gray-50'
    }
  ];

  const hasAnySocials = Object.values(socials).some(url => url && url.trim() !== '');

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Social Media</h3>
        {!isEditing && (
          <motion.button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {hasAnySocials ? <Edit3 size={16} /> : <Plus size={16} />}
            {hasAnySocials ? 'Edit' : 'Add Social Media'}
          </motion.button>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Error Message */}
      {errors.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm"
        >
          {errors.general}
        </motion.div>
      )}

      {!hasAnySocials && !isEditing ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <Instagram size={48} className="mx-auto mb-2" />
          </div>
          <p className="text-gray-500 mb-4">No social media links added yet</p>
          <p className="text-sm text-gray-400">
            Connect your social media profiles to share with your network
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {socialPlatforms.map(({ key, icon: Icon, label, placeholder, color, bgColor }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon size={18} className={color} />
                <label className="text-sm font-medium text-gray-700">{label}</label>
              </div>
              
              {isEditing ? (
                <div className="relative">
                  <input
                    type="url"
                    value={socials[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {socials[key] && (
                    <button
                      onClick={() => handleDelete(key)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                      title="Clear this field"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  {errors[key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                  )}
                </div>
              ) : (
                <div className={`p-3 ${bgColor} rounded-lg`}>
                  {socials[key] ? (
                    <div className="flex items-center justify-between">
                      <a
                        href={socials[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 break-all flex items-center gap-2"
                      >
                        <span className="truncate">{socials[key]}</span>
                        <ExternalLink size={14} className="flex-shrink-0" />
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="flex justify-end gap-3 mt-6">
          <motion.button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default SocialMediaUpdate;
