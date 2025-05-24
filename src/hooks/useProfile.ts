
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { 
  UserProfile, 
  SocialLink, 
  Experience, 
  Education, 
  Skill, 
  Certification, 
  Project, 
  ResumeFile 
} from '@/types/profile';

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resumeFiles, setResumeFiles] = useState<ResumeFile[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  const targetUserId = userId || user?.id;

  const fetchProfile = async () => {
    if (!targetUserId) return;
    
    try {
      setLoading(true);

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', targetUserId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      // Fetch social links
      const { data: socialData } = await supabase
        .from('social_links')
        .select('*')
        .eq('user_id', targetUserId);

      // Fetch experiences
      const { data: experienceData } = await supabase
        .from('experiences')
        .select('*')
        .eq('user_id', targetUserId)
        .order('start_date', { ascending: false });

      // Fetch skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', targetUserId);

      // Fetch certifications
      const { data: certificationsData } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', targetUserId)
        .order('issue_date', { ascending: false });

      // Fetch projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', targetUserId)
        .order('start_date', { ascending: false });

      // Fetch resume files (only for own profile)
      if (targetUserId === user?.id) {
        const { data: resumeData } = await supabase
          .from('resume_files')
          .select('*')
          .eq('user_id', targetUserId)
          .order('created_at', { ascending: false });
        
        setResumeFiles(resumeData || []);
      }

      setProfile(profileData);
      setSocialLinks(socialData || []);
      setExperiences(experienceData || []);
      setSkills(skillsData || []);
      setCertifications(certificationsData || []);
      setProjects(projectsData || []);

    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error fetching profile',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      await fetchProfile();
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [targetUserId]);

  return {
    profile,
    socialLinks,
    experiences,
    education,
    skills,
    certifications,
    projects,
    resumeFiles,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
};
