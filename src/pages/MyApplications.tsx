
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, MapPin, Building, Eye, FileText } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";
import { useNotifications } from "@/hooks/useNotifications";
import StudentDashboardLayout from "@/components/layout/StudentDashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const MyApplications = () => {
  const { applications, loading } = useApplications();
  const { notifications, unreadCount } = useNotifications();
  const { toast } = useToast();

  const viewResume = async (filePath: string) => {
    if (!filePath) return;
    
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .createSignedUrl(filePath, 60);

      if (error) {
        throw error;
      }

      window.open(data.signedUrl, '_blank');
    } catch (error) {
      console.error("Error viewing resume:", error);
      toast({
        title: "Error",
        description: "Failed to open resume",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case 'reviewed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 25;
      case 'reviewed': return 50;
      case 'accepted': return 100;
      case 'rejected': return 0;
      default: return 20;
    }
  };

  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
            <p className="text-muted-foreground">
              Track your job applications and their progress
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {applications.length} Total Applications
            </Badge>
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {unreadCount} New Updates
              </Badge>
            )}
          </div>
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
              <CardDescription>Latest notifications about your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      <Badge
                        variant={notification.type === 'success' ? 'default' : notification.type === 'error' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading applications...</span>
            </div>
          ) : applications.length > 0 ? (
            applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{application.job_title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {application.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(application.application_status || application.status)}
                      <div className="text-sm text-gray-500 flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        Applied {new Date(application.date_applied).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Application Progress</span>
                        <span>{getProgressValue(application.application_status || application.status)}%</span>
                      </div>
                      <Progress value={getProgressValue(application.application_status || application.status)} className="h-2" />
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {application.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {application.location}
                        </div>
                      )}
                      
                      {/* Resume Information */}
                      {application.resume_file_name && (
                        <div className="flex items-center text-gray-600">
                          <FileText className="h-4 w-4 mr-2" />
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => viewResume(application.resume_file_path)}
                            className="p-0 h-auto text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {application.resume_file_name}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* HR Notes (if any) */}
                    {application.hr_notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">HR Notes:</p>
                        <p className="text-sm text-gray-600">{application.hr_notes}</p>
                      </div>
                    )}

                    {/* Rating (if provided) */}
                    {application.rating && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">HR Rating:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span
                              key={star}
                              className={`text-sm ${
                                star <= application.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({application.rating}/5)</span>
                      </div>
                    )}

                    {/* Next Steps */}
                    {application.next_step && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-700 mb-1">Next Steps:</p>
                        <p className="text-sm text-blue-600">{application.next_step}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-500 mb-4">
                  You haven't submitted any job applications. Start exploring opportunities!
                </p>
                <Button>Browse Jobs</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default MyApplications;
