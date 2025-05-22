
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Line, AreaChart, PieChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, Legend, Area, Pie, Cell } from "recharts";
import { CalendarDays, BarChart2, PieChart as PieChartIcon, TrendingUp, Clock } from "lucide-react";

const MyAnalytics = () => {
  // Sample data for analytics
  const applicationData = [
    { month: "Jan", applications: 3, interviews: 1, offers: 0 },
    { month: "Feb", applications: 5, interviews: 2, offers: 0 },
    { month: "Mar", applications: 7, interviews: 3, offers: 1 },
    { month: "Apr", applications: 10, interviews: 4, offers: 0 },
    { month: "May", applications: 8, interviews: 3, offers: 1 },
  ];

  const responseRateData = [
    { name: "Week 1", rate: 20 },
    { name: "Week 2", rate: 35 },
    { name: "Week 3", rate: 30 },
    { name: "Week 4", rate: 45 },
    { name: "Week 5", rate: 55 },
    { name: "Week 6", rate: 60 },
  ];

  const interviewStageData = [
    { name: "Phone Screen", value: 10 },
    { name: "Technical", value: 7 },
    { name: "Behavioral", value: 5 },
    { name: "Final Round", value: 3 },
    { name: "Offer", value: 2 },
  ];

  const skillsData = [
    { name: "React", score: 85 },
    { name: "JavaScript", score: 80 },
    { name: "TypeScript", score: 70 },
    { name: "Node.js", score: 65 },
    { name: "CSS", score: 60 },
  ];

  const timeToResponseData = [
    { name: "1 day", percentage: 15 },
    { name: "2-3 days", percentage: 25 },
    { name: "4-7 days", percentage: 35 },
    { name: "1-2 weeks", percentage: 20 },
    { name: "3+ weeks", percentage: 5 },
  ];

  // Colors for the charts
  const COLORS = ["#4f46e5", "#3b82f6", "#0ea5e9", "#06b6d4", "#0ea5e9"];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Analytics</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Metrics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-medium">Application Metrics</CardTitle>
                  <CardDescription>Applications, interviews, and offers</CardDescription>
                </div>
                <BarChart2 className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#4f46e5" name="Applications" />
                      <Bar dataKey="interviews" fill="#10b981" name="Interviews" />
                      <Bar dataKey="offers" fill="#f59e0b" name="Offers" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Response Rate */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-medium">Response Rate Trend</CardTitle>
                  <CardDescription>Weekly response rate percentage</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={responseRateData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="rate" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} name="Response Rate %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Interview Funnel */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-medium">Interview Funnel</CardTitle>
                  <CardDescription>Progress through interview stages</CardDescription>
                </div>
                <PieChartIcon className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie
                        data={interviewStageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {interviewStageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Time to Response */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-medium">Time to Response</CardTitle>
                  <CardDescription>How quickly companies respond</CardDescription>
                </div>
                <Clock className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeToResponseData}
                      layout="vertical"
                    >
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="percentage" name="Percentage" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Insights</CardTitle>
                <CardDescription>
                  Detailed analysis of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Detailed application analytics would appear here in a full implementation.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interviews" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Performance</CardTitle>
                <CardDescription>
                  Analysis of your interview performance and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Interview performance analytics would appear here in a full implementation.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>
                  Your skills compared to market demands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillsData}
                      layout="vertical"
                    >
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="score" name="Proficiency" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyAnalytics;
