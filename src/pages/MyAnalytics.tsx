
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Line, AreaChart, PieChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, Legend, Area, Pie, Cell } from "recharts";
import { CalendarDays, BarChart2, PieChart as PieChartIcon, TrendingUp, Clock, Target, Award, Zap, Users, Star, Globe } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuth } from "@/context/AuthContext";
import { updateUserAnalytics } from "@/services/analyticsService";

const MyAnalytics = () => {
  const { analytics, loading, refetch } = useAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    const updateAnalytics = async () => {
      if (user) {
        try {
          await updateUserAnalytics(user.id);
          refetch();
        } catch (error) {
          console.error("Failed to update analytics:", error);
        }
      }
    };

    updateAnalytics();
  }, [user]);

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

  const COLORS = ["#4f46e5", "#3b82f6", "#0ea5e9", "#06b6d4", "#0ea5e9"];

  const statsCards = [
    {
      title: "Applications",
      value: analytics?.applications_count || 0,
      icon: BarChart2,
      gradient: "from-blue-600 to-indigo-700",
      change: "+12%"
    },
    {
      title: "Interviews",
      value: analytics?.interviews_count || 0,
      icon: Users,
      gradient: "from-emerald-600 to-teal-700",
      change: "+8%"
    },
    {
      title: "Offers",
      value: analytics?.offers_count || 0,
      icon: Award,
      gradient: "from-purple-600 to-pink-600",
      change: "+25%"
    },
    {
      title: "Response Rate",
      value: `${analytics?.response_rate || 0}%`,
      icon: TrendingUp,
      gradient: "from-orange-600 to-amber-700",
      change: "+5%"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <h3 className="text-2xl font-semibold text-slate-700">Analyzing Your Data</h3>
          <p className="text-slate-500">Generating insights from your career analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mb-8 rounded-2xl mx-4 mt-4">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BarChart2 className="h-6 w-6" />
                </div>
                Career Analytics
              </h1>
              <p className="text-xl text-slate-300">
                Deep insights into your job search performance
              </p>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center text-emerald-400">
                  <Target className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Success Rate: 78%</span>
                </div>
                <div className="flex items-center text-blue-400">
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Market Performance: Above Average</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm font-medium">Performance Score</p>
                  <p className="text-2xl font-bold">8.7/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Premium Analytics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={stat.title} className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl transform hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-emerald-600 text-sm font-semibold">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </div>
                    <p className="text-xs text-slate-500">vs last month</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">{stat.title}</p>
                  <h2 className="text-3xl font-bold text-slate-900">{stat.value}</h2>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Tabs */}
        <Tabs defaultValue="overview" className="w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border-0 p-2">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-slate-50 rounded-xl p-1">
              <TabsTrigger value="overview" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md">
                <Globe className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="applications" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md">
                <BarChart2 className="w-4 h-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="interviews" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md">
                <Users className="w-4 h-4 mr-2" />
                Interviews
              </TabsTrigger>
              <TabsTrigger value="skills" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md">
                <Zap className="w-4 h-4 mr-2" />
                Skills
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Application Metrics */}
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Application Metrics</CardTitle>
                      <CardDescription className="text-slate-600">Applications, interviews, and offers over time</CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <BarChart2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={applicationData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="applications" fill="#4f46e5" name="Applications" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="interviews" fill="#10b981" name="Interviews" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="offers" fill="#f59e0b" name="Offers" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Response Rate */}
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Response Rate Trend</CardTitle>
                      <CardDescription className="text-slate-600">Weekly response rate percentage</CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={responseRateData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="rate" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} name="Response Rate %" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Funnel */}
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Interview Funnel</CardTitle>
                      <CardDescription className="text-slate-600">Progress through interview stages</CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <PieChartIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[280px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip />
                        <Pie
                          data={interviewStageData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
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
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Time to Response</CardTitle>
                      <CardDescription className="text-slate-600">How quickly companies respond</CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={timeToResponseData}
                        layout="vertical"
                      >
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="percentage" name="Percentage" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="bg-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl font-bold text-slate-900">Application Insights</CardTitle>
                <CardDescription className="text-slate-600">
                  Detailed analysis of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center py-16">
                  <BarChart2 className="w-20 h-20 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-slate-700 mb-4">Advanced Analytics Coming Soon</h3>
                  <p className="text-slate-500 text-lg max-w-md mx-auto">
                    Detailed application analytics with AI-powered insights will appear here in the full implementation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <Card className="bg-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-xl font-bold text-slate-900">Interview Performance</CardTitle>
                <CardDescription className="text-slate-600">
                  Analysis of your interview performance and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center py-16">
                  <Users className="w-20 h-20 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-slate-700 mb-4">Interview Analytics Dashboard</h3>
                  <p className="text-slate-500 text-lg max-w-md mx-auto">
                    Comprehensive interview performance analytics with success rate tracking will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="text-xl font-bold text-slate-900">Skills Assessment</CardTitle>
                <CardDescription className="text-slate-600">
                  Your skills compared to market demands
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillsData}
                      layout="vertical"
                    >
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="score" name="Proficiency" fill="#4f46e5" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyAnalytics;
