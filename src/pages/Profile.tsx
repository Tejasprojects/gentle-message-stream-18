
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Camera, Edit, MapPin, Mail, Phone, Plus, ExternalLink, Globe, Users, MessageCircle } from 'lucide-react';
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
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </StudentDashboardLayout>
    );
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <StudentDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Cover Photo */}
            <div className="relative h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
              {isOwner && (
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
                  <Camera className="h-4 w-4" />
                  Edit Cover
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="relative px-8 pb-8" style={{ paddingTop: '4rem' }}>
              {/* Profile Photo */}
              <div className="absolute -top-16 left-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {getInitials(user?.name)}
                  </div>
                  {isOwner && (
                    <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-sm transition-all">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mb-6">
                {isOwner ? (
                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all">
                      <Users className="h-4 w-4" />
                      Connect
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user?.name || 'Your Name'}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1">
                    {profile?.professional_headline || 'Add your professional headline'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  {profile?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile?.website_url && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  {user?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                        {user.email}
                      </a>
                    </div>
                  )}
                  {profile?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    500+ connections
                  </span>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    15 mutual connections
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">About</h2>
                  {isOwner && (
                    <button
                      onClick={() => setEditProfileOpen(true)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="p-6">
                  {profile?.about_summary ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {profile.about_summary}
                    </p>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 italic">
                        {isOwner 
                          ? "Add a professional summary to help others understand your background and expertise."
                          : "No summary provided."
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
                  {isOwner && (
                    <button
                      onClick={() => setAddExperienceOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  )}
                </div>
                <div className="p-6">
                  {experiences.length > 0 ? (
                    <div className="space-y-6">
                      {experiences.map((experience) => (
                        <div key={experience.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {experience.company_name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{experience.job_title}</h3>
                            <p className="text-gray-600 font-medium">{experience.company_name}</p>
                            <p className="text-sm text-gray-500 mb-3">
                              {new Date(experience.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                              {experience.is_current ? 'Present' : experience.end_date ? new Date(experience.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                            </p>
                            {experience.description && (
                              <p className="text-gray-700 leading-relaxed">{experience.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 italic">
                        {isOwner 
                          ? "Add your work experience to showcase your professional journey."
                          : "No experience added yet."
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                  {isOwner && (
                    <button
                      onClick={() => setAddSkillOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  )}
                </div>
                <div className="p-6">
                  {skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all cursor-pointer border border-gray-200"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{skill.skill_name}</span>
                            <span className="text-sm text-blue-600 font-medium">
                              {skill.endorsement_count} endorsements
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 italic">
                        {isOwner 
                          ? "Add your skills to showcase your expertise."
                          : "No skills added yet."
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Certifications Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
                  {isOwner && (
                    <button
                      onClick={() => setAddCertificationOpen(true)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="p-6">
                  {certifications.length > 0 ? (
                    <div className="space-y-4">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="flex gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                            CERT
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{cert.certification_name}</h4>
                            <p className="text-xs text-gray-600">{cert.issuing_organization}</p>
                            {cert.issue_date && (
                              <p className="text-xs text-gray-500">
                                {new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                              </p>
                            )}
                            {cert.verification_url && (
                              <a
                                href={cert.verification_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Verify
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 italic text-sm">
                        {isOwner 
                          ? "Add certifications to demonstrate your credentials."
                          : "No certifications added yet."
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Files Section */}
              {isOwner && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Resume Files</h2>
                  </div>
                  <div className="p-6">
                    {resumeFiles.length > 0 ? (
                      <div className="space-y-3">
                        {resumeFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                PDF
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-gray-900 text-sm truncate">{file.file_name}</div>
                                <div className="text-xs text-gray-500">
                                  {file.file_size && (file.file_size / 1024 / 1024).toFixed(2)} MB
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
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="text-2xl text-gray-400 mb-2">📄</div>
                        <div className="text-sm font-medium text-gray-900 mb-1">Upload your resume</div>
                        <div className="text-xs text-gray-500 mb-3">PDF, DOC, DOCX (Max 10MB)</div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-all">
                          Choose File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
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
