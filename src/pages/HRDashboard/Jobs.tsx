
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Plus, Filter, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        // Get all jobs for the table with updated fields
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select(`
            *,
            applications(id),
            hr_members(first_name, last_name)
          `)
          .order('created_at', { ascending: false });

        if (jobsError) {
          console.error("Error fetching jobs:", jobsError);
        } else {
          setJobs(jobsData || []);
          setTotalJobs(jobsData?.length || 0);
          
          // Count active jobs
          const active = jobsData?.filter(job => job.status === 'Open').length || 0;
          setActiveJobs(active);
        }
      } catch (error) {
        console.error("Error in fetching jobs data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleCreateJob = () => {
    navigate('/hr-dashboard/jobs/create');
  };

  const handleViewJob = (jobId) => {
    navigate(`/hr-dashboard/jobs/${jobId}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
      case 'Filled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
      case 'On Hold':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400';
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
          <Button className="bg-[#3b82f6] hover:bg-blue-700" onClick={handleCreateJob}>
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
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{loading ? "..." : totalJobs}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{loading ? "..." : activeJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-10">Loading jobs data...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Experience Level</TableHead>
                      <TableHead>Employment Type</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.length > 0 ? jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company_name || "N/A"}</TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(job.status)}`}>
                            {job.status}
                          </span>
                        </TableCell>
                        <TableCell>{job.applications?.length || 0}</TableCell>
                        <TableCell>{job.department || "N/A"}</TableCell>
                        <TableCell>{job.experience_level || "N/A"}</TableCell>
                        <TableCell>{job.employment_type || "N/A"}</TableCell>
                        <TableCell>{job.posted_date ? new Date(job.posted_date).toLocaleDateString() : "N/A"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleViewJob(job.id)}>View</Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6">
                          No jobs found. Create a new job to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
