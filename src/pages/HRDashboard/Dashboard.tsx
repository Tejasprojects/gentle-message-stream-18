
import React from "react";
import { 
  ArrowUpRight, Briefcase, Calendar, Check, ChevronRight, 
  CpuIcon, MoreHorizontal, Plus, Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Legend 
} from "recharts";

const Dashboard = () => {
  // Sample data for charts and metrics
  const hiringTrendsData = [
    { name: 'Jan', applications: 65, interviews: 28, hired: 15 },
    { name: 'Feb', applications: 59, interviews: 32, hired: 12 },
    { name: 'Mar', applications: 80, interviews: 45, hired: 23 },
    { name: 'Apr', applications: 81, interviews: 50, hired: 25 },
    { name: 'May', applications: 56, interviews: 32, hired: 19 },
    { name: 'Jun', applications: 55, interviews: 34, hired: 22 },
  ];

  const timeToFillData = [
    { name: 'Engineering', days: 45 },
    { name: 'Design', days: 32 },
    { name: 'Marketing', days: 28 },
    { name: 'Sales', days: 22 },
    { name: 'HR', days: 34 },
  ];

  const sourceData = [
    { name: 'LinkedIn', value: 45 },
    { name: 'Indeed', value: 28 },
    { name: 'Referrals', value: 20 },
    { name: 'Company Site', value: 15 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const aiAgents = [
    { id: 1, name: 'JD Analyzer', status: 'active', lastActivity: '5m ago', tasksCompleted: 248, accuracy: 98 },
    { id: 2, name: 'Resume Decoder', status: 'active', lastActivity: '1m ago', tasksCompleted: 532, accuracy: 95 },
    { id: 3, name: 'MatchMaker', status: 'processing', lastActivity: 'Now', tasksCompleted: 187, accuracy: 92 },
    { id: 4, name: 'Skills Assessment', status: 'active', lastActivity: '12m ago', tasksCompleted: 321, accuracy: 97 },
    { id: 5, name: 'Technical Interview', status: 'inactive', lastActivity: '1h ago', tasksCompleted: 98, accuracy: 90 },
    { id: 6, name: 'Skill Trends', status: 'active', lastActivity: '35m ago', tasksCompleted: 145, accuracy: 99 },
    { id: 7, name: 'Engagement', status: 'active', lastActivity: '17m ago', tasksCompleted: 267, accuracy: 93 },
    { id: 8, name: 'Orchestration', status: 'active', lastActivity: '3m ago', tasksCompleted: 421, accuracy: 96 },
  ];

  const pipelineStages = [
    { id: 1, name: 'Applied', count: 124, candidates: ['John Doe', 'Mary Smith', 'Robert Brown', '121 more'] },
    { id: 2, name: 'Screening', count: 87, candidates: ['Alex Johnson', 'Lisa Wong', 'Mike Davis', '84 more'] },
    { id: 3, name: 'Assessment', count: 56, candidates: ['Emma Wilson', 'James Miller', 'Sarah Lee', '53 more'] },
    { id: 4, name: 'Interview', count: 43, candidates: ['David Chen', 'Nina Patel', 'Chris Taylor', '40 more'] },
    { id: 5, name: 'Offer', count: 18, candidates: ['Hannah Kim', 'Tom Garcia', 'Laura Hill', '15 more'] },
    { id: 6, name: 'Hired', count: 12, candidates: ['Ryan Murphy', 'Sophia Clark', 'Kevin Singh', '9 more'] },
  ];

  const recentActivities = [
    { id: 1, type: 'application', message: 'New application received for Senior Developer position', time: '5 minutes ago' },
    { id: 2, type: 'interview', message: 'Interview completed with Lisa Wong for UI Designer role', time: '1 hour ago' },
    { id: 3, type: 'agent', message: 'AI Agent "Resume Decoder" processed 25 new resumes', time: '2 hours ago' },
    { id: 4, type: 'alert', message: 'System alert: High volume of applicants for Marketing position', time: '3 hours ago' },
    { id: 5, type: 'application', message: '12 new applications received for various positions', time: '5 hours ago' },
    { id: 6, type: 'interview', message: 'Technical interview scheduled with James Miller', time: '6 hours ago' },
    { id: 7, type: 'agent', message: 'AI Agent "MatchMaker" found 8 potential matches for open positions', time: '8 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: Today, 10:30 AM
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Jobs</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">24</h3>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    <span>12% from last month</span>
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Briefcase className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Candidates in Pipeline</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">340</h3>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    <span>8% from last month</span>
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Users className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews This Week</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">28</h3>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-1 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    <span>Same as last week</span>
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Calendar className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Hires</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">12</h3>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    <span>20% from last month</span>
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Check className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 pt-2">
            <Button className="bg-[#3b82f6] hover:bg-blue-700">
              <Plus className="mr-1.5 h-4 w-4" /> Post New Job
            </Button>
            <Button variant="secondary">
              Review Applications
            </Button>
            <Button variant="secondary">
              Schedule Interview
            </Button>
            <Button variant="secondary">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Candidate Pipeline */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Candidate Pipeline</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 p-0 h-auto">
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max pb-2">
                {pipelineStages.map((stage) => (
                  <div key={stage.id} className="w-56 shrink-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">{stage.name}</h4>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                        {stage.count}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {stage.candidates.slice(0, 3).map((candidate, index) => (
                        <div 
                          key={index} 
                          className="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm"
                        >
                          {candidate}
                        </div>
                      ))}
                      {stage.count > 3 && (
                        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                          {stage.candidates[3]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Agents Status */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">AI Agents Status</CardTitle>
              <CardDescription>Real-time monitoring of system agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiAgents.map((agent) => (
                  <div 
                    key={agent.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(agent.status)} mr-2`}></div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{agent.name}</h4>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>{agent.lastActivity}</span>
                      <span>Tasks: {agent.tasksCompleted}</span>
                    </div>
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Accuracy</span>
                        <span>{agent.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${agent.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest updates from the Mahayudh system</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto pr-2">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div className={`
                      mt-0.5 h-8 w-8 rounded-full flex items-center justify-center
                      ${activity.type === 'application' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                        activity.type === 'interview' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 
                        activity.type === 'agent' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}
                    `}>
                      {activity.type === 'application' ? <Users size={16} /> :
                       activity.type === 'interview' ? <Calendar size={16} /> :
                       activity.type === 'agent' ? <CpuIcon size={16} /> :
                       <Bell size={16} />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 dark:border-gray-700 px-6 py-3">
              <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400">
                View all activities
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hiring Trends */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-base">Hiring Trends</CardTitle>
                <CardDescription>Last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ChartContainer
                    className="h-full w-full"
                    config={{
                      applications: { label: "Applications" },
                      interviews: { label: "Interviews" },
                      hired: { label: "Hired" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hiringTrendsData}>
                        <defs>
                          <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="applications" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorApplications)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="interviews" 
                          stroke="#8b5cf6" 
                          fillOpacity={1} 
                          fill="url(#colorInterviews)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="hired" 
                          stroke="#10b981" 
                          fillOpacity={1} 
                          fill="url(#colorHired)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Time to Fill */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-base">Time to Fill</CardTitle>
                <CardDescription>By department (days)</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ChartContainer
                    className="h-full w-full"
                    config={{
                      days: { label: "Days" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeToFillData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="days" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Source */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-base">Candidate Source</CardTitle>
                <CardDescription>Distribution by channel</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ChartContainer
                    className="h-full w-full"
                    config={{
                      value: { label: "Value" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {sourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
