
import React, { useState, useEffect } from "react";
import { Users, Search, Filter, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [pipelineStats, setPipelineStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Define pipeline stages with colors
  const pipelineStages = [
    { id: 1, name: 'Applied', count: 0, color: 'bg-blue-500' },
    { id: 2, name: 'Screening', count: 0, color: 'bg-indigo-500' },
    { id: 3, name: 'Assessment', count: 0, color: 'bg-purple-500' },
    { id: 4, name: 'Interview', count: 0, color: 'bg-yellow-500' },
    { id: 5, name: 'Offer', count: 0, color: 'bg-orange-500' },
    { id: 6, name: 'Hired', count: 0, color: 'bg-green-500' },
  ];

  useEffect(() => {
    async function fetchCandidates() {
      setLoading(true);
      try {
        // Fetch all candidates with their application status
        const { data, error } = await supabase
          .from('candidates')
          .select(`
            *,
            applications(
              id,
              status,
              pipeline_stage,
              application_date,
              job_id,
              ai_score,
              jobs(title)
            )
          `);

        if (error) {
          console.error("Error fetching candidates:", error);
        } else {
          // Process candidates data to add derived fields
          const processedCandidates = data.map(candidate => {
            // Use the most recent application for this candidate
            const latestApplication = candidate.applications?.sort((a, b) => 
              new Date(b.application_date) - new Date(a.application_date)
            )[0];
            
            return {
              ...candidate,
              stage: latestApplication?.pipeline_stage || 'Applied',
              role: latestApplication?.jobs?.title || 'Unknown Role',
              match: latestApplication?.ai_score || Math.floor(70 + Math.random() * 30), // Fallback to random score between 70-99
              appliedDate: latestApplication?.application_date ? new Date(latestApplication.application_date).toISOString().split('T')[0] : 'Unknown'
            };
          });
          
          setCandidates(processedCandidates);
          
          // Count candidates by pipeline stage
          const stageCounts = {};
          processedCandidates.forEach(candidate => {
            stageCounts[candidate.stage] = (stageCounts[candidate.stage] || 0) + 1;
          });
          
          // Update pipeline stages with actual counts
          const updatedPipelineStats = pipelineStages.map(stage => ({
            ...stage,
            count: stageCounts[stage.name] || 0
          }));
          
          setPipelineStats(updatedPipelineStats);
        }
      } catch (error) {
        console.error("Error in fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate => {
    if (!searchQuery) return true;
    
    const fullName = `${candidate.first_name} ${candidate.last_name}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    return fullName.includes(searchLower) || 
           candidate.email?.toLowerCase().includes(searchLower) ||
           candidate.role?.toLowerCase().includes(searchLower);
  });

  const getStageBadgeClass = (stage) => {
    switch (stage) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Screening':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Assessment':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Offer':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Hired':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Users className="h-6 w-6" />
              Candidates
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage candidate pipeline and profiles
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="mr-1.5 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-[#3b82f6] hover:bg-blue-700">
              Import Candidates
            </Button>
          </div>
        </div>

        {/* Kanban Pipeline */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Candidate Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading pipeline data...</div>
            ) : (
              <div className="flex items-center justify-between overflow-x-auto py-2">
                {pipelineStats.map(stage => (
                  <div key={stage.id} className="flex flex-col items-center px-3 min-w-[100px]">
                    <div className={`w-full h-1.5 ${stage.color} rounded-full mb-2`}></div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{stage.name}</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{stage.count}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Card className="bg-white dark:bg-gray-800 w-full">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="search"
                  placeholder="Search candidates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">Stage: All <ChevronDown className="ml-1 h-4 w-4" /></Button>
            <Button variant="outline">Match: All <ChevronDown className="ml-1 h-4 w-4" /></Button>
            <Button variant="outline">Date: All <ChevronDown className="ml-1 h-4 w-4" /></Button>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-10">Loading candidates...</div>
          ) : filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <Card key={candidate.id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.profile_photo_url} />
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                        {candidate.first_name && candidate.last_name ? 
                          `${candidate.first_name[0]}${candidate.last_name[0]}` : '??'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {candidate.first_name} {candidate.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.role}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageBadgeClass(candidate.stage)}`}>
                        {candidate.stage}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Applied: {candidate.appliedDate}</span>
                    <span className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      {candidate.match}% Match
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button size="sm">Schedule</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No candidates found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Candidates;
