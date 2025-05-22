
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Building, Check, ChevronsUpDown, Cloud, CreditCard, Mail, MapPin, Moon, Phone, Plus, Save, Shield, Sun, Trash, Upload, User, Users, Wifi } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HRDashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("company");
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="ai">AI Config</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Logo */}
                <div className="flex flex-col space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">
                        {user?.name?.charAt(0) || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload New Logo
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        Recommended size: 200x200px, max 1MB
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input id="company-website" defaultValue="https://acmecorp.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-industry">Industry</Label>
                    <Select defaultValue="tech">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">1-50 employees</SelectItem>
                        <SelectItem value="medium">51-200 employees</SelectItem>
                        <SelectItem value="large">201-500 employees</SelectItem>
                        <SelectItem value="xlarge">501-1000 employees</SelectItem>
                        <SelectItem value="enterprise">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" defaultValue="hr@acmecorp.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea id="company-address" defaultValue="123 Main Street, Suite 456, San Francisco, CA 94105" />
                </div>
                
                {/* Company Description */}
                <div className="space-y-2">
                  <Label htmlFor="company-description">Company Description</Label>
                  <Textarea 
                    id="company-description" 
                    defaultValue="Acme Corporation is a leading technology company specializing in innovative solutions for businesses of all sizes. Founded in 2010, we have grown to become a trusted partner for digital transformation initiatives around the world."
                    rows={5}
                  />
                </div>
                
                {/* Company Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-create-profiles">Auto-create candidate profiles</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically create profiles for new applications
                        </p>
                      </div>
                      <Switch id="auto-create-profiles" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="application-notifications">Application notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications for new applications
                        </p>
                      </div>
                      <Switch id="application-notifications" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark mode</Label>
                        <p className="text-xs text-muted-foreground">
                          Use dark theme for the dashboard
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-gray-500" />
                        <Switch id="dark-mode" />
                        <Moon className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>Customize the appearance of your career portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" id="primary-color" defaultValue="#3b82f6" className="w-12 p-1 h-9" />
                      <Input defaultValue="#3b82f6" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" id="secondary-color" defaultValue="#10b981" className="w-12 p-1 h-9" />
                      <Input defaultValue="#10b981" className="flex-1" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-font">Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Career Page Header Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Drag and drop an image or click to browse</p>
                      <p className="text-xs text-muted-foreground">Recommended size: 1600x400px, max 2MB</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="use-custom-domain">Use Custom Domain</Label>
                      <p className="text-xs text-muted-foreground">
                        Host your career portal on your own domain
                      </p>
                    </div>
                    <Switch id="use-custom-domain" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-domain">Custom Domain</Label>
                  <div className="flex gap-2">
                    <Input id="custom-domain" placeholder="careers.yourdomain.com" disabled />
                    <Button variant="outline" disabled>Verify</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enable the custom domain option to configure this setting
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mr-2 gap-2">
                  <Save className="h-4 w-4" />
                  Save Branding
                </Button>
                <Button variant="outline">Preview</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage users and permissions</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">John Doe</div>
                              <div className="text-xs text-gray-500">john@acmecorp.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">Admin</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Active</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          Just now
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Jane Smith</div>
                              <div className="text-xs text-gray-500">jane@acmecorp.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-700">Recruiter</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Active</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          2 hours ago
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>RB</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Robert Brown</div>
                              <div className="text-xs text-gray-500">robert@acmecorp.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700">Hiring Manager</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                            <span>Away</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          2 days ago
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Configure access levels for different user roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Admin</h3>
                          <p className="text-sm text-gray-500">Full access to all features</p>
                        </div>
                        <Button variant="outline" size="sm">Edit Role</Button>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Job Management</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Create & edit jobs</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Delete jobs</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Manage job approvals</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Candidate Management</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>View all candidates</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Move candidates</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Reject candidates</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">System Settings</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Manage users</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Configure system</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Access reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Recruiter</h3>
                          <p className="text-sm text-gray-500">Manage candidates and interviews</p>
                        </div>
                        <Button variant="outline" size="sm">Edit Role</Button>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Similar permission structure for recruiters */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Job Management</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Create & edit jobs</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>View jobs</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Check className="h-4 w-4 text-gray-400" />
                          <span>Manage job approvals</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Candidate Management</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>View all candidates</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Move candidates</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Schedule interviews</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">System Settings</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Check className="h-4 w-4 text-gray-400" />
                          <span>Manage users</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Check className="h-4 w-4 text-gray-400" />
                          <span>Configure system</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Access reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Role
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Applications</CardTitle>
                <CardDescription>Manage integrations with other services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* ATS Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Applicant Tracking System</h3>
                          <p className="text-sm text-gray-500">Connect with your existing ATS</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">G</div>
                          <span className="text-sm">Greenhouse</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">L</div>
                          <span className="text-sm">Lever</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">W</div>
                          <span className="text-sm">Workday</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Calendar Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-md">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Calendar Integration</h3>
                          <p className="text-sm text-gray-500">Connect with your calendar for interview scheduling</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                          <span className="text-xs text-gray-500">Connected</span>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="border border-green-200 bg-green-50 rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-green-100 rounded-md mr-2 flex items-center justify-center text-green-600">G</div>
                          <span className="text-sm">Google Calendar</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-green-600">Connected</Button>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">O</div>
                          <span className="text-sm">Outlook</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">Z</div>
                          <span className="text-sm">Zoom</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-md">
                          <Mail className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Integration</h3>
                          <p className="text-sm text-gray-500">Send emails from the platform</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">G</div>
                          <span className="text-sm">Gmail</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">O</div>
                          <span className="text-sm">Outlook</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                      <div className="border rounded-md p-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md mr-2 flex items-center justify-center">S</div>
                          <span className="text-sm">SMTP</span>
                        </div>
                        <Button variant="ghost" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* More Integrations */}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Browse More Integrations
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage API keys and webhooks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" value="api_key_12345abcdef6789ghijklmno" readOnly className="flex-1" />
                      <Button variant="outline">Reveal</Button>
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use this key to authenticate API requests from your applications
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Webhooks</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Webhook
                      </Button>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-2 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="border-b">
                            <td className="py-2 px-4 text-sm">application.created</td>
                            <td className="py-2 px-4 text-sm text-gray-500">https://example.com/webhook/applications</td>
                            <td className="py-2 px-4">
                              <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                                <span className="text-xs">Active</span>
                              </div>
                            </td>
                            <td className="py-2 px-4 text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 text-sm">interview.scheduled</td>
                            <td className="py-2 px-4 text-sm text-gray-500">https://example.com/webhook/interviews</td>
                            <td className="py-2 px-4">
                              <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                                <span className="text-xs">Active</span>
                              </div>
                            </td>
                            <td className="py-2 px-4 text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>Configure and optimize AI agent behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">AI Processing Mode</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="balanced" name="processing-mode" defaultChecked />
                        <Label htmlFor="balanced">Balanced</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="accuracy" name="processing-mode" />
                        <Label htmlFor="accuracy">Accuracy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="speed" name="processing-mode" />
                        <Label htmlFor="speed">Speed</Label>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Balance between processing speed and accuracy for AI operations
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="matching-threshold">Candidate Matching Threshold</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="range" 
                          id="matching-threshold" 
                          min="50" 
                          max="100" 
                          defaultValue="75" 
                          className="flex-1"
                        />
                        <Input className="w-16" defaultValue="75%" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Minimum match percentage for candidate recommendations
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resume-parsing-depth">Resume Parsing Depth</Label>
                      <Select defaultValue="comprehensive">
                        <SelectTrigger>
                          <SelectValue placeholder="Select parsing depth" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (Fast)</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          <SelectItem value="deep">Deep Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        How thoroughly the AI parses resume content
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Active AI Agents</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                            <CpuIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium">JD Analyzer</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-1.5 rounded-md mr-2">
                            <CpuIcon className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium">Resume Decoder</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-1.5 rounded-md mr-2">
                            <CpuIcon className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">MatchMaker</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="bg-yellow-100 p-1.5 rounded-md mr-2">
                            <CpuIcon className="h-4 w-4 text-yellow-600" />
                          </div>
                          <span className="text-sm font-medium">Skills Assessment</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="bg-red-100 p-1.5 rounded-md mr-2">
                            <CpuIcon className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="text-sm font-medium">Technical Interview</span>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <div className="bg-cyan-100 p-1.5 rounded-md mr-2">
                            <CpuIcon className="h-4 w-4 text-cyan-600" />
                          </div>
                          <span className="text-sm font-medium">Skill Trends</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Language Models</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-model">Primary Language Model</Label>
                        <Select defaultValue="gpt4">
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt4">GPT-4 (Recommended)</SelectItem>
                            <SelectItem value="gpt3">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude">Claude 2</SelectItem>
                            <SelectItem value="llama">Llama 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fallback-model">Fallback Model</Label>
                        <Select defaultValue="gpt3">
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt4">GPT-4</SelectItem>
                            <SelectItem value="gpt3">GPT-3.5 Turbo (Recommended)</SelectItem>
                            <SelectItem value="claude">Claude 2</SelectItem>
                            <SelectItem value="llama">Llama 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Advanced Options</h3>
                        <p className="text-xs text-muted-foreground">
                          Fine-tune AI behavior for special use cases
                        </p>
                      </div>
                      <Button variant="outline">Advanced Settings</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save AI Configuration
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Training Data</CardTitle>
                <CardDescription>Manage training data for AI models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">Custom Training Data</h3>
                      <p className="text-xs text-muted-foreground">Files used to train AI for your organization</p>
                    </div>
                    <Button>
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Data
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                          <th className="py-2 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-4 text-sm">company_handbook.pdf</td>
                          <td className="py-2 px-4 text-sm">PDF</td>
                          <td className="py-2 px-4 text-sm">2.4 MB</td>
                          <td className="py-2 px-4 text-sm text-gray-500">1 day ago</td>
                          <td className="py-2 px-4 text-right">
                            <Button variant="ghost" size="sm">Remove</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-sm">job_descriptions.csv</td>
                          <td className="py-2 px-4 text-sm">CSV</td>
                          <td className="py-2 px-4 text-sm">1.1 MB</td>
                          <td className="py-2 px-4 text-sm text-gray-500">3 days ago</td>
                          <td className="py-2 px-4 text-right">
                            <Button variant="ghost" size="sm">Remove</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-sm">interview_transcripts.zip</td>
                          <td className="py-2 px-4 text-sm">ZIP</td>
                          <td className="py-2 px-4 text-sm">18.7 MB</td>
                          <td className="py-2 px-4 text-sm text-gray-500">1 week ago</td>
                          <td className="py-2 px-4 text-right">
                            <Button variant="ghost" size="sm">Remove</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="use-industry-data">Use Industry Data</Label>
                      <Switch id="use-industry-data" defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Include pre-trained data for your industry to improve AI performance
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Model Training Status</Label>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Last Trained: 3 days ago</span>
                        <Button variant="outline" size="sm">Train Now</Button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure email notification preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Applications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="new-application">New application received</Label>
                          <p className="text-xs text-muted-foreground">
                            When a new candidate applies to a job
                          </p>
                        </div>
                        <Switch id="new-application" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="application-volume">High application volume</Label>
                          <p className="text-xs text-muted-foreground">
                            When a job receives more than 20 applications in 24 hours
                          </p>
                        </div>
                        <Switch id="application-volume" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Interviews</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="interview-scheduled">Interview scheduled</Label>
                          <p className="text-xs text-muted-foreground">
                            When an interview is scheduled with a candidate
                          </p>
                        </div>
                        <Switch id="interview-scheduled" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="interview-reminder">Interview reminder</Label>
                          <p className="text-xs text-muted-foreground">
                            1 hour before scheduled interview
                          </p>
                        </div>
                        <Switch id="interview-reminder" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="feedback-reminder">Feedback reminder</Label>
                          <p className="text-xs text-muted-foreground">
                            24 hours after interview if no feedback submitted
                          </p>
                        </div>
                        <Switch id="feedback-reminder" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">AI Agents</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-processing-complete">Processing complete</Label>
                          <p className="text-xs text-muted-foreground">
                            When AI completes processing tasks (resume analysis, etc.)
                          </p>
                        </div>
                        <Switch id="ai-processing-complete" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-errors">Processing errors</Label>
                          <p className="text-xs text-muted-foreground">
                            When AI encounters errors during processing
                          </p>
                        </div>
                        <Switch id="ai-errors" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">System</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-updates">System updates</Label>
                          <p className="text-xs text-muted-foreground">
                            Information about new features and system updates
                          </p>
                        </div>
                        <Switch id="system-updates" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">Marketing emails</Label>
                          <p className="text-xs text-muted-foreground">
                            Tips, best practices, and promotional content
                          </p>
                        </div>
                        <Switch id="marketing-emails" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>Configure in-app notification preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Desktop Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="desktop-notifications">Enable desktop notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Show browser notifications when important events occur
                        </p>
                      </div>
                      <Switch id="desktop-notifications" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Notification Types</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-applications">New applications</Label>
                          <p className="text-xs text-muted-foreground">
                            Show notifications for new applications
                          </p>
                        </div>
                        <Switch id="notify-applications" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-interviews">Interviews</Label>
                          <p className="text-xs text-muted-foreground">
                            Show notifications for upcoming interviews
                          </p>
                        </div>
                        <Switch id="notify-interviews" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-messages">New messages</Label>
                          <p className="text-xs text-muted-foreground">
                            Show notifications for new messages from team members
                          </p>
                        </div>
                        <Switch id="notify-messages" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-ai">AI agent activity</Label>
                          <p className="text-xs text-muted-foreground">
                            Show notifications for AI agent activities
                          </p>
                        </div>
                        <Switch id="notify-ai" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sound Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sound-notifications">Enable sound notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Play sound when notifications appear
                        </p>
                      </div>
                      <Switch id="sound-notifications" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notification-urgency">Notification Urgency</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Only critical notifications</SelectItem>
                        <SelectItem value="medium">Medium - Important notifications only</SelectItem>
                        <SelectItem value="high">High - All notifications</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Set the threshold for which notifications to show
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboardSettings;
