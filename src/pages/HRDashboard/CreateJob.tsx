
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Loader2 } from "lucide-react";

const CreateJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary_range: "",
    location: "",
    job_type: "Full-time",
    application_deadline: ""
  });

  const handleChange = (field, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobData.title || !jobData.description) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Get the current user
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
      
      // Get the HR member information
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
      
      // Create the job
      const { data: newJob, error: jobError } = await supabase
        .from('jobs')
        .insert({
          title: jobData.title,
          description: jobData.description,
          requirements: jobData.requirements,
          salary_range: jobData.salary_range,
          location: jobData.location,
          job_type: jobData.job_type,
          application_deadline: jobData.application_deadline || null,
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="job_type">Job Type</Label>
                  <Select
                    value={jobData.job_type}
                    onValueChange={(value) => handleChange('job_type', value)}
                  >
                    <SelectTrigger id="job_type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter job requirements"
                  value={jobData.requirements}
                  onChange={(e) => handleChange('requirements', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. New York, Remote"
                    value={jobData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary_range">Salary Range</Label>
                  <Input
                    id="salary_range"
                    placeholder="e.g. $80,000 - $100,000"
                    value={jobData.salary_range}
                    onChange={(e) => handleChange('salary_range', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={jobData.application_deadline}
                  onChange={(e) => handleChange('application_deadline', e.target.value)}
                />
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
