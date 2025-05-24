import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  Search,
  ArrowUpRight,
  Filter,
  AlertCircle,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  ToggleRight,
  Star,
  Bookmark,
  TrendingUp,
  Zap,
  Award,
  Globe,
  DollarSign
} from "lucide-react";
import { fetchJobs } from "@/utils/jobBoardApi";
import JobSearchFilters from "@/components/jobs/JobSearchFilters";
import { JobListing, JobFilter } from "@/types/job";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { recommendedJobs } from "@/data/recommendedJobs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const JobBoard = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("software developer");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showRecommended, setShowRecommended] = useState(false);
  const [activeFilters, setActiveFilters] = useState<JobFilter>({});

  useEffect(() => {
    if (showRecommended) {
      setJobs(recommendedJobs);
      setLoading(false);
      setError(null);
    } else {
      loadJobs();
    }
  }, [currentPage, showRecommended]);

  const loadJobs = async () => {
    if (showRecommended) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const query = searchTerm || "software developer";
      const jobData = await fetchJobs({
        query: query,
        location: location,
        page: currentPage,
        remote: activeFilters.remote,
        employment_type: activeFilters.employmentType,
      });
      
      if (jobData && jobData.length > 0) {
        setJobs(jobData);
      } else {
        setJobs([]);
        toast({
          title: "No jobs found",
          description: "Try adjusting your search criteria for better results.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setError("Failed to load jobs. Our servers might be busy, please try again in a moment.");
      toast({
        title: "Error loading jobs",
        description: "There was a problem loading job listings. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!showRecommended) {
      setCurrentPage(1);
      loadJobs();
    }
  };

  const handleFilterChange = (filters: JobFilter) => {
    console.log("Filter changed:", filters);
    setActiveFilters(filters);
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    loadJobs();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) return "Today";
      if (diffDays <= 2) return "Yesterday";
      if (diffDays <= 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch (e) {
      return "Recently";
    }
  };

  const toggleRecommendedJobs = () => {
    setShowRecommended(prev => !prev);
  };

  return (
    <StudentDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Premium Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <Card className="relative mx-6 mb-8 border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <CardContent className="relative p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight mb-2">Premium Job Board</h1>
                      <p className="text-blue-100 text-lg">
                        Discover your next career opportunity with AI-powered matching
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>5,000+ Active Jobs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Premium Companies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-xs text-blue-100">Match Rate</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                      <div className="text-2xl font-bold">2.5M</div>
                      <div className="text-xs text-blue-100">Applications</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                      <div className="text-2xl font-bold">10k+</div>
                      <div className="text-xs text-blue-100">Companies</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Premium Search Section */}
        <Card className="mx-6 mb-8 border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Dream Job</h2>
                <p className="text-gray-600">Search through thousands of premium opportunities</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        className="pl-12 h-14 text-lg border-0 bg-gray-50/50 focus:bg-white transition-all duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        disabled={showRecommended}
                      />
                    </div>
                    <div className="relative flex-1">
                      <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Location"
                        className="pl-12 h-14 text-lg border-0 bg-gray-50/50 focus:bg-white transition-all duration-300"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        disabled={showRecommended}
                      />
                    </div>
                    <Button 
                      size="lg"
                      onClick={handleSearch}
                      className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      disabled={showRecommended}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search Jobs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mx-6">
          {/* Premium Filters Sidebar */}
          <div className="xl:col-span-1">
            <Card className="sticky top-6 border-0 shadow-xl bg-white/90 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-t-xl">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-3" />
                  Smart Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <ToggleRight className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">AI Recommendations</span>
                        <p className="text-xs text-gray-600">Personalized job matches</p>
                      </div>
                    </div>
                    <Switch 
                      checked={showRecommended} 
                      onCheckedChange={toggleRecommendedJobs}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <JobSearchFilters 
                      onFilterChange={handleFilterChange}
                      disabled={showRecommended}
                    />
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleApplyFilters}
                      disabled={showRecommended}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Jobs List */}
          <div className="xl:col-span-3">
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {showRecommended ? "Recommended for You" : "Job Opportunities"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {jobs.length} premium positions available
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Live Updates
                  </Badge>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-300px)]">
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(5)].map((_, index) => (
                      <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-3 flex-1">
                                <Skeleton className="h-7 w-2/3" />
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                              </div>
                              <Skeleton className="h-6 w-20" />
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <Skeleton className="h-6 w-16" />
                              <Skeleton className="h-6 w-20" />
                              <Skeleton className="h-6 w-18" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <Card className="border-0 shadow-xl bg-white text-center">
                    <CardContent className="py-16">
                      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-8">
                        <AlertCircle className="h-12 w-12 text-orange-500" />
                      </div>
                      <h2 className="font-bold text-3xl mb-4 text-gray-900">Connection Error</h2>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">{error}</p>
                      <Button 
                        onClick={loadJobs} 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {jobs.length === 0 ? (
                      <Card className="border-0 shadow-xl bg-white text-center">
                        <CardContent className="py-16">
                          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8">
                            <Briefcase className="h-12 w-12 text-blue-500" />
                          </div>
                          <h2 className="font-bold text-3xl mb-4 text-gray-900">No Jobs Found</h2>
                          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                            Try adjusting your search criteria or explore different locations
                          </p>
                          <Button 
                            onClick={() => {
                              setSearchTerm("software developer");
                              setLocation("");
                              setActiveFilters({});
                              handleSearch();
                            }} 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Reset Search
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-6">
                        {jobs.map((job, index) => (
                          <Card key={job.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden transform hover:-translate-y-1">
                            {/* Premium accent bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                            
                            <CardHeader className="pb-4 pt-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-3 flex-1">
                                  <div className="flex items-start justify-between">
                                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                      {job.title}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 transition-colors">
                                        <Bookmark className="h-4 w-4" />
                                      </Button>
                                      {index < 3 && (
                                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                                          <Star className="h-3 w-3 mr-1" />
                                          Featured
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                      <Building className="h-4 w-4 mr-2 text-blue-500" />
                                      {job.company}
                                    </div>
                                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                      <MapPin className="h-4 w-4 mr-2 text-green-500" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                      <Clock className="h-4 w-4 mr-2 text-purple-500" />
                                      {formatDate(job.date)}
                                    </div>
                                    {job.salary && (
                                      <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {job.salary}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
                              <p className="text-gray-700 leading-relaxed line-clamp-3">
                                {job.description}
                              </p>
                              
                              {job.tags && job.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {job.tags.slice(0, 6).map((tag, tagIndex) => (
                                    <Badge 
                                      key={tagIndex} 
                                      variant="outline"
                                      className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                  {job.tags.length > 6 && (
                                    <Badge variant="outline" className="text-gray-500">
                                      +{job.tags.length - 6} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </CardContent>
                            
                            <CardFooter className="flex justify-between items-center pt-4 pb-6 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
                              <div className="flex items-center space-x-4">
                                <Link 
                                  to="/builder" 
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Create Resume
                                </Link>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Globe className="h-4 w-4 mr-1" />
                                  Remote Available
                                </div>
                              </div>
                              
                              <a 
                                href={job.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex"
                              >
                                <Button 
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                  Apply Now
                                  <ArrowUpRight className="h-4 w-4 ml-2" />
                                </Button>
                              </a>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}

                    {!showRecommended && jobs.length > 0 && (
                      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <Button 
                              variant="outline" 
                              disabled={currentPage === 1} 
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 transition-all duration-300"
                            >
                              <ChevronLeft className="h-4 w-4" /> 
                              Previous
                            </Button>
                            
                            <div className="flex items-center space-x-4">
                              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
                                Page {currentPage}
                              </Badge>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              onClick={() => setCurrentPage(prev => prev + 1)}
                              disabled={jobs.length === 0}
                              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 transition-all duration-300"
                            >
                              Next
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default JobBoard;
