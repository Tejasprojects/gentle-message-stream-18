
export interface UserProfile {
  id: string;
  user_id: string;
  cover_photo_url?: string;
  profile_photo_url?: string;
  professional_headline?: string;
  location?: string;
  website_url?: string;
  about_summary?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  user_id: string;
  platform: string;
  url: string;
  created_at: string;
}

export interface Experience {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  company_logo_url?: string;
  employment_type?: string;
  location?: string;
  is_remote: boolean;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  skills_used?: string[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  user_id: string;
  institution_name: string;
  institution_logo_url?: string;
  degree: string;
  field_of_study?: string;
  gpa?: number;
  start_date?: string;
  end_date?: string;
  description?: string;
  created_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  skill_name: string;
  category?: string;
  proficiency_level?: number;
  endorsement_count: number;
  created_at: string;
}

export interface Certification {
  id: string;
  user_id: string;
  certification_name: string;
  issuing_organization: string;
  certificate_url?: string;
  certificate_file_path?: string;
  issue_date?: string;
  expiration_date?: string;
  credential_id?: string;
  verification_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  project_name: string;
  description?: string;
  thumbnail_url?: string;
  technologies_used?: string[];
  start_date?: string;
  end_date?: string;
  team_size?: number;
  project_url?: string;
  repository_url?: string;
  created_at: string;
}

export interface ResumeFile {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size?: number;
  is_primary: boolean;
  created_at: string;
}
