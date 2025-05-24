
import React, { useState } from 'react';
import { Camera, Edit, MapPin, Globe, Phone, Mail, Users, MessageCircle, Play, Upload, Eye, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import type { UserProfile, ProfileAnalytics } from '@/types/profile';

interface ProfileHeaderProps {
  profile: UserProfile | null;
  analytics: ProfileAnalytics | null;
  isOwner: boolean;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  analytics,
  isOwner, 
  onEdit 
}) => {
  const { user } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  
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

  const handleVideoUpload = () => {
    console.log('Upload video');
  };

  return (
    <div className="relative">
      {/* Cover Photo/Video */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 overflow-hidden">
        {profile?.cover_video_url && showVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            onEnded={() => setShowVideo(false)}
          >
            <source src={profile.cover_video_url} type="video/mp4" />
          </video>
        ) : profile?.cover_photo_url ? (
          <img
            src={profile.cover_photo_url}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800" />
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Cover Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          {profile?.cover_video_url && !showVideo && (
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-gray-800"
              onClick={() => setShowVideo(true)}
            >
              <Play className="h-4 w-4 mr-2" />
              Play Video
            </Button>
          )}
          
          {isOwner && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-800"
                onClick={handleVideoUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-800"
                onClick={handleCoverPhotoEdit}
              >
                <Camera className="h-4 w-4 mr-2" />
                Edit Cover
              </Button>
            </>
          )}
        </div>

        {/* Brand Logo */}
        {profile?.brand_logo_url && (
          <div className="absolute bottom-4 left-4">
            <img
              src={profile.brand_logo_url}
              alt="Brand Logo"
              className="h-12 w-auto bg-white rounded-lg p-2 shadow-lg"
            />
          </div>
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
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name || 'Professional Name'}
                </h1>
                {profile?.verification_status === 'verified' && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-xl text-gray-700 mb-1 leading-relaxed">
                {profile?.professional_headline || 'Add your professional headline to let others know what you do'}
              </p>
              
              {profile?.headline_tagline && (
                <p className="text-md text-gray-600 mb-3 italic">
                  {profile.headline_tagline}
                </p>
              )}
              
              {/* Current Position */}
              {(profile?.current_position || profile?.current_company) && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-700 font-medium">
                    {profile.current_position}
                    {profile.current_position && profile.current_company && ' at '}
                    {profile.current_company}
                  </span>
                </div>
              )}
              
              {/* Location and Contact Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                {profile?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile?.industry && (
                  <div className="flex items-center gap-1">
                    <span>•</span>
                    <span>{profile.industry}</span>
                  </div>
                )}
                {profile?.years_experience && (
                  <div className="flex items-center gap-1">
                    <span>•</span>
                    <span>{profile.years_experience}+ years experience</span>
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

              {/* Stats Row */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-blue-600">500+ connections</span>
                </div>
                {analytics && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{analytics.profile_views} profile views today</span>
                  </div>
                )}
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

        {/* Analytics Cards */}
        {isOwner && analytics && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold">{analytics.profile_views}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resume Downloads</p>
                    <p className="text-2xl font-bold">{analytics.resume_downloads}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Contact Requests</p>
                    <p className="text-2xl font-bold">{analytics.contact_requests}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Search Appearances</p>
                    <p className="text-2xl font-bold">{analytics.search_appearances}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
