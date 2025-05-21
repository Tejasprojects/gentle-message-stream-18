
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

type UserData = {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  profile_picture?: string;
  created_at?: string;
};

const Everyone = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<UserData>>({});
  const { toast } = useToast();

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // First get auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError;
      }

      // Then get profiles data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*');

      if (profileError) {
        throw profileError;
      }

      // Merge auth and profile data
      const mergedUsers = profileData.map((profile) => {
        return {
          id: profile.id,
          email: profile.email || "No email",
          full_name: profile.full_name,
          role: profile.role,
          profile_picture: profile.profile_picture,
          created_at: profile.created_at
        };
      });

      setUsers(mergedUsers);
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

  const handleEditUser = (user: UserData) => {
    setCurrentUser(user);
    setEditFormData({
      email: user.email,
      full_name: user.full_name,
      role: user.role
    });
    setShowEditDialog(true);
  };

  const handleDeleteUser = (user: UserData) => {
    setCurrentUser(user);
    setShowDeleteDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async () => {
    if (!currentUser) return;

    try {
      // Update profile data
      const { error } = await supabase
        .from('profiles')
        .update({
          email: editFormData.email,
          full_name: editFormData.full_name,
          role: editFormData.role
        })
        .eq('id', currentUser.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User updated successfully",
      });

      // Refresh users list
      fetchUsers();
      setShowEditDialog(false);
    } catch (err: any) {
      console.error("Error updating user:", err);
      toast({
        title: "Error",
        description: `Failed to update user: ${err.message}`,
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (!currentUser) return;

    try {
      // First try to delete from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(
        currentUser.id
      );

      if (authError) {
        // If auth deletion fails, try to delete just the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', currentUser.id);
        
        if (profileError) throw profileError;
      }

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      // Refresh users list
      fetchUsers();
      setShowDeleteDialog(false);
    } catch (err: any) {
      console.error("Error deleting user:", err);
      toast({
        title: "Error",
        description: `Failed to delete user: ${err.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
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
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-b-transparent border-modern-blue-500"></div>
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
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

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                value={editFormData.email || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                name="full_name"
                value={editFormData.full_name || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input
                name="role"
                value={editFormData.role || ""}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="student, organization, or admin"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the user{" "}
            <span className="font-semibold">
              {currentUser?.full_name || currentUser?.email}
            </span>
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Everyone;
