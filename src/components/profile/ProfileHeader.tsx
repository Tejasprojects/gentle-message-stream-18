
import React, { useState } from 'react';
import { Camera, Edit, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import type { UserProfile } from '@/types/profile';

interface ProfileHeaderProps {
  profile: UserProfile | null;
  isOwner: boolean;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  isOwner, 
  onEdit 
}) => {
  const { user } = useAuth();
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div 
        className="h-80 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 relative overflow-hidden"
        style={profile?.cover_photo_url ? {
          backgroundImage: `url(${profile.cover_photo_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        {isOwner && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
                <AvatarImage src={profile?.profile_photo_url} />
                <AvatarFallback className="text-2xl bg-gray-100">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              {isOwner && (
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Name and Headline */}
            <div className="mt-4 md:mt-0 md:mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.name || 'Professional Name'}
              </h1>
              <p className="text-xl text-gray-600 mt-1">
                {profile?.professional_headline || 'Professional Headline'}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-500">
                {profile?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile?.website_url && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={profile.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 md:mt-0 flex gap-2">
            {isOwner ? (
              <Button onClick={onEdit} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button>
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg flex flex-wrap items-center gap-4">
          {user?.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          )}
          {profile?.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{profile.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
