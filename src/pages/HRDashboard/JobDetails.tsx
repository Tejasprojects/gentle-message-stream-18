
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Loader2, Briefcase, MapPin, Clock, User, Search, Check, X } from "lucide-react";
import { format } from "date-fns";

const JobDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        // Fetch job details
        const { data: jobData, error: jobError } = await supabase
          .from('jobs')
          .select(`
            *,
            companies:company_id (*),
            hr_members:assigned_hr_id (first_name, last_name, email)
          `)
          .eq('id', id)
          .single();
          
        if (jobError) {
          console.error("Error fetching job:", jobError);
          toast({
            title: "Error",
            description: "Could not retrieve job details.",
            variant: "destructive"
          });
          navigate('/hr-dashboard/jobs');
          return;
        }
        
        setJob(jobData);
        
        // Fetch applications for this job
        fetchApplications();
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchJobDetails();
    }
  }, [id, navigate, toast]);
  
  const fetchApplications = async () => {
    setApplicationsLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          candidates (id, first_name, last_name, email, profile_photo_url, skills, experience_years, overall_score)
        `)
        .eq('job_id', id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching applications:", error);
      } else {
        setApplications(data || []);
      }
    } catch (error) {
      console.error("Error in fetching applications:", error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId);
        
      if (error) {
        console.error("Error updating application:", error);
        toast({
          title: "Error",
          description: "Could not update application status.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Status updated",
          description: `Application status updated to ${status}.`
        });
        
        // Update local state
        setApplications(prev => 
          prev.map(app => app.id === applicationId ? {...app, status} : app)
        );
      }
    } catch (error) {
      console.error("Error in updating application:", error);
    }
  };

  const filteredApplications = applications.filter(app => {
    const candidate = app.candidates;
    if (!candidate) return false;
    
    const searchString = searchTerm.toLowerCase();
    return (
      candidate.first_name?.toLowerCase().includes(searchString) ||
      candidate.last_name?.toLowerCase().includes(searchString) ||
      candidate.email?.toLowerCase().includes(searchString) ||
      (candidate.skills && candidate.skills.some(skill => 
        skill.toLowerCase().includes(searchString)
      ))
    );
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800';
      case 'Interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'Offered':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Hired':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6 flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <p>Job not found.</p>
          <Button 
            onClick={() => navigate('/hr-dashboard/jobs')}
            className="mt-4"
          >
            Back to Jobs
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground">
              {job.companies.name} • Posted {format(new Date(job.posted_date), "MMMM dd, yyyy")}
            </p>
          </div>
          <Badge 
            className={job.status === 'Open' ? 'bg-green-100 text-green-800' : 
                       job.status === 'Closed' ? 'bg-red-100 text-red-800' : 
                       'bg-yellow-100 text-yellow-800'}
          >
            {job.status}
          </Badge>
        </div>
        
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Description</h2>
                      <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                    </div>
                    
                    {job.requirements && (
                      <div>
                        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Job Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Briefcase className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Job Type</p>
                              <p className="text-sm text-muted-foreground">{job.job_type || 'Not specified'}</p>
                            </div>
                          </div>
                          
                          {job.location && (
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Location</p>
                                <p className="text-sm text-muted-foreground">{job.location}</p>
                              </div>
                            </div>
                          )}
                          
                          {job.salary_range && (
                            <div className="flex items-start">
                              <Briefcase className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Salary Range</p>
                                <p className="text-sm text-muted-foreground">{job.salary_range}</p>
                              </div>
                            </div>
                          )}
                          
                          {job.application_deadline && (
                            <div className="flex items-start">
                              <Clock className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Application Deadline</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(job.application_deadline), "MMMM dd, yyyy")}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start">
                            <User className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Assigned Recruiter</p>
                              <p className="text-sm text-muted-foreground">
                                {job.hr_members ? 
                                  `${job.hr_members.first_name} ${job.hr_members.last_name}` : 
                                  'Not assigned'
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/hr-dashboard/jobs')}>
                  Back to Jobs
                </Button>
                <Button>Edit Job</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Manage and review applications for this job</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates by name, email or skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {applicationsLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div className="text-center py-10">
                    <User className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      {searchTerm ? "No candidates match your search." : "No applications found for this job."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Score</TableHead>
                          <TableHead className="hidden md:table-cell">Applied</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={app.candidates.profile_photo_url} />
                                  <AvatarFallback className="text-xs">
                                    {`${app.candidates.first_name?.[0] || ''}${app.candidates.last_name?.[0] || ''}`}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{`${app.candidates.first_name} ${app.candidates.last_name}`}</p>
                                  <p className="text-xs text-muted-foreground">{app.candidates.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeClass(app.status)}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {app.candidates.overall_score ? `${app.candidates.overall_score}/100` : 'N/A'}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {format(new Date(app.application_date), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => navigate(`/hr-dashboard/candidates/${app.candidates.id}`)}
                                >
                                  <User className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleUpdateStatus(app.id, 'Shortlisted')}
                                  className="text-blue-600"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                                  className="text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default JobDetails;
