
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Briefcase, Users, Calendar, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { title: "Active Job Postings", value: "0", icon: Briefcase },
    { title: "Total Applicants", value: "0", icon: Users },
    { title: "Scheduled Interviews", value: "0", icon: Calendar },
    { title: "Offer Letters Sent", value: "0", icon: FileText },
  ]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Fetch active job postings count
        const { count: jobCount, error: jobError } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Active');

        if (jobError) console.error("Error fetching jobs:", jobError);

        // Fetch total applicants count
        const { count: applicantCount, error: applicantError } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true });

        if (applicantError) console.error("Error fetching applicants:", applicantError);

        // Fetch scheduled interviews count
        const { count: interviewCount, error: interviewError } = await supabase
          .from('interviews')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Scheduled');

        if (interviewError) console.error("Error fetching interviews:", interviewError);

        // Update stats with actual counts
        setStats([
          { title: "Active Job Postings", value: jobCount?.toString() || "0", icon: Briefcase },
          { title: "Total Applicants", value: applicantCount?.toString() || "0", icon: Users },
          { title: "Scheduled Interviews", value: interviewCount?.toString() || "0", icon: Calendar },
          { title: "Offer Letters Sent", value: "8", icon: FileText }, // Keeping this hardcoded for now as we don't have a specific table for offers
        ]);

        // Fetch recent applications with candidate names
        const { data: applications, error: applicationsError } = await supabase
          .from('applications')
          .select(`
            id,
            application_date,
            candidates (
              first_name,
              last_name
            )
          `)
          .order('application_date', { ascending: false })
          .limit(4);

        if (applicationsError) {
          console.error("Error fetching recent applications:", applicationsError);
        } else {
          setRecentApplications(applications || []);
        }
      } catch (error) {
        console.error("Error in fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name || 'HR Manager'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold">{loading ? "..." : stat.value}</h2>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest candidates who applied for open positions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading recent applications...</div>
              ) : recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.map((app: any) => (
                    <div key={app.id} className="flex items-center justify-between border-b pb-2">
                      <span>
                        {app.candidates ? 
                          `${app.candidates.first_name} ${app.candidates.last_name}` : 
                          "Unknown Candidate"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(app.application_date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">No recent applications found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recruitment" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>Manage your active job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your job postings will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interviews" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled interviews for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your scheduled interviews will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Manage HR documents securely</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your documents will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
