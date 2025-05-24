
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Loader2, TrendingUp, Users, FileText, Calendar } from "lucide-react";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

const MyAnalytics = () => {
  const [timeframe, setTimeframe] = useState("lastThreeMonths");
  const { analytics, loading } = useAnalytics();
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Mock data for demonstration - in a real app this would come from your analytics
  const applicationData = [
    { month: "Jan 2024", applications: 12, responses: 3, interviews: 1 },
    { month: "Feb 2024", applications: 15, responses: 5, interviews: 2 },
    { month: "Mar 2024", applications: 8, responses: 2, interviews: 1 },
  ];

  const skillsData = [
    { name: "React", value: 85 },
    { name: "TypeScript", value: 78 },
    { name: "Node.js", value: 72 },
    { name: "Python", value: 65 },
    { name: "AWS", value: 58 },
  ];

  const industryData = [
    { name: "Technology", applications: 20 },
    { name: "Finance", applications: 8 },
    { name: "Healthcare", applications: 5 },
    { name: "Education", applications: 3 },
  ];

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  if (loading) {
    return (
      <StudentDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </StudentDashboardLayout>
    );
  }

  return (
    <StudentDashboardLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your job search progress and performance
            </p>
          </div>
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="lastThreeMonths">Last 3 Months</SelectItem>
              <SelectItem value="lastSixMonths">Last 6 Months</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.applications_count || 0}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Invites</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.interviews_count || 0}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.response_rate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Offers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.offers_count || 0}</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="industry">Industry</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Application Progress Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
                <CardDescription>Your job application activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={applicationData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="applications" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Applications Sent"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responses" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Responses Received"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="interviews" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Interviews"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Application Success Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
                <CardDescription>Conversion rates through your application process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { stage: "Applications", count: 35, rate: 100 },
                        { stage: "Responses", count: 10, rate: 29 },
                        { stage: "Interviews", count: 4, rate: 11 },
                        { stage: "Offers", count: 1, rate: 3 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#3b82f6" name="Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            {/* Skills Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Profile</CardTitle>
                <CardDescription>Your skill strengths based on job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="horizontal"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Skills Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Distribution of your key skills</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industry" className="space-y-6">
            {/* Industry Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Applications by Industry</CardTitle>
                <CardDescription>Distribution of your applications across industries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={industryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Success Rate by Industry */}
            <Card>
              <CardHeader>
                <CardTitle>Success Rate by Industry</CardTitle>
                <CardDescription>Your response rates across different industries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { industry: "Technology", responseRate: 35, averageRate: 25 },
                        { industry: "Finance", responseRate: 28, averageRate: 30 },
                        { industry: "Healthcare", responseRate: 40, averageRate: 32 },
                        { industry: "Education", responseRate: 45, averageRate: 28 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="responseRate" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        name="Your Rate"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="averageRate" 
                        stackId="2" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        name="Industry Average"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentDashboardLayout>
  );
};

export default MyAnalytics;
