
import React from 'react';
import { FileText, Download, Eye, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileSection } from '../ProfileSection';
import type { ResumeFile, ProfileAnalytics } from '@/types/profile';

interface ResumeSectionProps {
  resumeFiles: ResumeFile[];
  analytics?: ProfileAnalytics | null;
  isOwner?: boolean;
  onUpload?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  resumeFiles,
  analytics,
  isOwner = false,
  onUpload
}) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Resume Files
          {isOwner && onUpload && (
            <Button onClick={onUpload} size="sm">
              Upload Resume
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {resumeFiles.length > 0 ? (
          <div className="space-y-4">
            {resumeFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{file.file_name}</h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(file.created_at)} • {formatFileSize(file.file_size)}
                      </p>
                    </div>
                  </div>
                  {file.is_primary && (
                    <Badge variant="secondary">Primary</Badge>
                  )}
                </div>

                {file.ats_score && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>ATS Score: {file.ats_score}/100</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  {file.download_count !== undefined && (
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {file.download_count} downloads
                    </span>
                  )}
                  {analytics && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      Profile views: {analytics.profile_views}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-8">
            No resume files available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
