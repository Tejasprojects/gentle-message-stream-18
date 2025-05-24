
import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import StudentDashboardLayout from '@/components/layout/StudentDashboardLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { AboutSection } from '@/components/profile/sections/AboutSection';
import { ExperienceSection } from '@/components/profile/sections/ExperienceSection';
import { SkillsSection } from '@/components/profile/sections/SkillsSection';
import { CertificationsSection } from '@/components/profile/sections/CertificationsSection';
import { ResumeSection } from '@/components/profile/sections/ResumeSection';
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
    // TODO: Open edit modal
    console.log('Edit profile');
  };

  const handleAddExperience = () => {
    // TODO: Open add experience modal
    console.log('Add experience');
  };

  const handleEditExperience = (experience: any) => {
    // TODO: Open edit experience modal
    console.log('Edit experience', experience);
  };

  const handleAddSkill = () => {
    // TODO: Open add skill modal
    console.log('Add skill');
  };

  const handleEditSkills = () => {
    // TODO: Open edit skills modal
    console.log('Edit skills');
  };

  const handleAddCertification = () => {
    // TODO: Open add certification modal
    console.log('Add certification');
  };

  const handleEditCertification = (certification: any) => {
    // TODO: Open edit certification modal
    console.log('Edit certification', certification);
  };

  return (
    <StudentDashboardLayout>
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
    </StudentDashboardLayout>
  );
};

export default Profile;
