
import React, { useCallback } from 'react';
import { Upload, Download, FileText, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileSection } from '../ProfileSection';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { ResumeFile } from '@/types/profile';
import { format } from 'date-fns';

interface ResumeSectionProps {
  resumeFiles: ResumeFile[];
  isOwner: boolean;
  onUpload: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  resumeFiles,
  isOwner,
  onUpload
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user?.id) return;

    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('resume_files')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: fileName,
          file_type: file.type,
          file_size: file.size,
          is_primary: resumeFiles.length === 0
        });

      if (dbError) throw dbError;

      toast({
        title: 'Resume uploaded',
        description: 'Your resume has been successfully uploaded.',
      });

      onUpload();
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: 'Upload failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  }, [user?.id, resumeFiles.length, onUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const setPrimaryResume = async (resumeId: string) => {
    if (!user?.id) return;

    try {
      // First, unset all primary flags
      await supabase
        .from('resume_files')
        .update({ is_primary: false })
        .eq('user_id', user.id);

      // Then set the selected one as primary
      await supabase
        .from('resume_files')
        .update({ is_primary: true })
        .eq('id', resumeId);

      toast({
        title: 'Primary resume updated',
        description: 'This resume is now set as your primary resume.',
      });

      onUpload();
    } catch (error) {
      console.error('Error setting primary resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to update primary resume.',
        variant: 'destructive',
      });
    }
  };

  const deleteResume = async (resumeId: string, filePath: string) => {
    if (!user?.id) return;

    try {
      // Delete from storage
      await supabase.storage
        .from('profile-assets')
        .remove([filePath]);

      // Delete from database
      await supabase
        .from('resume_files')
        .delete()
        .eq('id', resumeId);

      toast({
        title: 'Resume deleted',
        description: 'Your resume has been successfully deleted.',
      });

      onUpload();
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete resume.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ProfileSection
      title="Resume Files"
      isOwner={isOwner}
    >
      {isOwner && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-6 ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop your resume here...'
              : 'Drag & drop your resume, or click to select'
            }
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supports PDF, DOC, DOCX files (Max 10MB)
          </p>
        </div>
      )}

      {resumeFiles.length > 0 ? (
        <div className="space-y-3">
          {resumeFiles.map((resume) => (
            <div key={resume.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{resume.file_name}</span>
                    {resume.is_primary && (
                      <Badge variant="default" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Primary
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {resume.file_size && formatFileSize(resume.file_size)} • 
                    Uploaded {format(new Date(resume.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                {isOwner && !resume.is_primary && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPrimaryResume(resume.id)}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Set Primary
                  </Button>
                )}
                {isOwner && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteResume(resume.id, resume.file_path)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center py-8">
          {isOwner 
            ? "Upload your resume files to share with potential employers."
            : "No resume files available."
          }
        </p>
      )}
    </ProfileSection>
  );
};
