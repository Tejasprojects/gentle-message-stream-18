import React from "react";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Briefcase, Calendar, CheckCircle, Award, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useRecentActivity } from "@/hooks/useRecentActivity";
import { format } from "date-fns";

const StudentHome = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");
  const { stats, loading: statsLoading } = useDashboardStats();
  const { activity, loading: activityLoading } = useRecentActivity();

  // Stats configuration with real data
  const statsConfig = [
    { 
      title: "Resume Score", 
      value: statsLoading ? "..." : `${stats.resumeScore}%`, 
      icon: FileText 
    },
    { 
      title: "Jobs Applied", 
      value: statsLoading ? "..." : stats.jobsApplied.toString(), 
      icon: Briefcase 
    },
    { 
      title: "Interviews", 
      value: statsLoading ? "..." : stats.interviews.toString(), 
      icon: Calendar 
    },
    { 
      title: "Certifications", 
      value: statsLoading ? "..." : stats.certifications.toString(), 
      icon: Award 
    },
  ];

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'interview':
        return 'text-blue-600 bg-blue-100';
      case 'offer':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || 'Student'}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" asChild>
              <Link to="/builder">
                <FileText className="h-4 w-4 mr-2" /> View Resumes
              </Link>
            </Button>
            <Button asChild>
              <Link to="/job-board">
                <Briefcase className="h-4 w-4 mr-2" /> Find Jobs
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsConfig.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Your most recent job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  {activityLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : activity.applications.length > 0 ? (
                    <div className="space-y-4">
                      {activity.applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <span className="font-medium">{app.job_title}</span>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground">{formatDate(app.date_applied)}</span>
                            <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(app.status)} mt-1`}>
                              {app.status}
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link to="/my-applications">
                          View all applications
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No applications yet</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <Link to="/apply">Apply for Jobs</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Applications in interview stage</CardDescription>
                </CardHeader>
                <CardContent>
                  {activityLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : activity.interviews.length > 0 ? (
                    <div className="space-y-4">
                      {activity.interviews.map((interview) => (
                        <div key={interview.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <span className="font-medium">{interview.job_title}</span>
                            <p className="text-sm text-muted-foreground">{interview.company}</p>
                          </div>
                          <Button variant="outline" size="sm">Prepare</Button>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link to="/interview-coach">
                          Practice for interviews
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No interviews scheduled</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
                    <Link to="/builder">
                      <FileText className="h-8 w-8 mb-2" />
                      <span>Build Resume</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
                    <Link to="/job-board">
                      <Briefcase className="h-8 w-8 mb-2" />
                      <span>Find Jobs</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
                    <Link to="/certification-center">
                      <Award className="h-8 w-8 mb-2" />
                      <span>Get Certified</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                {activityLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : activity.applications.length > 0 ? (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3">Position</th>
                          <th scope="col" className="px-6 py-3">Company</th>
                          <th scope="col" className="px-6 py-3">Applied Date</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activity.applications.map((app, index) => (
                          <tr key={app.id} className={`${index !== activity.applications.length - 1 ? 'border-b' : ''} bg-white dark:bg-gray-800 dark:border-gray-700`}>
                            <td className="px-6 py-4">{app.job_title}</td>
                            <td className="px-6 py-4">{app.company}</td>
                            <td className="px-6 py-4">{formatDate(app.date_applied)}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No applications yet</p>
                    <Button className="mt-4" asChild>
                      <Link to="/apply">Start Applying</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interviews" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Schedule</CardTitle>
                <CardDescription>Your upcoming interviews and preparation resources</CardDescription>
              </CardHeader>
              <CardContent>
                {activityLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : activity.interviews.length > 0 ? (
                  <div className="space-y-6">
                    {activity.interviews.map((interview) => (
                      <div key={interview.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{interview.job_title} - {interview.company}</h3>
                            <p className="text-sm text-muted-foreground">Applied: {formatDate(interview.date_applied)}</p>
                          </div>
                          <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Interview Stage</div>
                        </div>
                        <p className="text-sm mb-4">Prepare for your interview with our AI coach.</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule
                          </Button>
                          <Button size="sm" asChild>
                            <Link to="/interview-coach">Practice with AI Coach</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No interviews scheduled yet</p>
                    <Button className="mt-4" asChild>
                      <Link to="/interview-coach">Practice Interview Skills</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learning" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your certifications and learning path</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Your Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-md flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium">React Developer</p>
                          <p className="text-xs text-muted-foreground">Earned on Apr 15, 2025</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium">TypeScript Fundamentals</p>
                          <p className="text-xs text-muted-foreground">Earned on Mar 22, 2025</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/certification-center">
                        Explore More Certifications
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recommended Learning Paths</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p>Full Stack Web Development</p>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm">65%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p>UI/UX Design Fundamentals</p>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div className="h-2 bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentHome;
