
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Eye, Trash, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import PublicNavbar from "@/components/layout/PublicNavbar";

type UserData = {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  profile_picture?: string;
  created_at?: string;
};

const Everyone = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const { toast } = useToast();

  // Only admins can see edit and delete controls
  const isAdmin = user?.role === 'admin';

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get profiles data - we don't use auth.admin.listUsers() as it requires service role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*');

      if (profileError) {
        throw profileError;
      }

      // Map profile data to user format
      const mappedUsers = profileData.map((profile) => {
        return {
          id: profile.id,
          email: profile.email || "No email",
          full_name: profile.full_name,
          role: profile.role,
          profile_picture: profile.profile_picture,
          created_at: profile.created_at
        };
      });

      setUsers(mappedUsers);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
      toast({
        title: "Error",
        description: `Failed to fetch users: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewUser = (user: UserData) => {
    setCurrentUser(user);
    setShowViewDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <div className="container mx-auto py-8 flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">All Users</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => fetchUsers()}
              disabled={loading}
            >
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-b-transparent border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
                <Button 
                  variant="outline" 
                  onClick={() => fetchUsers()} 
                  className="mt-4"
                >
                  Retry
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              {user.profile_picture ? (
                                <AvatarImage src={user.profile_picture} alt={user.full_name || "User"} />
                              ) : null}
                              <AvatarFallback>
                                {user.full_name
                                  ? user.full_name.substring(0, 2).toUpperCase()
                                  : user.email.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.full_name || "N/A"}</p>
                              <p className="text-xs text-gray-500">{user.id.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : user.role === 'organization' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role || "student"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.created_at 
                            ? new Date(user.created_at).toLocaleString() 
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View User Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20">
                  {currentUser.profile_picture ? (
                    <AvatarImage src={currentUser.profile_picture} alt={currentUser.full_name || "User"} />
                  ) : null}
                  <AvatarFallback className="text-lg">
                    {currentUser.full_name
                      ? currentUser.full_name.substring(0, 2).toUpperCase()
                      : currentUser.email.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">ID:</div>
                <div>{currentUser.id}</div>
                <div className="font-semibold">Name:</div>
                <div>{currentUser.full_name || "N/A"}</div>
                <div className="font-semibold">Email:</div>
                <div>{currentUser.email}</div>
                <div className="font-semibold">Role:</div>
                <div>{currentUser.role || "student"}</div>
                <div className="font-semibold">Created At:</div>
                <div>
                  {currentUser.created_at 
                    ? new Date(currentUser.created_at).toLocaleString() 
                    : "N/A"}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Everyone;
