
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, Briefcase, Building, FileText, MapPin, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ApplyJobs = () => {
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [resumeOption, setResumeOption] = useState("");
  
  // Sample job data - in a real app, this would come from an API
  const recommendedJobs = [
    {
      id: "job-1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA (Remote)",
      description: "We're looking for a Senior Frontend Developer with React expertise to join our growing team...",
      postedDate: "2 days ago",
      salary: "$120K - $150K",
      match: 95
    },
    {
      id: "job-2",
      title: "Full Stack Engineer",
      company: "InnovateTech",
      location: "New York, NY (Hybrid)",
      description: "Join our engineering team to build scalable web applications using modern technologies...",
      postedDate: "1 week ago",
      salary: "$110K - $135K",
      match: 87
    },
    {
      id: "job-3",
      title: "React Developer",
      company: "SoftSolutions",
      location: "Austin, TX (Remote)",
      description: "Looking for a React Developer to create responsive user interfaces and implement new features...",
      postedDate: "3 days ago",
      salary: "$90K - $120K",
      match: 82
    }
  ];

  // Mock resume options
  const resumes = [
    { id: "resume-1", name: "Software_Engineer_Resume.pdf", lastUpdated: "2025-05-01" },
    { id: "resume-2", name: "John_Doe_Tech_Resume.pdf", lastUpdated: "2025-04-15" }
  ];

  const handleSearch = () => {
    // In a real app, this would trigger a search API call
    toast({
      title: "Search initiated",
      description: `Searching for "${jobTitle}" jobs in "${location || 'all locations'}"`,
    });
  };

  const handleApply = (jobId) => {
    // In a real app, this would submit an application
    if (!resumeOption) {
      toast({
        title: "Resume required",
        description: "Please select a resume to apply",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Application submitted",
      description: `Your application has been submitted for job #${jobId}`,
    });
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
      
      {/* Recommended Jobs */}
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="space-y-6">
        {recommendedJobs.map((job) => (
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
                  {job.match}% Match
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
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
              <div className="text-sm text-gray-500">Posted {job.postedDate}</div>
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
    </div>
  );
};

export default ApplyJobs;
