
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Briefcase, Building, MapPin, Search, DollarSign, Calendar, Clock, Filter, Users, TrendingUp, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useJobListings } from "@/hooks/useJobListings";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";
import ResumeDropzone from "@/components/ui/ResumeDropzone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApplyJobs = () => {
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedResumes, setSelectedResumes] = useState<Record<string, { path: string; name: string }>>({});
  const [activeCategory, setActiveCategory] = useState("all");
  const { jobListings, loading, refetch } = useJobListings();
  const { user } = useAuth();
  
  // Filter jobs based on search criteria
  const filteredJobs = jobListings.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(jobTitle.toLowerCase());
    const locationMatch = !location || (job.location && job.location.toLowerCase().includes(location.toLowerCase()));
    return titleMatch && locationMatch;
  });

  // Categorize jobs
  const categorizeJobs = (jobs: any[]) => {
    const categories = {
      all: jobs,
      technology: jobs.filter(job => 
        job.title.toLowerCase().includes('developer') || 
        job.title.toLowerCase().includes('engineer') || 
        job.title.toLowerCase().includes('programmer') ||
        job.department?.toLowerCase().includes('tech') ||
        job.department?.toLowerCase().includes('engineering')
      ),
      design: jobs.filter(job => 
        job.title.toLowerCase().includes('designer') || 
        job.title.toLowerCase().includes('ui') || 
        job.title.toLowerCase().includes('ux') ||
        job.department?.toLowerCase().includes('design')
      ),
      marketing: jobs.filter(job => 
        job.title.toLowerCase().includes('marketing') || 
        job.title.toLowerCase().includes('growth') || 
        job.title.toLowerCase().includes('content') ||
        job.department?.toLowerCase().includes('marketing')
      ),
      sales: jobs.filter(job => 
        job.title.toLowerCase().includes('sales') || 
        job.title.toLowerCase().includes('business development') ||
        job.department?.toLowerCase().includes('sales')
      ),
      hr: jobs.filter(job => 
        job.title.toLowerCase().includes('hr') || 
        job.title.toLowerCase().includes('human resources') || 
        job.title.toLowerCase().includes('recruiter') ||
        job.department?.toLowerCase().includes('hr')
      ),
      finance: jobs.filter(job => 
        job.title.toLowerCase().includes('finance') || 
        job.title.toLowerCase().includes('accounting') || 
        job.title.toLowerCase().includes('analyst') ||
        job.department?.toLowerCase().includes('finance')
      )
    };
    return categories;
  };

  const categorizedJobs = categorizeJobs(filteredJobs);
  const currentJobs = categorizedJobs[activeCategory as keyof typeof categorizedJobs] || [];

  const categories = [
    { id: "all", name: "All Jobs", icon: Briefcase, count: categorizedJobs.all.length },
    { id: "technology", name: "Technology", icon: Users, count: categorizedJobs.technology.length },
    { id: "design", name: "Design", icon: Star, count: categorizedJobs.design.length },
    { id: "marketing", name: "Marketing", icon: TrendingUp, count: categorizedJobs.marketing.length },
    { id: "sales", name: "Sales", icon: ArrowUpRight, count: categorizedJobs.sales.length },
    { id: "hr", name: "HR", icon: Users, count: categorizedJobs.hr.length },
    { id: "finance", name: "Finance", icon: DollarSign, count: categorizedJobs.finance.length }
  ];

  const handleSearch = () => {
    toast({
      title: "Search initiated",
      description: `Searching for "${jobTitle}" jobs in "${location || 'all locations'}"`,
    });
    refetch();
  };

  const handleResumeUpload = (jobId: string, filePath: string, fileName: string) => {
    if (filePath && fileName) {
      setSelectedResumes(prev => ({
        ...prev,
        [jobId]: { path: filePath, name: fileName }
      }));
    } else {
      setSelectedResumes(prev => {
        const updated = { ...prev };
        delete updated[jobId];
        return updated;
      });
    }
  };

  const handleApply = async (jobId: string) => {
    const selectedResume = selectedResumes[jobId];
    
    if (!selectedResume) {
      toast({
        title: "Resume required",
        description: "Please upload a resume to apply",
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
      const job = jobListings.find(j => j.id === jobId);
      
      if (!job) {
        toast({
          title: "Error",
          description: "Job not found",
          variant: "destructive"
        });
        return;
      }
      
      // Insert application into database with resume information
      const { data: applicationData, error: applicationError } = await supabase
        .from('job_applications')
        .insert([
          {
            user_id: user.id,
            job_id: jobId,
            job_title: job.title,
            company: job.company_name || 'Unknown Company',
            location: job.location,
            status: 'Applied',
            progress: 20,
            resume_file_path: selectedResume.path,
            resume_file_name: selectedResume.name,
            application_status: 'pending'
          }
        ])
        .select()
        .single();
        
      if (applicationError) {
        console.error("Error submitting application:", applicationError);
        toast({
          title: "Application failed",
          description: applicationError.message,
          variant: "destructive"
        });
        return;
      }

      // Create notification for HR members
      const { data: hrMembers } = await supabase
        .from('hr_members')
        .select('user_profile_id')
        .eq('company_id', job.company_id);

      if (hrMembers && hrMembers.length > 0) {
        const notifications = hrMembers.map(hr => ({
          user_id: hr.user_profile_id,
          title: 'New Job Application',
          message: `New application received for ${job.title} position`,
          type: 'info' as const,
          related_application_id: applicationData.id
        }));

        await supabase
          .from('notifications')
          .insert(notifications);
      }
      
      toast({
        title: "Application submitted",
        description: `Your application for ${job.title} at ${job.company_name || 'Unknown Company'} has been submitted`,
      });

      // Remove the selected resume for this job after successful application
      setSelectedResumes(prev => {
        const updated = { ...prev };
        delete updated[jobId];
        return updated;
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Discover amazing opportunities and take the next step in your career journey
              </p>
              
              {/* Search Bar */}
              <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Job title, skills, or keywords"
                      className="pl-12 h-14 border-0 text-lg bg-gray-50 rounded-xl"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="City, state, or remote"
                      className="pl-12 h-14 border-0 text-lg bg-gray-50 rounded-xl"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold rounded-xl"
                  >
                    Search Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center hover:shadow-lg ${
                      activeCategory === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium text-sm">{category.name}</p>
                    <Badge 
                      variant={activeCategory === category.id ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {category.count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {categories.find(c => c.id === activeCategory)?.name} ({currentJobs.length})
              </h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {currentJobs.filter(job => job.status === 'Open').length} Open Positions
                </Badge>
              </div>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
                  <span className="text-lg text-gray-600">Loading amazing opportunities...</span>
                </div>
              </div>
            ) : currentJobs.length > 0 ? (
              <div className="grid gap-6">
                {currentJobs.map((job) => (
                  <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-2 text-lg">
                            <Building className="h-5 w-5 mr-2 text-blue-500" /> 
                            <span className="font-medium text-gray-700">{job.company_name || 'Company'}</span>
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {job.experience_level || 'All Levels'}
                          </Badge>
                          <Badge variant="outline" className="border-blue-200 text-blue-700">
                            {job.employment_type || 'Full-time'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Job Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {job.location && (
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                              <MapPin className="h-5 w-5 mr-3 text-blue-500" />
                              <span className="font-medium">{job.location}</span>
                            </div>
                          )}
                          {job.salary_range && (
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                              <DollarSign className="h-5 w-5 mr-3 text-green-500" />
                              <span className="font-medium">{job.salary_range}</span>
                            </div>
                          )}
                          {job.department && (
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                              <Briefcase className="h-5 w-5 mr-3 text-purple-500" />
                              <span className="font-medium">{job.department}</span>
                            </div>
                          )}
                          {job.application_deadline && (
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                              <Calendar className="h-5 w-5 mr-3 text-red-500" />
                              <span className="font-medium">Due {new Date(job.application_deadline).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Job Description */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                          <p className="text-gray-700 leading-relaxed">{job.description}</p>
                        </div>
                        
                        {/* Skills */}
                        {job.skills_required && job.skills_required.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.skills_required.slice(0, 6).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills_required.length > 6 && (
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                  +{job.skills_required.length - 6} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Resume Upload Section */}
                        <div className="bg-white border-2 border-dashed border-blue-200 rounded-xl p-6">
                          <Label htmlFor={`resume-${job.id}`} className="text-lg font-semibold text-gray-900 mb-3 block">
                            Upload Your Resume
                          </Label>
                          <ResumeDropzone
                            onFileUploaded={(filePath, fileName) => handleResumeUpload(job.id, filePath, fileName)}
                            selectedFile={selectedResumes[job.id] || null}
                          />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between items-center border-t bg-gray-50 px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        Posted {job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'Recently'}
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          View Details
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => handleApply(job.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-16 border-0 shadow-lg bg-white rounded-2xl">
                <CardContent>
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="h-12 w-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {jobTitle || location ? 
                      "No jobs match your search criteria. Try adjusting your filters or explore other categories." :
                      "No job openings are currently available in this category. Check back later for new opportunities."
                    }
                  </p>
                  {(jobTitle || location) && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setJobTitle("");
                        setLocation("");
                        setActiveCategory("all");
                        refetch();
                      }}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Clear Filters & View All Jobs
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default ApplyJobs;
