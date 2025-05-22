
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, BarChart2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";

const MyApplications = () => {
  const { user } = useAuth();
  const { applications, loading } = useApplications();

  // Count applications by status
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  // Status badge color mapping
  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interview: "bg-green-100 text-green-800",
    Rejected: "bg-gray-100 text-gray-800",
    Offer: "bg-purple-100 text-purple-800"
  };

  // Status icon mapping
  const statusIcons = {
    Applied: <FileText className="h-4 w-4 mr-1" />,
    Interview: <Calendar className="h-4 w-4 mr-1" />,
    Rejected: <XCircle className="h-4 w-4 mr-1" />,
    Offer: <CheckCircle className="h-4 w-4 mr-1" />
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading applications...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts["Applied"] || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts["Interview"] || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.length > 0
                ? Math.round(
                    ((statusCounts["Interview"] || 0) / applications.length) * 100
                  ) + "%"
                : "0%"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{app.job_title}</CardTitle>
                        <CardDescription>{app.company}</CardDescription>
                      </div>
                      <Badge className={statusColors[app.status] || "bg-gray-100"}>
                        {statusIcons[app.status]}
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied: {new Date(app.date_applied).toLocaleDateString()}
                      </div>
                      
                      {app.next_step && (
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-2" />
                          Next: {app.next_step}
                        </div>
                      )}
                      
                      {app.feedback && (
                        <div className="flex items-start mt-2 pt-2 border-t border-gray-100">
                          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                          <span>Feedback: {app.feedback}</span>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{app.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No applications found. Start applying for jobs to see them here!
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active">
          <div className="text-center py-12 text-gray-500">
            {applications.filter(app => app.status === 'Applied').length > 0 ? (
              <div className="space-y-4">
                {applications
                  .filter(app => app.status === 'Applied')
                  .map((app) => (
                    <Card key={app.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{app.job_title}</CardTitle>
                            <CardDescription>{app.company}</CardDescription>
                          </div>
                          <Badge className={statusColors[app.status] || "bg-gray-100"}>
                            {statusIcons[app.status]}
                            {app.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Application details */}
                        <div className="text-sm space-y-2">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            Applied: {new Date(app.date_applied).toLocaleDateString()}
                          </div>
                          
                          {app.next_step && (
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-2" />
                              Next: {app.next_step}
                            </div>
                          )}
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{app.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${app.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              "No active applications found."
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="interviews">
          <div className="text-center py-12 text-gray-500">
            {applications.filter(app => app.status === 'Interview').length > 0 ? (
              <div className="space-y-4">
                {applications
                  .filter(app => app.status === 'Interview')
                  .map((app) => (
                    <Card key={app.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{app.job_title}</CardTitle>
                            <CardDescription>{app.company}</CardDescription>
                          </div>
                          <Badge className={statusColors[app.status] || "bg-gray-100"}>
                            {statusIcons[app.status]}
                            {app.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Interview details */}
                        <div className="text-sm space-y-2">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            Applied: {new Date(app.date_applied).toLocaleDateString()}
                          </div>
                          
                          {app.next_step && (
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-2" />
                              Next: {app.next_step}
                            </div>
                          )}
                          
                          {app.feedback && (
                            <div className="flex items-start mt-2 pt-2 border-t border-gray-100">
                              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                              <span>Feedback: {app.feedback}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              "No interviews scheduled at this time."
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rejected">
          <div className="text-center py-12 text-gray-500">
            {applications.filter(app => app.status === 'Rejected').length > 0 ? (
              <div className="space-y-4">
                {applications
                  .filter(app => app.status === 'Rejected')
                  .map((app) => (
                    <Card key={app.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{app.job_title}</CardTitle>
                            <CardDescription>{app.company}</CardDescription>
                          </div>
                          <Badge className={statusColors[app.status] || "bg-gray-100"}>
                            {statusIcons[app.status]}
                            {app.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Rejection details */}
                        <div className="text-sm space-y-2">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            Applied: {new Date(app.date_applied).toLocaleDateString()}
                          </div>
                          
                          {app.feedback && (
                            <div className="flex items-start mt-2 pt-2 border-t border-gray-100">
                              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                              <span>Feedback: {app.feedback}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              "No rejected applications."
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyApplications;
