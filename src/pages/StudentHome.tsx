
import React from "react";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Briefcase, Calendar, CheckCircle, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StudentHome = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");

  // Sample data for dashboard stats
  const stats = [
    { title: "Resume Score", value: "78%", icon: FileText },
    { title: "Jobs Applied", value: "12", icon: Briefcase },
    { title: "Interviews", value: "3", icon: Calendar },
    { title: "Certifications", value: "2", icon: Award },
  ];

  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || 'Student'}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" /> View Resumes
            </Button>
            <Button>
              <Briefcase className="h-4 w-4 mr-2" /> Find Jobs
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
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
                  <div className="space-y-4">
                    {['Senior Frontend Developer at TechCorp', 'UX Designer at Creative Studios', 'Full Stack Engineer at DataSystems'].map(job => (
                      <div key={job} className="flex items-center justify-between border-b pb-2">
                        <span>{job}</span>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link to="/my-applications">
                        View all applications
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Scheduled interviews for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Wed, 10:00 AM - Technical Interview with TechCorp', 
                      'Thu, 2:30 PM - Design Challenge with Creative Studios'].map(interview => (
                      <div key={interview} className="flex items-center justify-between border-b pb-2">
                        <span>{interview}</span>
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
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">Senior Frontend Developer</td>
                        <td className="px-6 py-4">TechCorp</td>
                        <td className="px-6 py-4">May 20, 2025</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Interview</span>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">UX Designer</td>
                        <td className="px-6 py-4">Creative Studios</td>
                        <td className="px-6 py-4">May 18, 2025</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Assessment</span>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4">Full Stack Engineer</td>
                        <td className="px-6 py-4">DataSystems</td>
                        <td className="px-6 py-4">May 15, 2025</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Applied</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Technical Interview - TechCorp</h3>
                        <p className="text-sm text-muted-foreground">Wednesday, May 25, 2025 • 10:00 AM</p>
                      </div>
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Upcoming</div>
                    </div>
                    <p className="text-sm mb-4">Prepare to discuss your experience with React, TypeScript, and system design.</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Add to Calendar
                      </Button>
                      <Button size="sm">
                        Practice with AI Coach
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Design Challenge - Creative Studios</h3>
                        <p className="text-sm text-muted-foreground">Thursday, May 26, 2025 • 2:30 PM</p>
                      </div>
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Upcoming</div>
                    </div>
                    <p className="text-sm mb-4">You'll be given a design problem to solve in real-time. Prepare your portfolio and case studies.</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Add to Calendar
                      </Button>
                      <Button size="sm">
                        Practice with AI Coach
                      </Button>
                    </div>
                  </div>
                </div>
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
