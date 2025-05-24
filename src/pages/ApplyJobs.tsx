
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Briefcase, Building, FileText, MapPin, Search, DollarSign, Calendar, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useJobListings } from "@/hooks/useJobListings";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";

const ApplyJobs = () => {
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [resumeOption, setResumeOption] = useState("");
  const { jobListings, loading, refetch } = useJobListings();
  const { user } = useAuth();
  
  // Filter jobs based on search criteria
  const filteredJobs = jobListings.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(jobTitle.toLowerCase());
    const locationMatch = !location || (job.location && job.location.toLowerCase().includes(location.toLowerCase()));
    return titleMatch && locationMatch;
  });

  // Sample resume options - in a real app, these would come from the database
  const resumes = [
    { id: "resume-1", name: "Software_Engineer_Resume.pdf", lastUpdated: "2025-05-01" },
    { id: "resume-2", name: "John_Doe_Tech_Resume.pdf", lastUpdated: "2025-04-15" }
  ];

  const handleSearch = () => {
    toast({
      title: "Search initiated",
      description: `Searching for "${jobTitle}" jobs in "${location || 'all locations'}"`,
    });
    refetch();
  };

  const handleApply = async (jobId: string) => {
    if (!resumeOption) {
      toast({
        title: "Resume required",
        description: "Please select a resume to apply",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to apply for jobs",
        variant: "destructive"
      });
      return;
    }

    try {
      // Find the job from the list
      const job = jobListings.find(j => j.id === jobId);
      
      if (!job) {
        toast({
          title: "Error",
          description: "Job not found",
          variant: "destructive"
        });
        return;
      }
      
      // Insert application into database
      const { data, error } = await supabase
        .from('job_applications')
        .insert([
          {
            user_id: user.id,
            job_title: job.title,
            company: job.company_name || 'Unknown Company',
            location: job.location,
            status: 'Applied',
            progress: 20,
          }
        ]);
        
      if (error) {
        console.error("Error submitting application:", error);
        toast({
          title: "Application failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Application submitted",
        description: `Your application for ${job.title} at ${job.company_name || 'Unknown Company'} has been submitted`,
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Application failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Apply for Jobs</h1>
            <p className="text-muted-foreground">Find and apply for your next career opportunity</p>
          </div>
        </div>
        
        {/* Job Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Your Next Opportunity</CardTitle>
            <CardDescription>Search for jobs that match your skills and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Job title, skills, or keywords"
                    className="pl-10"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="City, state, or remote"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSearch}>Search Jobs</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Job Listings */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Jobs ({filteredJobs.length})</h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredJobs.filter(job => job.status === 'Open').length} Open Positions
              </Badge>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading jobs...</span>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" /> 
                          {job.company_name || 'Company'}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className="bg-blue-50 text-blue-700">
                          {job.experience_level || 'All Levels'}
                        </Badge>
                        <Badge variant="outline">
                          {job.employment_type || 'Full-time'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {job.location && (
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {job.location}
                          </div>
                        )}
                        {job.salary_range && (
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            {job.salary_range}
                          </div>
                        )}
                        {job.department && (
                          <div className="flex items-center text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2" />
                            {job.department}
                          </div>
                        )}
                        {job.application_deadline && (
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            Apply by {new Date(job.application_deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
                      
                      {job.skills_required && job.skills_required.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {job.skills_required.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills_required.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.skills_required.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="pt-3 border-t">
                        <Label htmlFor={`resume-${job.id}`}>Select Resume to Apply</Label>
                        <Select onValueChange={setResumeOption}>
                          <SelectTrigger id={`resume-${job.id}`} className="mt-1">
                            <SelectValue placeholder="Choose a resume" />
                          </SelectTrigger>
                          <SelectContent>
                            {resumes.map(resume => (
                              <SelectItem key={resume.id} value={resume.id}>
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2" />
                                  {resume.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted {job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'Recently'}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="text-blue-600">
                        View Details
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  {jobTitle || location ? 
                    "No jobs match your search criteria. Try adjusting your filters." :
                    "No job openings are currently available. Check back later for new opportunities."
                  }
                </p>
                {(jobTitle || location) && (
                  <Button variant="outline" onClick={() => {
                    setJobTitle("");
                    setLocation("");
                    refetch();
                  }}>
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default ApplyJobs;
