
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Mail, Phone, MapPin, Building, Calendar, Upload, X, Plus, 
  Save, Briefcase, GraduationCap, Clock, Link as LinkIcon, Shield
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HRDashboardProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const [skills, setSkills] = useState([
    "Talent Acquisition", "Technical Recruiting", "ATS Management", "Candidate Experience",
    "Employer Branding", "Interview Coordination", "Sourcing"
  ]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">HR Profile</h1>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="relative pb-0">
                {/* Cover Photo */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg"></div>
                
                <div className="relative pt-20 flex flex-col md:flex-row md:items-end">
                  {/* Profile Picture */}
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src={user?.profilePicture || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 pb-4">
                    <CardTitle className="text-2xl">{user?.name || "HR Manager"}</CardTitle>
                    <CardDescription>Senior Talent Acquisition Specialist</CardDescription>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-auto">
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="full-name" className="rounded-l-none" defaultValue={user?.name || "HR Manager"} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <Mail className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="email" className="rounded-l-none" defaultValue={user?.email || "hr@acmecorp.com"} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <Phone className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="phone" className="rounded-l-none" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <MapPin className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="location" className="rounded-l-none" defaultValue="San Francisco, CA" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="font-medium">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="job-title" className="rounded-l-none" defaultValue="Senior Talent Acquisition Specialist" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <Building className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="department" className="rounded-l-none" defaultValue="Human Resources" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <Clock className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="experience" className="rounded-l-none" defaultValue="8 years" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joined-date">Joined Date</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <Calendar className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="joined-date" className="rounded-l-none" defaultValue="June 15, 2021" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Write something about yourself..."
                    rows={4}
                    defaultValue="Passionate talent acquisition specialist with 8+ years of experience in technical recruiting for the tech industry. Focused on creating exceptional candidate experiences and building diverse teams."
                  />
                </div>
                
                {/* Skills */}
                <div className="space-y-4">
                  <Label>Skills and Specializations</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button 
                          className="ml-1 hover:bg-gray-200 rounded-full"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex">
                      <Input 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add new skill..."
                        className="rounded-r-none w-40"
                      />
                      <Button 
                        type="button" 
                        variant="secondary" 
                        className="rounded-l-none"
                        onClick={addSkill}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Education & Certifications */}
                <div className="space-y-4">
                  <h3 className="font-medium">Education & Certifications</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">MBA, Human Resource Management</h4>
                          <p className="text-sm text-gray-500">Stanford University</p>
                          <p className="text-xs text-gray-400">2013 - 2015</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">SHRM Senior Certified Professional (SHRM-SCP)</h4>
                          <p className="text-sm text-gray-500">Society for Human Resource Management</p>
                          <p className="text-xs text-gray-400">Issued 2018</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Add Education or Certification
                    </Button>
                  </div>
                </div>
                
                {/* Online Profiles */}
                <div className="space-y-4">
                  <h3 className="font-medium">Online Profiles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <LinkIcon className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="linkedin" className="rounded-l-none" defaultValue="https://linkedin.com/in/hrmanager" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="flex">
                        <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                          <LinkIcon className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input id="twitter" className="rounded-l-none" defaultValue="https://twitter.com/hrmanager" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Workload Settings</CardTitle>
                <CardDescription>Manage your capacity and assignment preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Capacity Settings */}
                <div className="space-y-4">
                  <h3 className="font-medium">Capacity Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="max-reqs">Maximum Open Requisitions</Label>
                    <Input id="max-reqs" type="number" defaultValue="15" />
                    <p className="text-xs text-muted-foreground">
                      The maximum number of open job requisitions you can manage simultaneously
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-interviews">Maximum Daily Interviews</Label>
                    <Input id="max-interviews" type="number" defaultValue="4" />
                    <p className="text-xs text-muted-foreground">
                      The maximum number of interviews you can conduct in a single day
                    </p>
                  </div>
                </div>
                
                {/* Work Schedule */}
                <div className="space-y-4">
                  <h3 className="font-medium">Working Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="work-start">Work Day Start</Label>
                      <Select defaultValue="9:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8:00">8:00 AM</SelectItem>
                          <SelectItem value="8:30">8:30 AM</SelectItem>
                          <SelectItem value="9:00">9:00 AM</SelectItem>
                          <SelectItem value="9:30">9:30 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work-end">Work Day End</Label>
                      <Select defaultValue="17:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="16:30">4:30 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="17:30">5:30 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Working Days</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className="bg-blue-50 border-blue-200">Mon</Button>
                      <Button variant="outline" className="bg-blue-50 border-blue-200">Tue</Button>
                      <Button variant="outline" className="bg-blue-50 border-blue-200">Wed</Button>
                      <Button variant="outline" className="bg-blue-50 border-blue-200">Thu</Button>
                      <Button variant="outline" className="bg-blue-50 border-blue-200">Fri</Button>
                      <Button variant="outline">Sat</Button>
                      <Button variant="outline">Sun</Button>
                    </div>
                  </div>
                </div>
                
                {/* Time Zone */}
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="America/Los_Angeles">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT) - Los Angeles</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT) - Denver</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT) - Chicago</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET) - New York</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT) - London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Specializations */}
                <div className="space-y-4">
                  <h3 className="font-medium">Hiring Specializations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-specialty">Primary Specialty</Label>
                      <Select defaultValue="engineering">
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="product">Product Management</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-specialty">Secondary Specialty</Label>
                      <Select defaultValue="product">
                        <SelectTrigger>
                          <SelectValue placeholder="Select secondary specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="product">Product Management</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Other Specialities</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800">Data Science</Badge>
                      <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800">DevOps</Badge>
                      <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800">Executive</Badge>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Plus className="h-3 w-3" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Communication Preferences */}
                <div className="space-y-4">
                  <h3 className="font-medium">Communication Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="interview-reminders">Interview Reminders</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive reminders for upcoming interviews
                        </p>
                      </div>
                      <Switch id="interview-reminders" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="feedback-reminders">Feedback Reminders</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive reminders to submit interview feedback
                        </p>
                      </div>
                      <Switch id="feedback-reminders" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="req-updates">Requisition Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive updates about your job requisitions
                        </p>
                      </div>
                      <Switch id="req-updates" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>Sync with your calendar for interview scheduling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="calendar-sync">Calendar Sync</Label>
                      <p className="text-xs text-muted-foreground">
                        Sync interviews with your calendar
                      </p>
                    </div>
                    <Switch id="calendar-sync" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="calendar-provider">Calendar Provider</Label>
                  <Select defaultValue="google">
                    <SelectTrigger>
                      <SelectValue placeholder="Select calendar provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Calendar</SelectItem>
                      <SelectItem value="outlook">Outlook Calendar</SelectItem>
                      <SelectItem value="apple">Apple Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-schedule">Automatic Scheduling</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow system to automatically schedule interviews in your available slots
                      </p>
                    </div>
                    <Switch id="auto-schedule" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="buffer-time">Buffer Time</Label>
                      <p className="text-xs text-muted-foreground">
                        Add buffer time before and after interviews
                      </p>
                    </div>
                    <Select defaultValue="15">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Buffer time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mr-2">Save Calendar Settings</Button>
                <Button variant="outline">Reconnect Calendar</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button>Update Password</Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">
                          Increase your account security with two-factor authentication
                        </p>
                      </div>
                      <Switch id="enable-2fa" />
                    </div>
                  </div>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">Two-factor authentication is currently disabled</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Access Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-api">API Access</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable API access for your account
                        </p>
                      </div>
                      <Switch id="enable-api" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-webhooks">Webhook Access</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable webhook access for external integrations
                        </p>
                      </div>
                      <Switch id="enable-webhooks" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Session Management</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                          <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              <div>
                                <div className="font-medium">Current Session</div>
                                <div className="text-xs text-gray-500">Chrome on Mac OS</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">192.168.1.1</td>
                          <td className="py-3 px-4 text-sm text-gray-500">Now</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" disabled>Current</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">iPhone</div>
                              <div className="text-xs text-gray-500">Safari on iOS</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">187.152.4.12</td>
                          <td className="py-3 px-4 text-sm text-gray-500">Yesterday</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">Revoke</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  Sign Out All Devices
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-3 px-4">
                            <div className="font-medium">Login successful</div>
                          </td>
                          <td className="py-3 px-4 text-sm">192.168.1.1</td>
                          <td className="py-3 px-4 text-sm text-gray-500">May 22, 2025, 10:30 AM</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <div className="font-medium">Password changed</div>
                          </td>
                          <td className="py-3 px-4 text-sm">192.168.1.1</td>
                          <td className="py-3 px-4 text-sm text-gray-500">May 15, 2025, 2:45 PM</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <div className="font-medium">Login successful</div>
                          </td>
                          <td className="py-3 px-4 text-sm">187.152.4.12</td>
                          <td className="py-3 px-4 text-sm text-gray-500">May 14, 2025, 8:22 AM</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <div className="font-medium">Profile updated</div>
                          </td>
                          <td className="py-3 px-4 text-sm">192.168.1.1</td>
                          <td className="py-3 px-4 text-sm text-gray-500">May 10, 2025, 4:12 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full Activity Log</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboardProfile;
