
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, Briefcase, Building, FileText, MapPin, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useJobListings } from "@/hooks/useJobListings";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
    // In a real app, this would trigger a more sophisticated search
  };

  const handleApply = async (jobId) => {
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
            company: job.company,
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
        description: `Your application for ${job.title} at ${job.company} has been submitted`,
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
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Apply for Jobs</h1>
      
      {/* Job Search Section */}
      <Card className="mb-8">
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
      <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading jobs...</span>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Building className="h-4 w-4 mr-1" /> {job.company}
                    </CardDescription>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                    Match
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {job.location && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                  )}
                  {job.salary_range && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.salary_range}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                  
                  <div className="pt-3">
                    <Label htmlFor={`resume-${job.id}`}>Select Resume</Label>
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
                  Posted {new Date(job.posted_date).toLocaleDateString()}
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
        <div className="text-center py-12 text-gray-500">
          No jobs found matching your criteria. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

export default ApplyJobs;
