
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from "recharts";
import { 
  Calendar, ChevronDown, Download, BarChart as BarChartIcon, 
  ArrowUpRight, Filter, Share2, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const HRDashboardAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("6months");

  // Sample data
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

  const topPositionsData = [
    { name: 'Software Engineer', applicants: 120, fillRate: 85 },
    { name: 'Product Designer', applicants: 87, fillRate: 70 },
    { name: 'Marketing Specialist', applicants: 65, fillRate: 90 },
    { name: 'Data Scientist', applicants: 52, fillRate: 65 },
    { name: 'Sales Representative', applicants: 48, fillRate: 95 },
  ];

  const demographicsData = [
    { name: 'Gender Diversity', value: 68 },
    { name: 'Ethnic Diversity', value: 62 },
    { name: 'Age Diversity', value: 74 },
    { name: 'Veterans', value: 15 },
    { name: 'Disability', value: 12 }
  ];

  const recruitmentFunnelData = [
    { name: 'Applications', value: 750 },
    { name: 'Screening', value: 450 },
    { name: 'Interviews', value: 280 },
    { name: 'Offers', value: 85 },
    { name: 'Hires', value: 65 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const recruitmentMetrics = [
    { name: 'Time to Fill', value: '32 days', trend: '+2 days', status: 'negative' },
    { name: 'Cost per Hire', value: '$4,250', trend: '-$350', status: 'positive' },
    { name: 'Offer Acceptance', value: '78%', trend: '+5%', status: 'positive' },
    { name: 'Interview to Offer', value: '32%', trend: '+2%', status: 'positive' },
    { name: 'Candidate Experience', value: '4.7/5', trend: '+0.2', status: 'positive' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your recruitment metrics and performance</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last 6 months</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="outline" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {recruitmentMetrics.map((metric) => (
                <Card key={metric.name}>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">{metric.name}</span>
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className={cn(
                        "text-xs mt-1 flex items-center",
                        metric.status === 'positive' ? 'text-green-600' : 'text-red-600'
                      )}>
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {metric.trend}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hiring Trends</CardTitle>
                  <CardDescription>Applications, interviews, and hires over time</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[350px]">
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
                          <Tooltip />
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
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recruitment Funnel</CardTitle>
                  <CardDescription>Conversion rates at each hiring stage</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[350px]">
                    <ChartContainer 
                      className="h-full w-full"
                      config={{
                        value: { label: "Count" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={recruitmentFunnelData}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            dataKey="value" 
                            fill="#3b82f6" 
                            radius={[0, 4, 4, 0]}
                            label={{ position: 'right', fill: '#666' }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Time to Fill</CardTitle>
                  <CardDescription>Average days by department</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
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
                          <Tooltip />
                          <Bar dataKey="days" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Candidate Source</CardTitle>
                  <CardDescription>Applications by channel</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
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
                            label
                          >
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Diversity Metrics</CardTitle>
                  <CardDescription>DEI progress scores</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px] pt-4">
                    {demographicsData.map((item) => (
                      <div key={item.name} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recruitment ROI Calculator</CardTitle>
                  <CardDescription>Measure return on investment for hiring efforts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Total Cost</h4>
                        <div className="flex items-center text-2xl font-bold">
                          <span>$345,200</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Advertising, recruiter time, onboarding costs
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Value Generated</h4>
                        <div className="flex items-center text-2xl font-bold text-green-600">
                          <span>$1,245,000</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Estimated productivity from new hires
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">ROI Ratio</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">3.6x</span>
                        <span className="text-xs text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3" /> 0.4 from previous period
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <BarChartIcon className="h-4 w-4 mr-2" />
                      View Detailed ROI Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Positions</CardTitle>
                  <CardDescription>Hiring success rate by job role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPositionsData.map((position) => (
                      <div key={position.name} className="flex items-center">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{position.name}</span>
                            <span className="text-sm">{position.applicants} applicants</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${position.fillRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{position.fillRate}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Benchmark Comparisons</CardTitle>
                <CardDescription>How your metrics compare to industry standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Time to Fill</h3>
                    <div className="flex items-end gap-2">
                      <div className="text-2xl font-bold">32 days</div>
                      <div className="text-sm text-green-600">-12%</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">Industry avg: 36.5 days</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div className="bg-blue-600 h-1.5 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Better</span>
                      <span>Avg</span>
                      <span>Worse</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Cost per Hire</h3>
                    <div className="flex items-end gap-2">
                      <div className="text-2xl font-bold">$4,250</div>
                      <div className="text-sm text-green-600">-8%</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">Industry avg: $4,625</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div className="bg-blue-600 h-1.5 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Better</span>
                      <span>Avg</span>
                      <span>Worse</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Offer Acceptance</h3>
                    <div className="flex items-end gap-2">
                      <div className="text-2xl font-bold">78%</div>
                      <div className="text-sm text-green-600">+5%</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">Industry avg: 68%</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div className="bg-blue-600 h-1.5 rounded-full w-4/5"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Better</span>
                      <span>Avg</span>
                      <span>Worse</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Create tailored reports with the metrics you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Saved Reports</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <span className="text-sm">Monthly Hiring Summary</span>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <span className="text-sm">Diversity Metrics</span>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <span className="text-sm">Cost per Department</span>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <Plus className="h-4 w-4 mr-1" />
                          Create New Report
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <div className="md:col-span-2">
                      <div className="border rounded-lg p-4 space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Report Configuration</h3>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">Time to Fill</Button>
                            <Button variant="outline" size="sm">Cost per Hire</Button>
                            <Button variant="outline" size="sm">Source Quality</Button>
                            <Button variant="outline" size="sm">Diversity</Button>
                            <Button variant="outline" size="sm">Offer Acceptance</Button>
                            <Button variant="outline" size="sm">+ Add Metrics</Button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Filters</h3>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">Department</Button>
                            <Button variant="outline" size="sm">Date Range</Button>
                            <Button variant="outline" size="sm">Job Level</Button>
                            <Button variant="outline" size="sm">Location</Button>
                            <Button variant="outline" size="sm">+ Add Filter</Button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Visualization</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Bar Chart</Button>
                            <Button variant="outline" size="sm">Line Chart</Button>
                            <Button variant="outline" size="sm">Pie Chart</Button>
                            <Button variant="outline" size="sm">Table</Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Save Report</Button>
                          <Button>Generate Report</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Quickly generate common reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover-scale cursor-pointer">
                    <BarChartIcon className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-medium mb-1">Recruitment Overview</h3>
                    <p className="text-sm text-gray-500 mb-4">Comprehensive overview of all recruitment metrics</p>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover-scale cursor-pointer">
                    <BarChartIcon className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="font-medium mb-1">Efficiency Report</h3>
                    <p className="text-sm text-gray-500 mb-4">Focus on time and cost metrics</p>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover-scale cursor-pointer">
                    <BarChartIcon className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-medium mb-1">Diversity & Inclusion</h3>
                    <p className="text-sm text-gray-500 mb-4">DEI metrics across recruitment funnel</p>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboardAnalytics;
