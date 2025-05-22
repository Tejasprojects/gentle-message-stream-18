
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, BarChart2, Bell, BookOpen, BriefcaseBusiness, Calendar, ChevronDown, 
  ChevronRight, Code, Cog, FileBadge, FileEdit, GraduationCap, HelpCircle, Home, 
  Layers, Layout, Linkedin, LogOut, Menu, MessageSquare, PanelLeft, Route, Search, 
  Settings, Shield, Target, Lightbulb, Brain, Award, Rocket, TrendingUp, Users, 
  MessageCircle, BarChart, ActivitySquare, DollarSign, Clock, Filter, Sun
} from "lucide-react";

const StudentHome = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [expandedSections, setExpandedSections] = useState({
    cvTools: true,
    careerGuide: true,
    learn: true,
    blockchain: true
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Format the current date with proper types for DateTimeFormatOptions
  const today = new Date();
  const dateOptions = { 
    weekday: 'long' as const, 
    year: 'numeric' as const, 
    month: 'long' as const, 
    day: 'numeric' as const 
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);
  
  // Calculate greeting based on time of day
  const hours = today.getHours();
  let greeting = "Good morning";
  if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon";
  } else if (hours >= 18) {
    greeting = "Good evening";
  }

  // Fake data for dashboard
  const dashboardData = {
    profileStrength: 85,
    applications: 12,
    interviews: 3,
    responseRate: 65,
    linkedInOptimization: 92,
    skillsComplete: 78,
    currentSkill: "Full Stack Dev",
    skillProgress: 60,
    nextSkill: "React Advanced",
    marketDemand: "High",
    salaryRange: "$75K - $95K",
    hiringCompanies: 5,
    applicationResponseRate: 75,
    interviewSuccessRate: 85,
    skillProgressRate: 60
  };

  // Recent activity data
  const recentActivity = [
    { action: "Applied to Senior Developer at TechCorp", time: "2 hours ago" },
    { action: "Updated resume with new JavaScript certification", time: "1 day ago" },
    { action: "Completed React assessment (Score: 92/100)", time: "2 days ago" },
    { action: "Interview feedback received from DataFlow Inc", time: "3 days ago" },
    { action: "Earned AWS Cloud Practitioner certificate", time: "5 days ago" }
  ];

  // AI recommendations
  const recommendations = [
    "Update resume for Product Manager roles - 3 new matches",
    "Practice behavioral questions - Interview in 2 days",
    "Complete JavaScript assessment - Boost profile by 15%",
    "Apply to 3 matching positions - 95%+ compatibility"
  ];

  // Quick access tools
  const quickAccessTools = [
    { name: "Resume Builder", icon: FileEdit, path: "/builder", status: "Last: 2 days", action: "Launch Tool" },
    { name: "Job Board", icon: BriefcaseBusiness, path: "/job-board", status: "3 new matches", action: "View Jobs" },
    { name: "Interview Coach", icon: MessageSquare, path: "/interview-coach", status: "Next: Tomorrow", action: "Start Session" },
    { name: "ATS Scanner", icon: Search, path: "/ats-scanner", status: "Scan pending", action: "Scan Resume" },
    { name: "Skill Gap", icon: BarChart, path: "/skill-gap-analysis", status: "Assessment due", action: "Take Test" },
    { name: "LinkedIn", icon: Linkedin, path: "/linkedin-optimizer", status: "Views: +25%", action: "Optimize" }
  ];

  // Upcoming events
  const upcomingEvents = [
    { time: "2:00 PM", description: "Phone screen with Google (React Developer)", day: "Today" },
    { time: "4:30 PM", description: "Complete LinkedIn skills assessment", day: "Today" },
    { time: "10:00 AM", description: "Final interview with Microsoft (Cloud Engineer)", day: "Tomorrow" },
    { time: "", description: "Application deadline: Senior Developer at Apple", day: "Tomorrow" }
  ];

  const navigationItems = {
    main: [
      { name: "Dashboard", icon: Home, path: "/dashboard" },
      { name: "Job Search", icon: Search, path: "/job-search" },
      { name: "Apply for Jobs", icon: FileEdit, path: "/apply" },
      { name: "My Applications", icon: Target, path: "/my-applications", badge: "3" },
      { name: "My Analytics", icon: BarChart2, path: "/analytics" },
    ],
    cvTools: [
      { name: "Resume Builder", icon: FileEdit, path: "/builder" },
      { name: "ATS Scanner", icon: Search, path: "/ats-scanner" },
      { name: "LinkedIn Optimizer", icon: Linkedin, path: "/linkedin-optimizer" },
      { name: "Resume Compare", icon: BarChart, path: "/resume-compare" },
    ],
    careerGuide: [
      { name: "Career Path Simulator", icon: Route, path: "/career-path-simulator" },
      { name: "Interview Coach", icon: MessageSquare, path: "/interview-coach" },
      { name: "Job Board", icon: BriefcaseBusiness, path: "/job-board" },
      { name: "AI Job Switch Planner", icon: Lightbulb, path: "/ai-job-switch-planner" },
      { name: "AI Shadow Career Simulator", icon: Users, path: "/ai-shadow-career-simulator" },
      { name: "AI Layoff Readiness Toolkit", icon: Shield, path: "/ai-layoff-readiness-toolkit" },
    ],
    learn: [
      { name: "AI Coding Coach", icon: Code, path: "/ai-coding-coach" },
      { name: "MahayudhPro Builder", icon: Rocket, path: "/qwixpro-builder" },
      { name: "Skill Gap Analysis", icon: TrendingUp, path: "/skill-gap-analysis" },
      { name: "Mindprint Assessment", icon: Brain, path: "/mindprint-assessment" },
    ],
    blockchain: [
      { name: "MahayudhCert", icon: Award, path: "/certification-center" },
      { name: "Blockchain Vault", icon: Shield, path: "/blockchain-vault" },
    ],
    support: [
      { name: "Help Center", icon: HelpCircle, path: "/help" },
      { name: "Settings", icon: Settings, path: "/settings" },
      { name: "Contact", icon: MessageCircle, path: "/contact" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#374151] font-inter">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-2"
            >
              <Menu size={24} />
            </button>
            <div className="text-xl font-bold bg-gradient-to-r from-[#0077ff] to-[#0055cb] bg-clip-text text-transparent">
              Mahayudh
            </div>
          </div>
          
          <div className="flex items-center md:w-1/3">
            <div className="relative w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search jobs, tools, insights..."
                className="w-full pl-10 focus:ring-[#0077ff] focus:border-[#0077ff]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#ef4444]"></span>
            </button>
            
            <Avatar className="h-9 w-9 border border-gray-200">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="bg-[#0077ff] text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Left Sidebar */}
        <aside 
          className={`bg-white border-r border-gray-200 fixed inset-y-0 mt-16 pt-5 flex flex-col z-20 transition-all duration-300 
          ${sidebarOpen ? 'left-0 w-72' : '-left-72 w-72'} 
          ${isMobile ? 'shadow-xl' : ''}`}
        >
          {/* User Profile Section */}
          <div className="px-4 pb-6 mb-2 border-b border-gray-100">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-3 border-2 border-[#0077ff]/20">
                <AvatarImage src={user?.profilePicture} alt={user?.name} />
                <AvatarFallback className="text-lg bg-[#0077ff] text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{user?.name || "John Smith"}</h3>
              <div className="text-sm text-[#0077ff] font-medium mb-3">
                <Badge variant="outline" className="border-[#0077ff]/30 bg-[#0077ff]/5 text-[#0077ff]">
                  Actively Job Searching
                </Badge>
              </div>
              
              <div className="w-full mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Strength</span>
                  <span className="font-medium">{dashboardData.profileStrength}%</span>
                </div>
                <Progress value={dashboardData.profileStrength} className="h-2 bg-gray-100" indicatorClassName="bg-[#0077ff]" />
              </div>
              
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1 text-xs border-[#0077ff]/30 text-[#0077ff] hover:bg-[#0077ff]/5">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs border-[#0077ff]/30 text-[#0077ff] hover:bg-[#0077ff]/5">
                  Settings
                </Button>
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-3">
            <div className="space-y-1">
              {navigationItems.main.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-[#0077ff]/5 hover:text-[#0077ff] text-gray-700"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                    {item.name}
                  </div>
                  {item.badge && (
                    <Badge className="bg-[#0077ff]">{item.badge}</Badge>
                  )}
                </Link>
              ))}
            </div>
            
            {/* CV Tools Section */}
            <div className="mt-6">
              <button
                onClick={() => toggleSection('cvTools')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-600"
              >
                <span>CV TOOLS</span>
                <ChevronDown size={16} className={`transition-transform ${expandedSections.cvTools ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSections.cvTools && (
                <div className="space-y-1 mt-1">
                  {navigationItems.cvTools.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-8 py-2 text-sm font-medium rounded-md hover:bg-[#0077ff]/5 hover:text-[#0077ff] text-gray-600"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Career Guide Section */}
            <div className="mt-2">
              <button
                onClick={() => toggleSection('careerGuide')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-600"
              >
                <span>CAREER GUIDE</span>
                <ChevronDown size={16} className={`transition-transform ${expandedSections.careerGuide ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSections.careerGuide && (
                <div className="space-y-1 mt-1">
                  {navigationItems.careerGuide.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-8 py-2 text-sm font-medium rounded-md hover:bg-[#0077ff]/5 hover:text-[#0077ff] text-gray-600"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Learn Section */}
            <div className="mt-2">
              <button
                onClick={() => toggleSection('learn')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-600"
              >
                <span>MAHAYUDH LEARN</span>
                <ChevronDown size={16} className={`transition-transform ${expandedSections.learn ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSections.learn && (
                <div className="space-y-1 mt-1">
                  {navigationItems.learn.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-8 py-2 text-sm font-medium rounded-md hover:bg-[#0077ff]/5 hover:text-[#0077ff] text-gray-600"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Blockchain Section */}
            <div className="mt-2">
              <button
                onClick={() => toggleSection('blockchain')}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-600"
              >
                <span>BLOCKCHAIN SECURITY</span>
                <ChevronDown size={16} className={`transition-transform ${expandedSections.blockchain ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSections.blockchain && (
                <div className="space-y-1 mt-1">
                  {navigationItems.blockchain.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-8 py-2 text-sm font-medium rounded-md hover:bg-[#0077ff]/5 hover:text-[#0077ff] text-gray-600"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Support Section */}
            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="space-y-1">
                {navigationItems.support.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-[#0077ff]/5 hover:text-[#0077ff] text-gray-600"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-600 hover:text-[#ef4444] hover:border-[#ef4444]/30"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}
        >
          <div className="container mx-auto p-6">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#0055cb]">
                    {greeting}, {user?.name?.split(' ')[0] || "John"}! <span className="text-gray-500 text-lg">Ready to advance your career? 🌅</span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Today: {formattedDate} | Last login: 2 hours ago
                  </p>
                </div>
                
                <div className="relative mt-4 md:mt-0 md:w-1/3 md:hidden">
                  <div className="flex">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search jobs, tools, insights..."
                      className="w-full pl-10 focus:ring-[#0077ff] focus:border-[#0077ff] pr-20"
                    />
                    <Button variant="outline" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Filter size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Job Search Status Card */}
              <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-transparent">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                      <BarChart2 className="mr-2 h-5 w-5 text-[#0077ff]" />
                      Job Search Status
                    </CardTitle>
                    <span className="p-1.5 rounded-full bg-blue-100">
                      <ActivitySquare size={16} className="text-[#0077ff]" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Applications</span>
                      <span className="font-medium">{dashboardData.applications} this month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Interviews</span>
                      <span className="font-medium">{dashboardData.interviews} scheduled</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Response Rate</span>
                      <span className="font-medium text-[#10b981]">{dashboardData.responseRate}% <span className="text-xs">↗</span></span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-[#0077ff] border-[#0077ff]/30 hover:bg-[#0077ff]/10">
                    View All Applications
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Profile Strength Card */}
              <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-transparent">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                      <Users className="mr-2 h-5 w-5 text-[#0077ff]" />
                      Profile Strength
                    </CardTitle>
                    <span className="p-1.5 rounded-full bg-purple-100">
                      <Award size={16} className="text-[#0077ff]" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Resume Score</span>
                      <span className="font-medium">{dashboardData.profileStrength}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">LinkedIn</span>
                      <span className="font-medium">{dashboardData.linkedInOptimization}% optimized</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Skills</span>
                      <span className="font-medium">{dashboardData.skillsComplete}% complete</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-[#0077ff] border-[#0077ff]/30 hover:bg-[#0077ff]/10">
                    Improve Profile
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Skill Development Card */}
              <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-transparent">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5 text-[#0077ff]" />
                      Skill Development
                    </CardTitle>
                    <span className="p-1.5 rounded-full bg-green-100">
                      <BookOpen size={16} className="text-[#10b981]" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Current</span>
                      <span className="font-medium">{dashboardData.currentSkill}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{dashboardData.skillProgress}%</span>
                      </div>
                      <Progress value={dashboardData.skillProgress} className="h-2 bg-gray-100" indicatorClassName="bg-[#10b981]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Next</span>
                      <span className="font-medium">{dashboardData.nextSkill}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/10">
                    Continue Learning
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Career Insights Card */}
              <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-transparent">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-[#0077ff]" />
                      Career Insights
                    </CardTitle>
                    <span className="p-1.5 rounded-full bg-amber-100">
                      <TrendingUp size={16} className="text-[#f59e0b]" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Market Demand</span>
                      <span className="font-medium flex items-center">{dashboardData.marketDemand} <span className="text-[#ef4444] ml-1">🔥</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Salary</span>
                      <span className="font-medium">{dashboardData.salaryRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Companies</span>
                      <span className="font-medium">{dashboardData.hiringCompanies} hiring now</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/10">
                    View Insights
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Recent Activity Timeline */}
            <Card className="mb-8 border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                  <ActivitySquare className="mr-2 h-5 w-5 text-[#0077ff]" />
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-[#0077ff]">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 relative">
                        <div className="h-3 w-3 rounded-full bg-[#0077ff] ring-4 ring-[#0077ff]/10"></div>
                        {index < recentActivity.length - 1 && (
                          <div className="absolute h-full w-px bg-gray-200 top-3 left-1.5"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm">{activity.action}</p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* AI Recommendations Panel */}
            <Card className="mb-8 border border-gray-200 bg-gradient-to-r from-[#0077ff]/5 to-white overflow-hidden shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-[#0077ff]" />
                  Personalized Recommendations
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-[#0077ff]">
                  See All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-[#0077ff] mr-2">•</div>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Access Tools */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#0055cb] mb-4 flex items-center">
                <Rocket className="mr-2 h-5 w-5 text-[#0077ff]" />
                Quick Access Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickAccessTools.map((tool, index) => (
                  <Card key={index} className="border border-gray-200 hover:border-[#0077ff]/30 hover:shadow-md transition-all bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <span className="p-2 rounded-md bg-[#0077ff]/10 mr-3">
                            <tool.icon size={18} className="text-[#0077ff]" />
                          </span>
                          <h3 className="font-medium">{tool.name}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{tool.status}</p>
                      <Button 
                        asChild
                        variant="outline" 
                        size="sm" 
                        className="w-full text-[#0077ff] border-[#0077ff]/30 hover:bg-[#0077ff]/10"
                      >
                        <Link to={tool.path}>
                          {tool.action}
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Progress Tracking Charts */}
            <Card className="mb-8 border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-[#0077ff]" />
                  Progress Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-center mb-2">
                      <h3 className="text-sm font-medium">Application Response Rate</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-2xl font-bold">{dashboardData.applicationResponseRate}%</span>
                        <Badge className="bg-[#10b981]">+15%</Badge>
                      </div>
                    </div>
                    <Progress value={dashboardData.applicationResponseRate} className="h-2 bg-gray-100" indicatorClassName="bg-[#0077ff]" />
                    <p className="text-xs text-center mt-1 text-gray-500">from last month</p>
                  </div>
                  
                  <div>
                    <div className="text-center mb-2">
                      <h3 className="text-sm font-medium">Interview Success Rate</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-2xl font-bold">{dashboardData.interviewSuccessRate}%</span>
                        <Badge className="bg-[#10b981]">Above Avg</Badge>
                      </div>
                    </div>
                    <Progress value={dashboardData.interviewSuccessRate} className="h-2 bg-gray-100" indicatorClassName="bg-[#0077ff]" />
                    <p className="text-xs text-center mt-1 text-gray-500">better than average</p>
                  </div>
                  
                  <div>
                    <div className="text-center mb-2">
                      <h3 className="text-sm font-medium">Skill Progress</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-2xl font-bold">{dashboardData.skillProgressRate}%</span>
                        <Badge variant="outline" className="border-[#0077ff]/30 bg-[#0077ff]/5 text-[#0077ff]">
                          Full Stack
                        </Badge>
                      </div>
                    </div>
                    <Progress value={dashboardData.skillProgressRate} className="h-2 bg-gray-100" indicatorClassName="bg-[#10b981]" />
                    <p className="text-xs text-center mt-1 text-gray-500">{dashboardData.currentSkill}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Events & Reminders */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#0055cb] flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-[#0077ff]" />
                  Upcoming Events
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-[#0077ff]">
                  View Calendar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Group events by day */}
                  {["Today", "Tomorrow"].map((day) => (
                    <div key={day}>
                      <h3 className="font-medium text-sm mb-2">{day}:</h3>
                      <div className="space-y-3">
                        {upcomingEvents
                          .filter((event) => event.day === day)
                          .map((event, index) => (
                            <div key={index} className="flex items-start">
                              {event.time ? (
                                <div className="min-w-16 text-sm font-medium text-gray-600 mr-3">
                                  {event.time}
                                </div>
                              ) : (
                                <div className="min-w-16 flex items-center mr-3">
                                  <Clock size={14} className="text-[#f59e0b] mr-1" />
                                  <span className="text-xs text-[#f59e0b]">Deadline</span>
                                </div>
                              )}
                              <p className="text-sm">{event.description}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentHome;
