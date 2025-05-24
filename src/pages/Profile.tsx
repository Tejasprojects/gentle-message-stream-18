
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import StudentDashboardLayout from '@/components/layout/StudentDashboardLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { AboutSection } from '@/components/profile/sections/AboutSection';
import { ExperienceSection } from '@/components/profile/sections/ExperienceSection';
import { SkillsSection } from '@/components/profile/sections/SkillsSection';
import { CertificationsSection } from '@/components/profile/sections/CertificationsSection';
import { ResumeSection } from '@/components/profile/sections/ResumeSection';
import { EditProfileModal } from '@/components/profile/modals/EditProfileModal';
import { AddExperienceModal } from '@/components/profile/modals/AddExperienceModal';
import { AddSkillModal } from '@/components/profile/modals/AddSkillModal';
import { AddCertificationModal } from '@/components/profile/modals/AddCertificationModal';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { 
    profile, 
    experiences, 
    skills, 
    certifications, 
    resumeFiles,
    loading, 
    refetch 
  } = useProfile(userId);

  const isOwner = !userId || userId === user?.id;

  // Modal states
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [addCertificationOpen, setAddCertificationOpen] = useState(false);

  if (loading) {
    return (
      <StudentDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </StudentDashboardLayout>
    );
  }

  const handleEdit = () => {
    setEditProfileOpen(true);
  };

  const handleAddExperience = () => {
    setAddExperienceOpen(true);
  };

  const handleEditExperience = (experience: any) => {
    console.log('Edit experience', experience);
  };

  const handleAddSkill = () => {
    setAddSkillOpen(true);
  };

  const handleEditSkills = () => {
    console.log('Edit skills');
  };

  const handleAddCertification = () => {
    setAddCertificationOpen(true);
  };

  const handleEditCertification = (certification: any) => {
    console.log('Edit certification', certification);
  };

  return (
    <StudentDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <ProfileHeader
              profile={profile}
              isOwner={isOwner}
              onEdit={handleEdit}
            />
          </div>

          {/* Profile Sections */}
          <div className="space-y-6">
            {/* About Section */}
            <AboutSection
              about={profile?.about_summary}
              isOwner={isOwner}
              onEdit={handleEdit}
            />

            {/* Experience Section */}
            <ExperienceSection
              experiences={experiences}
              isOwner={isOwner}
              onAdd={handleAddExperience}
              onEdit={handleEditExperience}
            />

            {/* Skills Section */}
            <SkillsSection
              skills={skills}
              isOwner={isOwner}
              onAdd={handleAddSkill}
              onEdit={handleEditSkills}
            />

            {/* Certifications Section */}
            <CertificationsSection
              certifications={certifications}
              isOwner={isOwner}
              onAdd={handleAddCertification}
              onEdit={handleEditCertification}
            />

            {/* Resume Section - Only for profile owner */}
            {isOwner && (
              <ResumeSection
                resumeFiles={resumeFiles}
                isOwner={isOwner}
                onUpload={refetch}
              />
            )}
          </div>
        </div>

        {/* Modals */}
        <EditProfileModal
          isOpen={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          profile={profile}
          onUpdate={refetch}
        />

        <AddExperienceModal
          isOpen={addExperienceOpen}
          onClose={() => setAddExperienceOpen(false)}
          onSuccess={refetch}
        />

        <AddSkillModal
          isOpen={addSkillOpen}
          onClose={() => setAddSkillOpen(false)}
          onSuccess={refetch}
        />

        <AddCertificationModal
          isOpen={addCertificationOpen}
          onClose={() => setAddCertificationOpen(false)}
          onSuccess={refetch}
        />
      </div>
    </StudentDashboardLayout>
  );
};

export default Profile;
