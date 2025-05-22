
import React from "react";
import { CpuIcon, Settings, Power, RotateCw, AlertCircle, CheckCircle, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const AIAgents = () => {
  const agents = [
    { 
      id: 1, 
      name: 'JD Analyzer', 
      description: 'Analyzes job descriptions for completeness and bias', 
      status: 'active',
      lastActivity: '5 minutes ago',
      version: '2.4.1',
      performance: 98,
      tasks: [
        { id: 1, name: 'Job Description Quality Analysis', status: 'done' },
        { id: 2, name: 'Gender Bias Detection', status: 'done' },
        { id: 3, name: 'Inclusive Language Check', status: 'done' }
      ]
    },
    { 
      id: 2, 
      name: 'Resume Decoder', 
      description: 'Parses and extracts key information from resumes', 
      status: 'active',
      lastActivity: '1 minute ago',
      version: '3.1.0',
      performance: 95,
      tasks: [
        { id: 1, name: 'Resume Parsing', status: 'done' },
        { id: 2, name: 'Key Skills Extraction', status: 'done' },
        { id: 3, name: 'Experience Verification', status: 'in-progress' }
      ]
    },
    { 
      id: 3, 
      name: 'MatchMaker', 
      description: 'Matches candidates to job openings based on skills and experience', 
      status: 'processing',
      lastActivity: 'Now',
      version: '2.8.5',
      performance: 92,
      tasks: [
        { id: 1, name: 'Candidate-Job Matching', status: 'in-progress' },
        { id: 2, name: 'Skill Gap Analysis', status: 'queued' },
        { id: 3, name: 'Ranking Algorithm Optimization', status: 'done' }
      ]
    },
    { 
      id: 4, 
      name: 'Skills Assessment', 
      description: 'Evaluates technical and soft skills through automated assessments', 
      status: 'active',
      lastActivity: '12 minutes ago',
      version: '1.9.2',
      performance: 97,
      tasks: [
        { id: 1, name: 'Technical Skills Evaluation', status: 'done' },
        { id: 2, name: 'Soft Skills Analysis', status: 'done' },
        { id: 3, name: 'Assessment Report Generation', status: 'done' }
      ]
    },
    { 
      id: 5, 
      name: 'Technical Interview', 
      description: 'Conducts initial technical screening interviews', 
      status: 'inactive',
      lastActivity: '1 hour ago',
      version: '2.0.0',
      performance: 90,
      tasks: [
        { id: 1, name: 'Interview Question Generation', status: 'done' },
        { id: 2, name: 'Response Analysis', status: 'error' },
        { id: 3, name: 'Candidate Scoring', status: 'pending' }
      ]
    },
    { 
      id: 6, 
      name: 'Skill Trends', 
      description: 'Analyzes market trends in job skills and requirements', 
      status: 'active',
      lastActivity: '35 minutes ago',
      version: '1.5.7',
      performance: 99,
      tasks: [
        { id: 1, name: 'Industry Skill Trend Analysis', status: 'done' },
        { id: 2, name: 'Geographic Demand Mapping', status: 'done' },
        { id: 3, name: 'Emerging Skills Identification', status: 'done' }
      ]
    },
    { 
      id: 7, 
      name: 'Engagement', 
      description: 'Manages candidate communication and engagement', 
      status: 'active',
      lastActivity: '17 minutes ago',
      version: '2.3.4',
      performance: 93,
      tasks: [
        { id: 1, name: 'Automated Email Responses', status: 'done' },
        { id: 2, name: 'Interview Scheduling', status: 'done' },
        { id: 3, name: 'Candidate Update Notifications', status: 'done' }
      ]
    },
    { 
      id: 8, 
      name: 'Orchestration', 
      description: 'Coordinates all AI agents and manages workflow', 
      status: 'active',
      lastActivity: '3 minutes ago',
      version: '3.0.2',
      performance: 96,
      tasks: [
        { id: 1, name: 'Agent Task Distribution', status: 'done' },
        { id: 2, name: 'System Health Monitoring', status: 'done' },
        { id: 3, name: 'Performance Optimization', status: 'done' }
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'processing':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <RotateCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
      case 'queued':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <CpuIcon className="h-6 w-6" />
              AI Agents
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Monitor and control Mahayudh's AI recruitment agents
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RotateCw className="mr-1.5 h-4 w-4" />
              Refresh
            </Button>
            <Button className="bg-[#3b82f6] hover:bg-blue-700">
              <Zap className="mr-1.5 h-4 w-4" />
              Optimize All
            </Button>
          </div>
        </div>

        {/* System Health */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">System Health</CardTitle>
            <CardDescription>Overall AI system performance and status</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Agents</h4>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">6/8</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-2 rounded-full">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">System Load</h4>
                <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">68%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-2 rounded-full">
                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Accuracy</h4>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">95%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-2 rounded-full">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {agents.map(agent => (
            <Card key={agent.id} className={cn(
              "bg-white dark:bg-gray-800 border-l-4",
              agent.status === 'active' ? "border-l-green-500" :
              agent.status === 'inactive' ? "border-l-red-500" :
              "border-l-yellow-500"
            )}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(agent.status)}`}></div>
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Power className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5 mb-3">
                  <div className="flex justify-between">
                    <span>Last Activity:</span>
                    <span className="text-gray-700 dark:text-gray-300">{agent.lastActivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="text-gray-700 dark:text-gray-300">{agent.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance:</span>
                    <span className="text-gray-700 dark:text-gray-300">{agent.performance}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Current Tasks</h4>
                  <ul className="space-y-1">
                    {agent.tasks.map(task => (
                      <li key={task.id} className="flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-700/30 px-2.5 py-1.5 rounded">
                        <span>{task.name}</span>
                        {getTaskStatusIcon(task.status)}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAgents;
