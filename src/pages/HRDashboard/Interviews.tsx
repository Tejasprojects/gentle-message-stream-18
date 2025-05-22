
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronLeft, ChevronRight, Clock, Download, Plus, Star, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns";

const HRDashboardInterviews = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"week" | "month">("week");

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };
  
  const prevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const weekDays = Array.from({ length: 5 }).map((_, i) => addDays(startOfCurrentWeek, i));
  
  const timeSlots = Array.from({ length: 9 }).map((_, i) => ({
    time: `${i + 9}:00`,
    interviews: []
  }));

  // Sample interview data
  const interviews = [
    {
      id: 1,
      candidateName: "Jennifer Smith",
      position: "Senior Frontend Developer",
      date: format(addDays(startOfCurrentWeek, 0), "yyyy-MM-dd"),
      time: "10:00",
      duration: 45,
      type: "technical",
      status: "scheduled",
      interviewers: ["John Doe", "Sarah Lee"]
    },
    {
      id: 2, 
      candidateName: "Michael Johnson",
      position: "Product Manager",
      date: format(addDays(startOfCurrentWeek, 1), "yyyy-MM-dd"),
      time: "14:00",
      duration: 60,
      type: "behavioral",
      status: "scheduled",
      interviewers: ["Emma Wilson"]
    },
    {
      id: 3,
      candidateName: "David Chen",
      position: "UX Designer",
      date: format(addDays(startOfCurrentWeek, 2), "yyyy-MM-dd"),
      time: "11:00",
      duration: 45,
      type: "portfolio",
      status: "scheduled",
      interviewers: ["Thomas Parker", "Lisa Wong"]
    },
    {
      id: 4,
      candidateName: "Sarah Garcia",
      position: "Backend Developer",
      date: format(addDays(startOfCurrentWeek, 3), "yyyy-MM-dd"),
      time: "15:30",
      duration: 60,
      type: "technical",
      status: "scheduled",
      interviewers: ["Robert Brown"]
    }
  ];

  // Sample feedback data
  const feedbackSamples = [
    {
      id: 1,
      candidateName: "Alex Rodriguez",
      position: "DevOps Engineer",
      date: "2023-05-18",
      interviewer: "David Miller",
      rating: 4,
      strengths: "Strong technical knowledge, excellent problem-solving skills",
      weaknesses: "Could improve communication skills",
      notes: "Would be a great addition to the team, recommended for next round",
      decision: "advance"
    },
    {
      id: 2,
      candidateName: "Emily Wilson",
      position: "Product Designer",
      date: "2023-05-17",
      interviewer: "Sarah Jones",
      rating: 5,
      strengths: "Exceptional portfolio, great communication skills, strong design thinking",
      weaknesses: "None significant",
      notes: "Top candidate, should expedite the hiring process",
      decision: "advance"
    },
    {
      id: 3,
      candidateName: "James Martin",
      position: "Frontend Developer",
      date: "2023-05-16",
      interviewer: "Thomas Lee",
      rating: 3,
      strengths: "Good knowledge of React, collaborative approach",
      weaknesses: "Limited experience with complex applications, needs mentoring",
      notes: "Potential for growth but might need additional training",
      decision: "consider"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Interview Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Schedule Interview
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>View and manage scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviews.map((interview) => (
                    <Card key={interview.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{interview.candidateName}</h3>
                            <p className="text-sm text-gray-500">{interview.position}</p>
                            <div className="flex items-center mt-2 text-sm gap-3">
                              <div className="flex items-center gap-1 text-gray-600">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{format(new Date(interview.date), "MMM dd, yyyy")}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{interview.time} ({interview.duration} min)</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Video className="h-4 w-4 mr-1" /> Join
                            </Button>
                            <Button size="sm" variant="default">
                              Details
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Interviewers:</span>
                            <span>{interview.interviewers.join(", ")}</span>
                          </div>
                          <div className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            interview.type === "technical" ? "bg-blue-100 text-blue-700" : 
                            interview.type === "behavioral" ? "bg-purple-100 text-purple-700" : 
                            "bg-green-100 text-green-700"
                          )}>
                            {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Scheduled Interviews</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interview Tools</CardTitle>
                <CardDescription>Resources to help with interview process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <Video className="h-8 w-8 mb-2 text-blue-600" />
                      <h3 className="font-medium mb-1">Video Interviews</h3>
                      <p className="text-sm text-gray-500">Conduct remote interviews via our integrated video platform</p>
                    </CardContent>
                  </Card>
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <FileText className="h-8 w-8 mb-2 text-purple-600" />
                      <h3 className="font-medium mb-1">Question Bank</h3>
                      <p className="text-sm text-gray-500">Access curated questions by role and skill level</p>
                    </CardContent>
                  </Card>
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <Download className="h-8 w-8 mb-2 text-green-600" />
                      <h3 className="font-medium mb-1">Reports</h3>
                      <p className="text-sm text-gray-500">Generate detailed interview reports and analytics</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Interview Calendar</CardTitle>
                    <CardDescription>Schedule and manage interviews</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={prevWeek}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-medium">
                      {format(weekDays[0], "MMM d")} - {format(weekDays[4], "MMM d, yyyy")}
                    </div>
                    <Button variant="outline" size="sm" onClick={nextWeek}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="ml-4">
                      <Button 
                        variant={currentView === "week" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setCurrentView("week")}
                      >
                        Week
                      </Button>
                      <Button 
                        variant={currentView === "month" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setCurrentView("month")}
                        className="ml-1"
                      >
                        Month
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  {/* Calendar Header */}
                  <div className="grid grid-cols-5 border-b">
                    {weekDays.map((day, i) => (
                      <div key={i} className="text-center py-3 border-r last:border-r-0">
                        <div className="text-sm font-medium">{format(day, "EEE")}</div>
                        <div className="text-lg">{format(day, "d")}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Content */}
                  <div className="grid grid-cols-5 relative min-h-[500px]">
                    {weekDays.map((day, dayIndex) => (
                      <div key={dayIndex} className="border-r last:border-r-0">
                        {timeSlots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="h-[60px] border-b text-xs px-2 py-1 relative">
                            <span className="text-gray-400">{slot.time}</span>
                            
                            {/* Find interviews for this day and time */}
                            {interviews.filter(interview => 
                              interview.date === format(day, "yyyy-MM-dd") && 
                              interview.time === slot.time
                            ).map(interview => (
                              <div 
                                key={interview.id} 
                                className={cn(
                                  "absolute left-0 right-0 mx-1 rounded p-1 text-xs text-white overflow-hidden cursor-pointer",
                                  interview.type === "technical" ? "bg-blue-500" : 
                                  interview.type === "behavioral" ? "bg-purple-500" : 
                                  "bg-green-500"
                                )}
                                style={{
                                  top: "20px",
                                  height: `${Math.min(interview.duration, 60) - 10}px`
                                }}
                              >
                                <div className="font-medium truncate">{interview.candidateName}</div>
                                <div className="truncate">{interview.position}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Feedback</CardTitle>
                <CardDescription>Review feedback from recent interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackSamples.map((feedback) => (
                    <Card key={feedback.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{feedback.candidateName}</h3>
                            <p className="text-sm text-gray-500">{feedback.position}</p>
                            <div className="flex items-center mt-1 text-sm">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                              <span className="text-gray-500">{format(new Date(feedback.date), "MMM dd, yyyy")}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-gray-500">By {feedback.interviewer}</span>
                            </div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Strengths</h4>
                            <p className="text-sm text-gray-600 mt-1">{feedback.strengths}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Areas for Improvement</h4>
                            <p className="text-sm text-gray-600 mt-1">{feedback.weaknesses}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700">Notes</h4>
                          <p className="text-sm text-gray-600 mt-1">{feedback.notes}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="font-medium text-sm mr-2">Decision:</span>
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              feedback.decision === "advance" ? "bg-green-100 text-green-700" : 
                              feedback.decision === "consider" ? "bg-yellow-100 text-yellow-700" : 
                              "bg-red-100 text-red-700"
                            )}>
                              {feedback.decision === "advance" ? "Advance to Next Round" : 
                               feedback.decision === "consider" ? "Consider" : 
                               "Reject"}
                            </span>
                          </div>
                          <Button variant="outline" size="sm">View Full Feedback</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Feedback</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Templates</CardTitle>
                <CardDescription>Standardized templates for different interview types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-blue-100 hover-scale">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Technical Interview</h3>
                      <p className="text-sm text-gray-500 mb-4">Structured template for assessing technical skills and problem-solving abilities</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">45-60 minutes</span>
                        <Button variant="outline" size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-purple-100 hover-scale">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Behavioral Interview</h3>
                      <p className="text-sm text-gray-500 mb-4">Questions to evaluate cultural fit and soft skills</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">30-45 minutes</span>
                        <Button variant="outline" size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-green-100 hover-scale">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-2">Portfolio Review</h3>
                      <p className="text-sm text-gray-500 mb-4">Framework for evaluating design and creative portfolios</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">45-60 minutes</span>
                        <Button variant="outline" size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="hover-scale">
                    <CardContent className="p-6 flex justify-center items-center h-full">
                      <Button variant="ghost">
                        <Plus className="h-5 w-5 mr-1" />
                        Create New Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Question Library</CardTitle>
                <CardDescription>Curated questions by category for different roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Frontend Development</h4>
                      <p className="text-sm text-gray-500">52 questions</p>
                    </div>
                    <Button variant="outline">View Questions</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Backend Development</h4>
                      <p className="text-sm text-gray-500">48 questions</p>
                    </div>
                    <Button variant="outline">View Questions</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">UX/UI Design</h4>
                      <p className="text-sm text-gray-500">35 questions</p>
                    </div>
                    <Button variant="outline">View Questions</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Product Management</h4>
                      <p className="text-sm text-gray-500">43 questions</p>
                    </div>
                    <Button variant="outline">View Questions</Button>
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

export default HRDashboardInterviews;
