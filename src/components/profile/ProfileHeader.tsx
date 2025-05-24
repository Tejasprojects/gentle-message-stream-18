
import React, { useState } from 'react';
import { Camera, Edit, MapPin, Globe, Phone, Mail, Users, MessageCircle } from 'lucide-react';
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

  const handleConnect = () => {
    console.log('Connect clicked');
  };

  const handleMessage = () => {
    console.log('Message clicked');
  };

  const handleCoverPhotoEdit = () => {
    console.log('Edit cover photo');
  };

  const handleProfilePhotoEdit = () => {
    console.log('Edit profile photo');
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
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800"
            onClick={handleCoverPhotoEdit}
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <Avatar className="h-40 w-40 border-4 border-white shadow-xl">
                <AvatarImage src={profile?.profile_photo_url} />
                <AvatarFallback className="text-2xl bg-gray-100 text-gray-600">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              {isOwner && (
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700"
                  onClick={handleProfilePhotoEdit}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Name and Headline */}
            <div className="mt-4 lg:mt-0 lg:mb-4 flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {user?.name || 'Professional Name'}
              </h1>
              <p className="text-xl text-gray-700 mb-3 leading-relaxed">
                {profile?.professional_headline || 'Add your professional headline to let others know what you do'}
              </p>
              
              {/* Location and Contact Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
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

              {/* Connection Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-blue-600">500+ connections</span>
                </div>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  15 mutual connections
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 lg:mt-0 flex gap-2 flex-wrap">
            {isOwner ? (
              <Button onClick={onEdit} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleMessage}
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleConnect}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Contact Information Bar */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex flex-wrap items-center gap-6">
            {user?.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors">
                  {user.email}
                </a>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4" />
                <a href={`tel:${profile.phone}`} className="hover:text-blue-600 transition-colors">
                  {profile.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
