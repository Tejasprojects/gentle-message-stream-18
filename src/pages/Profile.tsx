
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Camera, Edit, MapPin, Mail, Phone, Plus, ExternalLink } from 'lucide-react';
import StudentDashboardLayout from '@/components/layout/StudentDashboardLayout';
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

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEditCover = () => {
    console.log('Edit cover photo');
  };

  const handleEditProfilePhoto = () => {
    console.log('Edit profile photo');
  };

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
    }
  };

  const handleViewConnections = () => {
    console.log('View connections');
  };

  const handleViewMutualConnections = () => {
    console.log('View mutual connections');
  };

  const handleEditAbout = () => {
    setEditProfileOpen(true);
  };

  const handleAddExperience = () => {
    setAddExperienceOpen(true);
  };

  const handleAddEducation = () => {
    console.log('Add education');
  };

  const handleAddSkill = () => {
    setAddSkillOpen(true);
  };

  const handleAddCertification = () => {
    setAddCertificationOpen(true);
  };

  const handleViewSkillDetails = (skillName: string) => {
    console.log('View skill details:', skillName);
  };

  return (
    <StudentDashboardLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        {/* Fixed height container to prevent double scrollbars */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          <div className="w-full max-w-[1128px] mx-auto px-6 py-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-lg shadow-sm mb-2 overflow-hidden">
              {/* Cover Photo */}
              <div className="relative h-[200px] bg-gradient-to-r from-[#0a66c2] to-[#004182]">
                {isOwner && (
                  <button
                    onClick={handleEditCover}
                    className="absolute top-4 right-4 bg-white hover:bg-[#f3f2ef] border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-[#0a66c2] flex items-center gap-1 transition-all"
                  >
                    <Camera className="h-4 w-4" />
                    Edit Cover
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="relative px-6 pb-6" style={{ paddingTop: '80px' }}>
                {/* Profile Photo */}
                <div
                  onClick={isOwner ? handleEditProfilePhoto : undefined}
                  className={`absolute -top-[60px] left-6 w-[152px] h-[152px] rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white ${isOwner ? 'cursor-pointer hover:scale-105' : ''} transition-transform`}
                >
                  {getInitials(user?.name)}
                </div>

                {/* Edit Profile Button */}
                {isOwner && (
                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="absolute top-5 right-6 bg-transparent hover:bg-[#e7f3ff] border border-[#0a66c2] rounded-full px-6 py-2 text-[#0a66c2] font-semibold flex items-center gap-2 transition-all"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </button>
                )}

                {/* Name and Headline */}
                <h1 className="text-3xl font-normal text-gray-900 mb-1">
                  {user?.name || 'Professional Name'}
                </h1>
                <div className="text-xl text-gray-900 mb-2">
                  {profile?.professional_headline || 'Add your professional headline to let others know what you do'}
                </div>
                <div className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile?.location || 'Add your location'}
                </div>

                {/* Contact Info */}
                <div
                  onClick={handleCopyEmail}
                  className="text-sm text-[#0a66c2] cursor-pointer hover:underline mb-4 flex items-center gap-4"
                >
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user?.email}
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {profile.phone}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex gap-6 pt-3 border-t border-gray-200 text-sm">
                  <span
                    onClick={handleViewConnections}
                    className="text-[#0a66c2] font-semibold cursor-pointer hover:underline"
                  >
                    500+ connections
                  </span>
                  <span
                    onClick={handleViewMutualConnections}
                    className="text-[#0a66c2] font-semibold cursor-pointer hover:underline"
                  >
                    15 mutual connections
                  </span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm mb-2">
              <div className="flex justify-between items-center px-6 py-6 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">About</h2>
                {isOwner && (
                  <button
                    onClick={handleEditAbout}
                    className="bg-transparent hover:bg-[#e7f3ff] border border-[#0a66c2] rounded-full px-4 py-2 text-[#0a66c2] font-semibold text-sm flex items-center gap-1 transition-all"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                )}
              </div>
              <div className="px-6 pb-6">
                {profile?.about_summary ? (
                  <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">
                    {profile.about_summary}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-sm text-gray-600 italic p-5 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      {isOwner 
                        ? "Add a professional summary to help others understand your background and expertise."
                        : "No summary provided."
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow-sm mb-2">
              <div className="flex justify-between items-center px-6 py-6 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
                {isOwner && (
                  <button
                    onClick={handleAddExperience}
                    className="bg-transparent hover:bg-[#e7f3ff] border border-[#0a66c2] rounded-full px-4 py-2 text-[#0a66c2] font-semibold text-sm flex items-center gap-1 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                )}
              </div>
              <div className="px-6 pb-6">
                {experiences.length > 0 ? (
                  <div className="space-y-4">
                    {experiences.map((experience, index) => (
                      <div key={experience.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#0a66c2] to-[#004182] rounded flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {experience.company_name.substring(0, 3).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{experience.job_title}</h3>
                          <div className="text-sm text-gray-700 mb-1">{experience.company_name} · {experience.employment_type || 'Full-time'}</div>
                          <div className="text-xs text-gray-600 mb-2">
                            {new Date(experience.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                            {experience.is_current ? 'Present' : experience.end_date ? new Date(experience.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                          </div>
                          {experience.description && (
                            <div className="text-sm text-gray-900 leading-relaxed">
                              {experience.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-sm text-gray-600 italic p-5 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      {isOwner 
                        ? "Add your work experience to showcase your professional journey."
                        : "No experience added yet."
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm mb-2">
              <div className="flex justify-between items-center px-6 py-6 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                {isOwner && (
                  <button
                    onClick={handleAddSkill}
                    className="bg-transparent hover:bg-[#e7f3ff] border border-[#0a66c2] rounded-full px-4 py-2 text-[#0a66c2] font-semibold text-sm flex items-center gap-1 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                )}
              </div>
              <div className="px-6 pb-6">
                {skills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => handleViewSkillDetails(skill.skill_name)}
                        className="bg-[#f3f2ef] hover:bg-[#e9e5df] p-4 rounded-lg flex justify-between items-center cursor-pointer transition-all hover:-translate-y-1"
                      >
                        <span className="text-sm font-semibold text-gray-900">{skill.skill_name}</span>
                        <span className="text-xs text-[#0a66c2] font-semibold">{skill.endorsement_count} endorsements</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-sm text-gray-600 italic p-5 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      {isOwner 
                        ? "Add your skills to showcase your expertise."
                        : "No skills added yet."
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="bg-white rounded-lg shadow-sm mb-2">
              <div className="flex justify-between items-center px-6 py-6 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Certifications & Licenses</h2>
                {isOwner && (
                  <button
                    onClick={handleAddCertification}
                    className="bg-transparent hover:bg-[#e7f3ff] border border-[#0a66c2] rounded-full px-4 py-2 text-[#0a66c2] font-semibold text-sm flex items-center gap-1 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                )}
              </div>
              <div className="px-6 pb-6">
                {certifications.length > 0 ? (
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0">
                        <div className="w-12 h-12 bg-[#0a66c2] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          CERT
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{cert.certification_name}</h3>
                          <div className="text-sm text-gray-700 mb-1">{cert.issuing_organization}</div>
                          <div className="text-xs text-gray-600">
                            {cert.issue_date && `Issued ${new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                            {cert.expiration_date && ` • Expires ${new Date(cert.expiration_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                          </div>
                          {cert.verification_url && (
                            <a
                              href={cert.verification_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#0a66c2] hover:underline flex items-center gap-1 mt-2"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Credential
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-sm text-gray-600 italic p-5 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      {isOwner 
                        ? "Add your certifications to demonstrate your professional credentials."
                        : "No certifications added yet."
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resume Files Section */}
            {isOwner && (
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center px-6 py-6 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Resume Files</h2>
                </div>
                <div className="px-6 pb-6">
                  {resumeFiles.length > 0 ? (
                    <div className="space-y-3">
                      {resumeFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                              PDF
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{file.file_name}</div>
                              <div className="text-xs text-gray-500">
                                {(file.file_size! / 1024 / 1024).toFixed(2)} MB
                                {file.is_primary && <span className="ml-2 text-blue-600 font-medium">Primary</span>}
                              </div>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="text-4xl text-gray-400 mb-4">📄</div>
                      <div className="text-lg font-medium text-gray-900 mb-2">Drag & drop your resume, or click to select</div>
                      <div className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX files (Max 10MB)</div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Upload Resume
                      </button>
                      <div className="text-xs text-gray-500 mt-4">
                        Upload your resume files to share with potential employers.
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
