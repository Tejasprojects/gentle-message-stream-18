
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Calendar, CpuIcon, Bell, Globe, Building, Users, Key, LockIcon, Smartphone, 
  Mail, MessageSquare, FileText, Fingerprint, Network, Share2, CloudLightning, 
  ShieldCheck, Eye, BellRing
} from "lucide-react";

const HRDashboardSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("company");

  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
            <p className="text-muted-foreground">Configure your HR dashboard and platform settings</p>
          </div>
          <Button onClick={handleSave}>Save All Changes</Button>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="border-b">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="company" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Company Profile
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                User Management
              </TabsTrigger>
              <TabsTrigger 
                value="integrations" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Integrations
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                AI Configuration
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Security
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Company Profile Tab */}
          <TabsContent value="company">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Update your company details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <input 
                          id="company-name" 
                          className="w-full p-2 border rounded-md" 
                          defaultValue="Mahayudh Technologies" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="flex">
                          <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 flex items-center text-gray-500">
                            <Globe className="h-4 w-4 mr-1" />
                          </span>
                          <input 
                            id="website" 
                            className="flex-grow p-2 border rounded-r-md" 
                            defaultValue="mahayudh.tech" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <select 
                          id="industry" 
                          className="w-full p-2 border rounded-md"
                        >
                          <option>Technology</option>
                          <option>Healthcare</option>
                          <option>Finance</option>
                          <option>Education</option>
                          <option>Manufacturing</option>
                          <option>Retail</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Company Size</Label>
                        <select 
                          id="size" 
                          className="w-full p-2 border rounded-md"
                        >
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>51-200</option>
                          <option>201-500</option>
                          <option>501-1000</option>
                          <option>1000+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Company Description</Label>
                      <textarea 
                        id="description" 
                        rows={4}
                        className="w-full p-2 border rounded-md" 
                        defaultValue="Mahayudh Technologies is a cutting-edge HR tech company specialized in AI-powered recruitment solutions for enterprises. Our platform leverages artificial intelligence to streamline the hiring process and match the right talent with the right opportunities." 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Headquarters</Label>
                        <div className="flex">
                          <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 flex items-center text-gray-500">
                            <Building className="h-4 w-4 mr-1" />
                          </span>
                          <input 
                            id="location" 
                            className="flex-grow p-2 border rounded-r-md" 
                            defaultValue="Bangalore, India" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="founded">Founded Year</Label>
                        <div className="flex">
                          <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                          </span>
                          <input 
                            id="founded" 
                            className="flex-grow p-2 border rounded-r-md" 
                            defaultValue="2020" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employees">Employees</Label>
                        <div className="flex">
                          <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 flex items-center text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                          </span>
                          <input 
                            id="employees" 
                            className="flex-grow p-2 border rounded-r-md" 
                            defaultValue="120" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="mr-2">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Corporate Branding</CardTitle>
                    <CardDescription>Customize the appearance of your HR dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Company Logo</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center border">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">M</span>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Upload New Logo</Button>
                          <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px, PNG or SVG</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Brand Colors</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                            <span className="text-sm">Primary</span>
                          </div>
                          <input type="color" className="w-full h-10 p-0 border-0" value="#3b82f6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                            <span className="text-sm">Secondary</span>
                          </div>
                          <input type="color" className="w-full h-10 p-0 border-0" value="#1f2937" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-green-600"></div>
                            <span className="text-sm">Success</span>
                          </div>
                          <input type="color" className="w-full h-10 p-0 border-0" value="#059669" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-red-600"></div>
                            <span className="text-sm">Error</span>
                          </div>
                          <input type="color" className="w-full h-10 p-0 border-0" value="#dc2626" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dashboard Theme</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500">
                          <div className="flex mb-2 justify-between">
                            <span className="text-sm font-medium">Light</span>
                            <span className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            </span>
                          </div>
                          <div className="w-full h-20 bg-white border rounded flex items-center justify-center">
                            <div className="w-1/4 h-full bg-gray-800"></div>
                            <div className="w-3/4 h-full bg-gray-100 p-2">
                              <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
                              <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500">
                          <div className="flex mb-2 justify-between">
                            <span className="text-sm font-medium">Dark</span>
                            <span className="w-4 h-4 border-2 border-gray-300 rounded-full"></span>
                          </div>
                          <div className="w-full h-20 bg-gray-900 border border-gray-700 rounded flex items-center justify-center">
                            <div className="w-1/4 h-full bg-gray-800"></div>
                            <div className="w-3/4 h-full bg-gray-700 p-2">
                              <div className="w-full h-3 bg-gray-600 rounded mb-2"></div>
                              <div className="w-1/2 h-3 bg-gray-600 rounded"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500">
                          <div className="flex mb-2 justify-between">
                            <span className="text-sm font-medium">System</span>
                            <span className="w-4 h-4 border-2 border-gray-300 rounded-full"></span>
                          </div>
                          <div className="w-full h-20 bg-gradient-to-r from-gray-900 to-white border rounded flex items-center justify-center">
                            <div className="w-1/4 h-full bg-gradient-to-r from-gray-800 to-gray-600"></div>
                            <div className="w-3/4 h-full bg-gradient-to-r from-gray-700 to-gray-100 p-2">
                              <div className="w-full h-3 bg-gradient-to-r from-gray-600 to-gray-300 rounded mb-2"></div>
                              <div className="w-1/2 h-3 bg-gradient-to-r from-gray-600 to-gray-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="mr-2">Reset to Default</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>See how your settings will appear</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border overflow-hidden">
                      <div className="bg-[#1f2937] text-white p-4 flex items-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                          Mahayudh
                        </span>
                        <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-sm font-medium ml-2">
                          HR
                        </span>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="w-full h-8 bg-gray-100 rounded mb-3"></div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="h-20 bg-blue-50 border border-blue-100 rounded p-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full mb-2"></div>
                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                          </div>
                          <div className="h-20 bg-green-50 border border-green-100 rounded p-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full mb-2"></div>
                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="w-full h-32 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">This is a simplified preview of how your dashboard will appear with the current settings.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* User Management Tab */}
          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage users and their access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between mb-4">
                        <div className="relative w-64">
                          <input 
                            type="search" 
                            placeholder="Search users..." 
                            className="w-full p-2 pl-8 border rounded-md" 
                          />
                          <div className="absolute left-2 top-2.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          </div>
                        </div>
                        <Button size="sm">
                          <Users className="mr-2 h-4 w-4" />
                          Add User
                        </Button>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {[
                              { name: 'Rahul Sharma', email: 'rahul@mahayudh.tech', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
                              { name: 'Priya Patel', email: 'priya@mahayudh.tech', role: 'HR Manager', status: 'Active', lastLogin: '1 day ago' },
                              { name: 'Amit Kumar', email: 'amit@mahayudh.tech', role: 'Recruiter', status: 'Inactive', lastLogin: '1 week ago' },
                              { name: 'Deepa Singh', email: 'deepa@mahayudh.tech', role: 'HR Assistant', status: 'Active', lastLogin: '3 hours ago' },
                            ].map((user, i) => (
                              <tr key={i}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                      <span className="text-gray-600">{user.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                      <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">{user.role}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.lastLogin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Roles & Permissions</CardTitle>
                    <CardDescription>Configure access controls</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Admin', desc: 'Full access to all features', color: 'bg-purple-100 text-purple-800' },
                        { name: 'HR Manager', desc: 'Manage all HR functions', color: 'bg-blue-100 text-blue-800' },
                        { name: 'Recruiter', desc: 'Manage jobs and candidates', color: 'bg-green-100 text-green-800' },
                        { name: 'HR Assistant', desc: 'View-only access to data', color: 'bg-yellow-100 text-yellow-800' },
                      ].map((role, i) => (
                        <div key={i} className="p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${role.color}`}>{role.name}</span>
                              <p className="text-sm text-gray-600 mt-1">{role.desc}</p>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full mt-2">
                        <Key className="mr-2 h-4 w-4" />
                        Create New Role
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>SSO Configuration</CardTitle>
                    <CardDescription>Set up Single Sign-On</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <LockIcon className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">SSO Authentication</p>
                            <p className="text-xs text-gray-500">Enable Single Sign-On</p>
                          </div>
                        </div>
                        <Switch id="sso" />
                      </div>
                      
                      <div className="pt-2">
                        <Label>Provider</Label>
                        <select className="w-full p-2 border rounded-md mt-1">
                          <option>Google Workspace</option>
                          <option>Microsoft Azure AD</option>
                          <option>Okta</option>
                          <option>OneLogin</option>
                        </select>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Configure SSO Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Applications</CardTitle>
                    <CardDescription>Manage your integrated applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { name: 'Google Calendar', icon: Calendar, status: 'Connected', desc: 'Sync interview schedules with Google Calendar' },
                        { name: 'Microsoft Teams', icon: Smartphone, status: 'Connected', desc: 'Conduct virtual interviews through Teams' },
                        { name: 'Slack', icon: MessageSquare, status: 'Connected', desc: 'Receive notifications in your Slack channels' },
                        { name: 'Zoom', icon: Mail, status: 'Not Connected', desc: 'Host interviews and meetings on Zoom' },
                        { name: 'ATS System', icon: FileText, status: 'Connected', desc: 'Sync with your applicant tracking system' },
                      ].map((app, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <app.icon className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium">{app.name}</h3>
                              <p className="text-xs text-gray-500">{app.desc}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              app.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {app.status}
                            </span>
                            <Button variant="outline" size="sm">
                              {app.status === 'Connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>Manage API keys and access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-medium">Production API Key</h3>
                            <div className="flex items-center mt-1">
                              <input 
                                type="password" 
                                value="sk_prod_2023_mahayudh_********" 
                                disabled 
                                className="bg-gray-50 border rounded p-2 text-sm w-64" 
                              />
                              <Button variant="ghost" size="sm">Show</Button>
                              <Button variant="ghost" size="sm">Copy</Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Last used 2 hours ago</p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">Rotate Key</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-medium">Development API Key</h3>
                            <div className="flex items-center mt-1">
                              <input 
                                type="password" 
                                value="sk_dev_2023_mahayudh_********" 
                                disabled 
                                className="bg-gray-50 border rounded p-2 text-sm w-64" 
                              />
                              <Button variant="ghost" size="sm">Show</Button>
                              <Button variant="ghost" size="sm">Copy</Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Last used 1 day ago</p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">Rotate Key</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Fingerprint className="h-5 w-5 text-gray-500" />
                          <p className="text-sm text-gray-600">Keep your API keys secure. Do not share them in client-side code.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Available Integrations</CardTitle>
                    <CardDescription>Extend your HR platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Integration Categories</Label>
                        <Button variant="link" size="sm" className="text-xs">View All</Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: 'Communication', icon: MessageSquare, count: 8 },
                          { name: 'Calendar', icon: Calendar, count: 5 },
                          { name: 'ATS', icon: Briefcase, count: 12 },
                          { name: 'Analytics', icon: BarChartIcon, count: 7 },
                        ].map((cat, i) => (
                          <Button variant="outline" key={i} className="h-auto py-3 justify-start">
                            <div className="flex flex-col items-center text-center w-full">
                              <cat.icon className="h-5 w-5 mb-1" />
                              <span className="text-xs">{cat.name}</span>
                              <span className="text-xs text-gray-500 mt-1">{cat.count}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                      
                      <div className="pt-2">
                        <Label>Recommended</Label>
                        <div className="space-y-3 mt-2">
                          {[
                            { name: 'HubSpot', desc: 'CRM integration for candidate tracking' },
                            { name: 'Salesforce', desc: 'Enterprise CRM and analytics' },
                            { name: 'Workday', desc: 'HRIS system integration' },
                          ].map((rec, i) => (
                            <div key={i} className="p-3 border rounded-lg hover:bg-gray-50">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="text-sm font-medium">{rec.name}</h3>
                                  <p className="text-xs text-gray-500">{rec.desc}</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-8">Connect</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <Network className="mr-2 h-4 w-4" />
                        Browse Integration Marketplace
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>Set up event notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Enable Webhooks</p>
                          <p className="text-xs text-gray-500">Send events to your servers</p>
                        </div>
                        <Switch id="webhooks" defaultChecked />
                      </div>
                      
                      <div className="pt-2">
                        <Label className="mb-1 block">Endpoint URL</Label>
                        <div className="flex">
                          <input 
                            type="text" 
                            placeholder="https://your-server.com/webhook" 
                            className="flex-1 p-2 border rounded-l-md" 
                          />
                          <Button className="rounded-l-none">Verify</Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-1 block">Events to Send</Label>
                        <div className="space-y-2">
                          {[
                            'Candidate Applied', 'Interview Scheduled', 
                            'Offer Created', 'Candidate Hired'
                          ].map((event, i) => (
                            <div key={i} className="flex items-center">
                              <input type="checkbox" id={`event-${i}`} className="mr-2" defaultChecked />
                              <Label htmlFor={`event-${i}`} className="text-sm">{event}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* AI Configuration Tab */}
          <TabsContent value="ai">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Agent Configuration</CardTitle>
                    <CardDescription>Customize AI recruitment assistants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <Switch id="agent-1" defaultChecked />
                          </div>
                          <div className="flex items-start mb-4">
                            <div className="rounded-lg bg-blue-100 p-2 mr-3">
                              <CpuIcon className="h-5 w-5 text-blue-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">JD Analyzer</h3>
                              <p className="text-xs text-gray-500 mt-1">Extracts key requirements from job descriptions</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Accuracy Threshold</Label>
                              <div className="flex items-center mt-1">
                                <input type="range" min="0" max="100" defaultValue="85" className="w-full" />
                                <span className="ml-2 text-xs font-medium">85%</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Processing Mode</Label>
                              <select className="w-full p-2 border rounded-md text-sm mt-1">
                                <option>Comprehensive</option>
                                <option>Balanced</option>
                                <option>Fast</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <Switch id="agent-2" defaultChecked />
                          </div>
                          <div className="flex items-start mb-4">
                            <div className="rounded-lg bg-purple-100 p-2 mr-3">
                              <CpuIcon className="h-5 w-5 text-purple-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">Resume Decoder</h3>
                              <p className="text-xs text-gray-500 mt-1">Parses resumes and extracts candidate information</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Detail Level</Label>
                              <div className="flex items-center mt-1">
                                <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
                                <span className="ml-2 text-xs font-medium">75%</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">File Types</Label>
                              <div className="grid grid-cols-3 gap-1 mt-1">
                                <Button size="sm" variant="outline" className="w-full text-xs">PDF</Button>
                                <Button size="sm" variant="outline" className="w-full text-xs">DOCX</Button>
                                <Button size="sm" variant="outline" className="w-full text-xs">PNG</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <Switch id="agent-3" defaultChecked />
                          </div>
                          <div className="flex items-start mb-4">
                            <div className="rounded-lg bg-green-100 p-2 mr-3">
                              <CpuIcon className="h-5 w-5 text-green-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">MatchMaker</h3>
                              <p className="text-xs text-gray-500 mt-1">Matches candidates to job requirements</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Matching Algorithm</Label>
                              <select className="w-full p-2 border rounded-md text-sm mt-1">
                                <option>Semantic</option>
                                <option>Keyword</option>
                                <option>Hybrid</option>
                              </select>
                            </div>
                            <div>
                              <Label className="text-xs">Matching Threshold</Label>
                              <div className="flex items-center mt-1">
                                <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                                <span className="ml-2 text-xs font-medium">70%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <Switch id="agent-4" defaultChecked />
                          </div>
                          <div className="flex items-start mb-4">
                            <div className="rounded-lg bg-yellow-100 p-2 mr-3">
                              <CpuIcon className="h-5 w-5 text-yellow-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">Skills Assessment</h3>
                              <p className="text-xs text-gray-500 mt-1">Evaluates candidate skills and expertise</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Assessment Mode</Label>
                              <select className="w-full p-2 border rounded-md text-sm mt-1">
                                <option>Standard</option>
                                <option>Deep Analysis</option>
                                <option>Rapid</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input type="checkbox" id="skills-verify" className="mr-2" defaultChecked />
                                <Label htmlFor="skills-verify" className="text-xs">Verify Skills</Label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="skills-benchmark" className="mr-2" defaultChecked />
                                <Label htmlFor="skills-benchmark" className="text-xs">Industry Benchmark</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <Switch id="agent-5" defaultChecked />
                          </div>
                          <div className="flex items-start mb-4">
                            <div className="rounded-lg bg-red-100 p-2 mr-3">
                              <CpuIcon className="h-5 w-5 text-red-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">Technical Interview</h3>
                              <p className="text-xs text-gray-500 mt-1">Conducts automated technical screenings</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Difficulty Level</Label>
                              <div className="flex items-center mt-1">
                                <input type="range" min="0" max="100" defaultValue="60" className="w-full" />
                                <span className="ml-2 text-xs font-medium">Medium</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Question Types</Label>
                              <div className="grid grid-cols-3 gap-1 mt-1">
                                <Button size="sm" variant="outline" className="w-full text-xs">MCQ</Button>
                                <Button size="sm" variant="outline" className="w-full text-xs">Coding</Button>
                                <Button size="sm" variant="outline" className="w-full text-xs">Design</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 relative">
                          <div className="absolute top-3 right-3">
                            <Switch id="agent-6" />
                          </div>
                          <div className="flex items-start mb-4">
                            <div className="rounded-lg bg-gray-100 p-2 mr-3">
                              <CpuIcon className="h-5 w-5 text-gray-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">Orchestration</h3>
                              <p className="text-xs text-gray-500 mt-1">Coordinates AI agents and workflow</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs">Automation Level</Label>
                              <select className="w-full p-2 border rounded-md text-sm mt-1">
                                <option>Full Automation</option>
                                <option>Semi-Automated</option>
                                <option>Manual with Suggestions</option>
                              </select>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="human-review" className="mr-2" defaultChecked />
                              <Label htmlFor="human-review" className="text-xs">Require Human Review for Critical Decisions</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button variant="outline">Reset to Default</Button>
                      <Button onClick={handleSave}>Save Configuration</Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Model Settings</CardTitle>
                    <CardDescription>Configure AI language models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Primary AI Model</Label>
                        <select className="w-full p-2 border rounded-md mt-1">
                          <option>MahayudhGPT-4</option>
                          <option>OpenAI GPT-4</option>
                          <option>Claude 3 Opus</option>
                          <option>Gemini Pro</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Used for most AI operations</p>
                      </div>
                      
                      <div className="pt-2">
                        <Label>Model Parameters</Label>
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Temperature</span>
                            <div className="flex items-center">
                              <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-32 mr-2" />
                              <span className="text-xs font-mono">0.7</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Top P</span>
                            <div className="flex items-center">
                              <input type="range" min="0" max="1" step="0.1" defaultValue="0.9" className="w-32 mr-2" />
                              <span className="text-xs font-mono">0.9</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Max Tokens</span>
                            <input type="number" defaultValue="2048" className="w-24 p-1 border rounded text-xs" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Label>API Usage</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Monthly Usage</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">3.2M / 5M tokens used this month</p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex items-center justify-between">
                          <Label>Advanced Features</Label>
                          <Button variant="link" size="sm" className="text-xs">Configure</Button>
                        </div>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CloudLightning className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="text-sm">Semantic Search</span>
                            </div>
                            <Switch id="semantic" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Share2 className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="text-sm">Vector Embeddings</span>
                            </div>
                            <Switch id="embeddings" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <ShieldCheck className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="text-sm">AI Bias Detection</span>
                            </div>
                            <Switch id="bias" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Data Privacy</CardTitle>
                    <CardDescription>AI data handling settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Data Retention</p>
                          <p className="text-xs text-gray-500">How long AI keeps candidate data</p>
                        </div>
                        <select className="p-1 border rounded text-sm">
                          <option>30 days</option>
                          <option>90 days</option>
                          <option>1 year</option>
                          <option>Custom</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm">PII Detection</span>
                        </div>
                        <Switch id="pii" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Fingerprint className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm">Data Anonymization</span>
                        </div>
                        <Switch id="anon" defaultChecked />
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full">
                          Configure Data Processing Agreement
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage your notification settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">New Applications</p>
                              <p className="text-xs text-gray-500">Receive updates when candidates apply</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select className="p-1 border rounded text-xs">
                                <option>Immediately</option>
                                <option>Daily Digest</option>
                                <option>Weekly Digest</option>
                              </select>
                              <Switch id="email-applications" defaultChecked />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Interview Scheduling</p>
                              <p className="text-xs text-gray-500">Updates on interview schedules and changes</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select className="p-1 border rounded text-xs">
                                <option>Immediately</option>
                                <option>Daily Digest</option>
                              </select>
                              <Switch id="email-interviews" defaultChecked />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Job Status Changes</p>
                              <p className="text-xs text-gray-500">Updates when job posts change status</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select className="p-1 border rounded text-xs">
                                <option>Immediately</option>
                                <option>Daily Digest</option>
                              </select>
                              <Switch id="email-jobs" />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Reports & Analytics</p>
                              <p className="text-xs text-gray-500">Regular reports on recruitment metrics</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select className="p-1 border rounded text-xs">
                                <option>Weekly</option>
                                <option>Daily</option>
                                <option>Monthly</option>
                              </select>
                              <Switch id="email-reports" defaultChecked />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">System Alerts</p>
                              <p className="text-xs text-gray-500">Important system notifications</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select className="p-1 border rounded text-xs" disabled>
                                <option>Immediately</option>
                              </select>
                              <Switch id="email-alerts" defaultChecked disabled />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">In-App Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Dashboard Alerts</p>
                              <p className="text-xs text-gray-500">Show notifications on dashboard</p>
                            </div>
                            <Switch id="app-dashboard" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Real-time Updates</p>
                              <p className="text-xs text-gray-500">Immediate pop-up notifications</p>
                            </div>
                            <Switch id="app-realtime" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Sound Alerts</p>
                              <p className="text-xs text-gray-500">Play sound for important notifications</p>
                            </div>
                            <Switch id="app-sound" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Notification Templates</CardTitle>
                    <CardDescription>Customize notification messages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Select Template</Label>
                        <select className="p-2 border rounded text-sm">
                          <option>New Application</option>
                          <option>Interview Scheduled</option>
                          <option>Job Posting Expired</option>
                          <option>Candidate Status Change</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Subject Line</Label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          defaultValue="New Application: {{jobTitle}} - {{candidateName}}" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Message Template</Label>
                        <textarea 
                          rows={6}
                          className="w-full p-2 border rounded-md" 
                          defaultValue="Hello {{recipientName}},

A new application has been received for the {{jobTitle}} position.

Candidate: {{candidateName}}
Applied on: {{applicationDate}}
Match Score: {{matchScore}}

View the application in your dashboard: {{applicationLink}}"
                        />
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Available Variables</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'recipientName', 'jobTitle', 'candidateName', 'applicationDate',
                            'matchScore', 'applicationLink', 'companyName'
                          ].map((v, i) => (
                            <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                              {`{{${v}}}`}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" className="mr-2">Preview</Button>
                        <Button onClick={handleSave}>Save Template</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Global Settings</CardTitle>
                    <CardDescription>Control notification behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Quiet Hours</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div>
                            <Label className="text-xs text-gray-500">From</Label>
                            <input type="time" className="w-full p-2 border rounded-md" defaultValue="20:00" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">To</Label>
                            <input type="time" className="w-full p-2 border rounded-md" defaultValue="08:00" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Only urgent notifications will be sent during these hours</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Weekend Notifications</p>
                          <p className="text-xs text-gray-500">Send notifications on weekends</p>
                        </div>
                        <Switch id="weekend" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Vacation Mode</p>
                          <p className="text-xs text-gray-500">Pause all non-critical notifications</p>
                        </div>
                        <Switch id="vacation" />
                      </div>
                      
                      <div className="pt-2">
                        <Label>Notification Channels</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="channel-email" className="mr-2" defaultChecked />
                            <Label htmlFor="channel-email" className="text-sm">Email</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="channel-app" className="mr-2" defaultChecked />
                            <Label htmlFor="channel-app" className="text-sm">In-App</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="channel-sms" className="mr-2" />
                            <Label htmlFor="channel-sms" className="text-sm">SMS</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="channel-slack" className="mr-2" defaultChecked />
                            <Label htmlFor="channel-slack" className="text-sm">Slack</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Notification History</CardTitle>
                    <CardDescription>Recent notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: 'New application received', time: '2 hours ago', icon: BellRing },
                        { title: 'Interview scheduled', time: '1 day ago', icon: Calendar },
                        { title: 'Job post expired', time: '3 days ago', icon: Bell },
                      ].map((notif, i) => (
                        <div key={i} className="flex items-start p-3 border-b">
                          <div className="bg-gray-100 p-1 rounded-full mr-3">
                            <notif.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm">{notif.title}</p>
                            <p className="text-xs text-gray-500">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="link" size="sm" className="text-xs">View All Notifications</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Password Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Change Password</p>
                              <p className="text-xs text-gray-500">Update your account password</p>
                            </div>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Password Expiry</p>
                              <p className="text-xs text-gray-500">Force password reset periodically</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select className="p-1 border rounded text-xs">
                                <option>90 days</option>
                                <option>30 days</option>
                                <option>180 days</option>
                                <option>Never</option>
                              </select>
                              <Switch id="pwd-expiry" defaultChecked />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Password Requirements</p>
                              <p className="text-xs text-gray-500">Set minimum complexity standards</p>
                            </div>
                            <select className="p-1 border rounded text-sm">
                              <option>High (12+ chars, special chars)</option>
                              <option>Medium (10+ chars, mixed case)</option>
                              <option>Basic (8+ chars)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Two-Factor Authentication</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Enable 2FA</p>
                              <p className="text-xs text-gray-500">Add an extra layer of security</p>
                            </div>
                            <Switch id="2fa" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">2FA Method</p>
                              <p className="text-xs text-gray-500">Choose your verification method</p>
                            </div>
                            <select className="p-1 border rounded text-sm">
                              <option>Authenticator App</option>
                              <option>SMS</option>
                              <option>Email</option>
                            </select>
                          </div>
                          
                          <div className="flex justify-center p-4">
                            <Button variant="outline">Set Up Two-Factor Authentication</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Session Security</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Session Timeout</p>
                              <p className="text-xs text-gray-500">Automatically log out after inactivity</p>
                            </div>
                            <select className="p-1 border rounded text-sm">
                              <option>30 minutes</option>
                              <option>1 hour</option>
                              <option>2 hours</option>
                              <option>8 hours</option>
                              <option>24 hours</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Active Sessions</p>
                              <p className="text-xs text-gray-500">Manage your logged in devices</p>
                            </div>
                            <Button variant="outline" size="sm">View Sessions</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <p className="text-sm">Remember Me</p>
                              <p className="text-xs text-gray-500">Stay logged in on trusted devices</p>
                            </div>
                            <Switch id="remember-me" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Activity</CardTitle>
                    <CardDescription>Recent security events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-4">
                        {[
                          { action: 'Successful login', time: '2 hours ago', location: 'Bangalore, IN', device: 'Chrome / Windows' },
                          { action: 'Password changed', time: '3 days ago', location: 'Bangalore, IN', device: 'Firefox / MacOS' },
                          { action: 'Failed login attempt', time: '1 week ago', location: 'Unknown', device: 'Unknown' },
                        ].map((event, i) => (
                          <div key={i} className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{event.action}</span>
                              <span className="text-xs text-gray-500">{event.time}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex justify-between">
                              <span>{event.location}</span>
                              <span>{event.device}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="link" size="sm" className="text-xs">View Full Activity Log</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Security Recommendations</CardTitle>
                    <CardDescription>Enhance your account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                        <div className="flex">
                          <div className="mr-3">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-green-800">Strong password</h3>
                            <p className="text-xs text-green-700 mt-1">Your password meets security requirements</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                        <div className="flex">
                          <div className="mr-3">
                            <Bell className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-yellow-800">Enable two-factor authentication</h3>
                            <p className="text-xs text-yellow-700 mt-1">Add an extra layer of security to your account</p>
                            <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Enable 2FA</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex">
                          <div className="mr-3">
                            <Key className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Review permissions</h3>
                            <p className="text-xs text-gray-500 mt-1">Check integrations with access to your account</p>
                            <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Review</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboardSettings;
