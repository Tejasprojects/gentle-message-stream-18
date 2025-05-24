
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Loader2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CreateJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  
  const [jobData, setJobData] = useState({
    company_name: "",
    title: "",
    description: "",
    skills_required: [] as string[],
    experience_level: "",
    employment_type: "",
    work_location: "",
    department: "",
    job_category: "",
    salary_min: "",
    salary_max: "",
    currency: "USD",
    application_deadline: "",
    start_date: "",
    contact_email: "",
    contact_phone: "",
    benefits: "",
    requirements: "",
    education_requirements: "",
    location: "",
    job_type: "Full-time" as const
  });

  const handleChange = (field: string, value: any) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      setJobData(prev => ({ ...prev, skills_required: newSkills }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    setJobData(prev => ({ ...prev, skills_required: newSkills }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!jobData.company_name || !jobData.title || !jobData.description || 
        !jobData.experience_level || !jobData.employment_type || !jobData.work_location ||
        !jobData.department || !jobData.job_category || !jobData.application_deadline ||
        !jobData.contact_email || skills.length === 0) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields including at least one skill.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication error",
          description: "You must be logged in to create a job.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      const { data: hrMember, error: hrError } = await supabase
        .from('hr_members')
        .select('id, company_id')
        .eq('user_profile_id', user.id)
        .single();
      
      if (hrError || !hrMember) {
        console.error("Error fetching HR member:", hrError);
        toast({
          title: "Error",
          description: "Could not retrieve your profile information.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      const { data: newJob, error: jobError } = await supabase
        .from('jobs')
        .insert({
          company_name: jobData.company_name,
          title: jobData.title,
          description: jobData.description,
          skills_required: jobData.skills_required,
          experience_level: jobData.experience_level,
          employment_type: jobData.employment_type,
          work_location: jobData.work_location,
          department: jobData.department,
          job_category: jobData.job_category,
          salary_min: jobData.salary_min ? parseInt(jobData.salary_min) : null,
          salary_max: jobData.salary_max ? parseInt(jobData.salary_max) : null,
          currency: jobData.currency,
          application_deadline: jobData.application_deadline,
          start_date: jobData.start_date || null,
          contact_email: jobData.contact_email,
          contact_phone: jobData.contact_phone || null,
          benefits: jobData.benefits || null,
          requirements: jobData.requirements || null,
          education_requirements: jobData.education_requirements || null,
          location: jobData.work_location,
          job_type: jobData.employment_type as any,
          salary_range: jobData.salary_min && jobData.salary_max 
            ? `${jobData.currency} ${jobData.salary_min} - ${jobData.salary_max}` 
            : null,
          company_id: hrMember.company_id,
          assigned_hr_id: hrMember.id,
          status: 'Open'
        })
        .select()
        .single();
      
      if (jobError) {
        console.error("Error creating job:", jobError);
        toast({
          title: "Error",
          description: "Could not create the job posting.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Job created",
          description: "The job has been created successfully."
        });
        navigate(`/hr-dashboard/jobs/${newJob.id}`);
      }
    } catch (error) {
      console.error("Error in job creation:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Create New Job Posting</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter the details for the new job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="company_name"
                      placeholder="e.g. Tech Corp Inc."
                      value={jobData.company_name}
                      onChange={(e) => handleChange('company_name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
                    <Input
                      id="title"
                      placeholder="e.g. Senior Software Engineer"
                      value={jobData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Enter the job description"
                    value={jobData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills Required <span className="text-red-500">*</span></Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a skill and press Add"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Employment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Experience Level <span className="text-red-500">*</span></Label>
                    <Select value={jobData.experience_level} onValueChange={(value) => handleChange('experience_level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                        <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Employment Type <span className="text-red-500">*</span></Label>
                    <RadioGroup 
                      value={jobData.employment_type} 
                      onValueChange={(value) => handleChange('employment_type', value)}
                      className="flex flex-wrap gap-4"
                    >
                      {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <RadioGroupItem value={type} id={type} />
                          <Label htmlFor={type}>{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work_location">Work Location <span className="text-red-500">*</span></Label>
                    <Input
                      id="work_location"
                      placeholder="e.g. Remote, New York, Hybrid"
                      value={jobData.work_location}
                      onChange={(e) => handleChange('work_location', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                    <Select value={jobData.department} onValueChange={(value) => handleChange('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_category">Job Category <span className="text-red-500">*</span></Label>
                  <Select value={jobData.job_category} onValueChange={(value) => handleChange('job_category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software Development">Software Development</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Product Management">Product Management</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                      <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="Project Management">Project Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Compensation & Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Compensation & Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary_min">Minimum Salary</Label>
                    <Input
                      id="salary_min"
                      type="number"
                      placeholder="50000"
                      value={jobData.salary_min}
                      onChange={(e) => handleChange('salary_min', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary_max">Maximum Salary</Label>
                    <Input
                      id="salary_max"
                      type="number"
                      placeholder="80000"
                      value={jobData.salary_max}
                      onChange={(e) => handleChange('salary_max', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={jobData.currency} onValueChange={(value) => handleChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="application_deadline">Application Deadline <span className="text-red-500">*</span></Label>
                    <Input
                      id="application_deadline"
                      type="date"
                      value={jobData.application_deadline}
                      onChange={(e) => handleChange('application_deadline', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Expected Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={jobData.start_date}
                      onChange={(e) => handleChange('start_date', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Additional Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact & Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="contact_email"
                      type="email"
                      placeholder="hr@company.com"
                      value={jobData.contact_email}
                      onChange={(e) => handleChange('contact_email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      placeholder="+1 (555) 123-4567"
                      value={jobData.contact_phone}
                      onChange={(e) => handleChange('contact_phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Health insurance, 401k, flexible hours..."
                    value={jobData.benefits}
                    onChange={(e) => handleChange('benefits', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education_requirements">Education & Certification Requirements</Label>
                  <Textarea
                    id="education_requirements"
                    placeholder="Bachelor's degree in Computer Science or equivalent..."
                    value={jobData.education_requirements}
                    onChange={(e) => handleChange('education_requirements', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate('/hr-dashboard/jobs')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Job
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateJob;
