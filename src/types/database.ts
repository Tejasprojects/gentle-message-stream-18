
export interface JobApplication {
  id: string;
  user_id: string;
  job_title: string;
  company: string;
  location: string | null;
  status: string;
  date_applied: string;
  next_step: string | null;
  progress: number;
  feedback: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAnalytics {
  id: string;
  user_id: string;
  applications_count: number;
  interviews_count: number;
  response_rate: number;
  offers_count: number;
  updated_at: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string | null;
  salary_range: string | null;
  requirements: string | null;
  job_type: string | null;
  posted_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
