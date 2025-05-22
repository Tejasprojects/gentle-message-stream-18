export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_type: string
          description: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          timestamp: string
          user_profile_id: string | null
        }
        Insert: {
          activity_type: string
          description?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          timestamp?: string
          user_profile_id?: string | null
        }
        Update: {
          activity_type?: string
          description?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          timestamp?: string
          user_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agents: {
        Row: {
          accuracy_rate: number | null
          agent_name: string
          agent_type: Database["public"]["Enums"]["ai_agent_type_option"] | null
          configuration: Json | null
          created_at: string
          id: string
          last_activity: string | null
          status: Database["public"]["Enums"]["ai_agent_status_option"] | null
          tasks_completed: number | null
          updated_at: string
        }
        Insert: {
          accuracy_rate?: number | null
          agent_name: string
          agent_type?:
            | Database["public"]["Enums"]["ai_agent_type_option"]
            | null
          configuration?: Json | null
          created_at?: string
          id?: string
          last_activity?: string | null
          status?: Database["public"]["Enums"]["ai_agent_status_option"] | null
          tasks_completed?: number | null
          updated_at?: string
        }
        Update: {
          accuracy_rate?: number | null
          agent_name?: string
          agent_type?:
            | Database["public"]["Enums"]["ai_agent_type_option"]
            | null
          configuration?: Json | null
          created_at?: string
          id?: string
          last_activity?: string | null
          status?: Database["public"]["Enums"]["ai_agent_status_option"] | null
          tasks_completed?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      analytics_metrics: {
        Row: {
          category: string | null
          company_id: string | null
          created_at: string
          date_recorded: string
          id: string
          metric_name: string
          metric_value: string | null
        }
        Insert: {
          category?: string | null
          company_id?: string | null
          created_at?: string
          date_recorded: string
          id?: string
          metric_name: string
          metric_value?: string | null
        }
        Update: {
          category?: string | null
          company_id?: string | null
          created_at?: string
          date_recorded?: string
          id?: string
          metric_name?: string
          metric_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_metrics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          ai_score: number | null
          application_date: string | null
          candidate_id: string
          created_at: string
          hr_member_id: string | null
          id: string
          job_id: string
          notes: string | null
          pipeline_stage:
            | Database["public"]["Enums"]["candidate_pipeline_status_type"]
            | null
          status: Database["public"]["Enums"]["application_status_type"] | null
          updated_at: string
        }
        Insert: {
          ai_score?: number | null
          application_date?: string | null
          candidate_id: string
          created_at?: string
          hr_member_id?: string | null
          id?: string
          job_id: string
          notes?: string | null
          pipeline_stage?:
            | Database["public"]["Enums"]["candidate_pipeline_status_type"]
            | null
          status?: Database["public"]["Enums"]["application_status_type"] | null
          updated_at?: string
        }
        Update: {
          ai_score?: number | null
          application_date?: string | null
          candidate_id?: string
          created_at?: string
          hr_member_id?: string | null
          id?: string
          job_id?: string
          notes?: string | null
          pipeline_stage?:
            | Database["public"]["Enums"]["candidate_pipeline_status_type"]
            | null
          status?: Database["public"]["Enums"]["application_status_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_hr_member_id_fkey"
            columns: ["hr_member_id"]
            isOneToOne: false
            referencedRelation: "hr_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          application_id: string | null
          assessment_type:
            | Database["public"]["Enums"]["assessment_type_option"]
            | null
          candidate_id: string
          completion_date: string | null
          created_at: string
          id: string
          job_id: string | null
          results: Json | null
          score: number | null
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          assessment_type?:
            | Database["public"]["Enums"]["assessment_type_option"]
            | null
          candidate_id: string
          completion_date?: string | null
          created_at?: string
          id?: string
          job_id?: string | null
          results?: Json | null
          score?: number | null
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          assessment_type?:
            | Database["public"]["Enums"]["assessment_type_option"]
            | null
          candidate_id?: string
          completion_date?: string | null
          created_at?: string
          id?: string
          job_id?: string | null
          results?: Json | null
          score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string
          current_status:
            | Database["public"]["Enums"]["candidate_pipeline_status_type"]
            | null
          email: string
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          overall_score: number | null
          phone: string | null
          profile_photo_url: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string
          user_profile_id: string | null
        }
        Insert: {
          created_at?: string
          current_status?:
            | Database["public"]["Enums"]["candidate_pipeline_status_type"]
            | null
          email: string
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          overall_score?: number | null
          phone?: string | null
          profile_photo_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_profile_id?: string | null
        }
        Update: {
          created_at?: string
          current_status?:
            | Database["public"]["Enums"]["candidate_pipeline_status_type"]
            | null
          email?: string
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          overall_score?: number | null
          phone?: string | null
          profile_photo_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          company_size: string | null
          created_at: string
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          company_size?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          company_size?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      hr_members: {
        Row: {
          bio: string | null
          company_id: string
          created_at: string
          department: string | null
          email: string
          first_name: string
          hire_date: string | null
          id: string
          last_name: string
          performance_score: number | null
          phone: string | null
          profile_photo_url: string | null
          role: Database["public"]["Enums"]["hr_member_role_option"] | null
          settings: Json | null
          specializations: string[] | null
          status: Database["public"]["Enums"]["hr_member_status_option"] | null
          updated_at: string
          user_profile_id: string | null
        }
        Insert: {
          bio?: string | null
          company_id: string
          created_at?: string
          department?: string | null
          email: string
          first_name: string
          hire_date?: string | null
          id?: string
          last_name: string
          performance_score?: number | null
          phone?: string | null
          profile_photo_url?: string | null
          role?: Database["public"]["Enums"]["hr_member_role_option"] | null
          settings?: Json | null
          specializations?: string[] | null
          status?: Database["public"]["Enums"]["hr_member_status_option"] | null
          updated_at?: string
          user_profile_id?: string | null
        }
        Update: {
          bio?: string | null
          company_id?: string
          created_at?: string
          department?: string | null
          email?: string
          first_name?: string
          hire_date?: string | null
          id?: string
          last_name?: string
          performance_score?: number | null
          phone?: string | null
          profile_photo_url?: string | null
          role?: Database["public"]["Enums"]["hr_member_role_option"] | null
          settings?: Json | null
          specializations?: string[] | null
          status?: Database["public"]["Enums"]["hr_member_status_option"] | null
          updated_at?: string
          user_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_members_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string
          created_at: string
          duration_minutes: number | null
          feedback: string | null
          id: string
          interview_type:
            | Database["public"]["Enums"]["interview_type_option"]
            | null
          interviewer_id: string | null
          scheduled_date: string
          score: number | null
          status: Database["public"]["Enums"]["interview_status_type"] | null
          updated_at: string
          video_link: string | null
        }
        Insert: {
          application_id: string
          created_at?: string
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          interview_type?:
            | Database["public"]["Enums"]["interview_type_option"]
            | null
          interviewer_id?: string | null
          scheduled_date: string
          score?: number | null
          status?: Database["public"]["Enums"]["interview_status_type"] | null
          updated_at?: string
          video_link?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          interview_type?:
            | Database["public"]["Enums"]["interview_type_option"]
            | null
          interviewer_id?: string | null
          scheduled_date?: string
          score?: number | null
          status?: Database["public"]["Enums"]["interview_status_type"] | null
          updated_at?: string
          video_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_interviewer_id_fkey"
            columns: ["interviewer_id"]
            isOneToOne: false
            referencedRelation: "hr_members"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          company: string
          created_at: string
          date_applied: string
          feedback: string | null
          id: string
          job_title: string
          location: string | null
          next_step: string | null
          progress: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          date_applied?: string
          feedback?: string | null
          id?: string
          job_title: string
          location?: string | null
          next_step?: string | null
          progress?: number | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          date_applied?: string
          feedback?: string | null
          id?: string
          job_title?: string
          location?: string | null
          next_step?: string | null
          progress?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          company: string
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          job_type: string | null
          location: string | null
          posted_date: string
          requirements: string | null
          salary_range: string | null
          title: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_date?: string
          requirements?: string | null
          salary_range?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_date?: string
          requirements?: string | null
          salary_range?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_deadline: string | null
          assigned_hr_id: string | null
          company_id: string
          created_at: string
          description: string
          id: string
          job_type: Database["public"]["Enums"]["job_type_option"] | null
          location: string | null
          posted_date: string | null
          requirements: string | null
          salary_range: string | null
          status: Database["public"]["Enums"]["job_status_type"] | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          assigned_hr_id?: string | null
          company_id: string
          created_at?: string
          description: string
          id?: string
          job_type?: Database["public"]["Enums"]["job_type_option"] | null
          location?: string | null
          posted_date?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["job_status_type"] | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          assigned_hr_id?: string | null
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          job_type?: Database["public"]["Enums"]["job_type_option"] | null
          location?: string | null
          posted_date?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["job_status_type"] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_assigned_hr_id_fkey"
            columns: ["assigned_hr_id"]
            isOneToOne: false
            referencedRelation: "hr_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          github_url: string | null
          id: string
          industry: string | null
          linkedin_url: string | null
          location: string | null
          occupation: string | null
          password_hash: string | null
          phone_number: string | null
          profile_picture: string | null
          role: string | null
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          github_url?: string | null
          id: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          occupation?: string | null
          password_hash?: string | null
          phone_number?: string | null
          profile_picture?: string | null
          role?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          github_url?: string | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          occupation?: string | null
          password_hash?: string | null
          phone_number?: string | null
          profile_picture?: string | null
          role?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          filename: string
          id: string
          is_primary: boolean | null
          parsed_content: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          filename: string
          id?: string
          is_primary?: boolean | null
          parsed_content?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          filename?: string
          id?: string
          is_primary?: boolean | null
          parsed_content?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          applications_count: number | null
          id: string
          interviews_count: number | null
          offers_count: number | null
          response_rate: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applications_count?: number | null
          id?: string
          interviews_count?: number | null
          offers_count?: number | null
          response_rate?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applications_count?: number | null
          id?: string
          interviews_count?: number | null
          offers_count?: number | null
          response_rate?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ai_agent_status_option:
        | "Active"
        | "Inactive"
        | "Training"
        | "Error"
        | "Maintenance"
      ai_agent_type_option:
        | "ResumeScreener"
        | "InterviewScheduler"
        | "FeedbackAnalyzer"
        | "CandidateSourcer"
      application_status_type:
        | "Received"
        | "Under Review"
        | "Shortlisted"
        | "Rejected"
        | "Interview Scheduled"
        | "Assessment Sent"
        | "Offer Extended"
        | "Hired"
        | "Withdrawn"
      assessment_type_option:
        | "Coding"
        | "Aptitude"
        | "Psychometric"
        | "Skills Test"
        | "Language Proficiency"
      candidate_pipeline_status_type:
        | "Applied"
        | "Screening"
        | "Assessment"
        | "Interviewing"
        | "Offer Extended"
        | "Offer Accepted"
        | "Offer Rejected"
        | "Hired"
        | "Rejected"
        | "On Hold"
        | "Withdrawn"
      hr_member_role_option:
        | "Recruiter"
        | "Sourcer"
        | "Coordinator"
        | "HR Manager"
        | "Hiring Manager"
        | "Admin"
      hr_member_status_option: "Active" | "Inactive" | "On Leave"
      interview_status_type:
        | "Scheduled"
        | "Completed"
        | "Cancelled"
        | "Rescheduled"
        | "No Show"
      interview_type_option:
        | "Technical"
        | "Behavioral"
        | "HR Round"
        | "Panel"
        | "Screening Call"
      job_status_type: "Open" | "Closed" | "Draft" | "Filled" | "On Hold"
      job_type_option:
        | "Full-time"
        | "Part-time"
        | "Contract"
        | "Internship"
        | "Temporary"
      user_role: "student" | "organization" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_agent_status_option: [
        "Active",
        "Inactive",
        "Training",
        "Error",
        "Maintenance",
      ],
      ai_agent_type_option: [
        "ResumeScreener",
        "InterviewScheduler",
        "FeedbackAnalyzer",
        "CandidateSourcer",
      ],
      application_status_type: [
        "Received",
        "Under Review",
        "Shortlisted",
        "Rejected",
        "Interview Scheduled",
        "Assessment Sent",
        "Offer Extended",
        "Hired",
        "Withdrawn",
      ],
      assessment_type_option: [
        "Coding",
        "Aptitude",
        "Psychometric",
        "Skills Test",
        "Language Proficiency",
      ],
      candidate_pipeline_status_type: [
        "Applied",
        "Screening",
        "Assessment",
        "Interviewing",
        "Offer Extended",
        "Offer Accepted",
        "Offer Rejected",
        "Hired",
        "Rejected",
        "On Hold",
        "Withdrawn",
      ],
      hr_member_role_option: [
        "Recruiter",
        "Sourcer",
        "Coordinator",
        "HR Manager",
        "Hiring Manager",
        "Admin",
      ],
      hr_member_status_option: ["Active", "Inactive", "On Leave"],
      interview_status_type: [
        "Scheduled",
        "Completed",
        "Cancelled",
        "Rescheduled",
        "No Show",
      ],
      interview_type_option: [
        "Technical",
        "Behavioral",
        "HR Round",
        "Panel",
        "Screening Call",
      ],
      job_status_type: ["Open", "Closed", "Draft", "Filled", "On Hold"],
      job_type_option: [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Temporary",
      ],
      user_role: ["student", "organization", "admin"],
    },
  },
} as const
