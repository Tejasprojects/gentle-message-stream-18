
import React from "react";
import { Briefcase, Plus, Filter, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Jobs = () => {
  // Sample job data
  const jobs = [
    { 
      id: 1, 
      title: 'Senior React Developer', 
      status: 'Active', 
      applications: 48, 
      postedDate: '2025-05-10', 
      department: 'Engineering',
      location: 'Remote' 
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      status: 'Active', 
      applications: 36, 
      postedDate: '2025-05-12', 
      department: 'Product',
      location: 'New Delhi, India' 
    },
    { 
      id: 3, 
      title: 'UI/UX Designer', 
      status: 'Active', 
      applications: 27, 
      postedDate: '2025-05-14', 
      department: 'Design',
      location: 'Hybrid, Bengaluru' 
    },
    { 
      id: 4, 
      title: 'Data Scientist', 
      status: 'Draft', 
      applications: 0, 
      postedDate: '—', 
      department: 'Analytics',
      location: 'Mumbai, India' 
    },
    { 
      id: 5, 
      title: 'DevOps Engineer', 
      status: 'Closed', 
      applications: 45, 
      postedDate: '2025-04-05', 
      department: 'Engineering',
      location: 'Remote' 
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              Jobs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and monitor all job postings
            </p>
          </div>
          <Button className="bg-[#3b82f6] hover:bg-blue-700">
            <Plus className="mr-1.5 h-4 w-4" /> Create New Job
          </Button>
        </div>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 col-span-full lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Find Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-1.5 h-4 w-4" />
                  Filters
                  <ChevronDown className="ml-1.5 h-4 w-4" />
                </Button>
                <Button variant="outline">Status: All</Button>
                <Button variant="outline">Department: All</Button>
                <Button variant="outline">Location: All</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 col-span-full lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">24</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(job.status)}`}>
                          {job.status}
                        </span>
                      </TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.postedDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
