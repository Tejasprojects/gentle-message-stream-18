
import React from 'react';
import { Building, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfileSection } from '../ProfileSection';
import type { Experience } from '@/types/profile';
import { format } from 'date-fns';

interface ExperienceSectionProps {
  experiences: Experience[];
  isOwner: boolean;
  onAdd: () => void;
  onEdit: (experience: Experience) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  isOwner,
  onAdd,
  onEdit
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <ProfileSection
      title="Experience"
      isOwner={isOwner}
      onAdd={onAdd}
    >
      {experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="border-l-2 border-blue-200 pl-6 relative">
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-2"></div>
              
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {experience.job_title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{experience.company_name}</span>
                    {experience.employment_type && (
                      <Badge variant="secondary" className="text-xs">
                        {experience.employment_type}
                      </Badge>
                    )}
                  </div>
                </div>
                {isOwner && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(experience)}
                  >
                    Edit
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(experience.start_date)} - {' '}
                    {experience.is_current 
                      ? 'Present' 
                      : experience.end_date 
                        ? formatDate(experience.end_date)
                        : 'Present'
                    }
                  </span>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                    {experience.is_remote && (
                      <Badge variant="outline" className="text-xs ml-1">
                        Remote
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {experience.description && (
                <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                  {experience.description}
                </p>
              )}

              {experience.skills_used && experience.skills_used.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {experience.skills_used.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center py-8">
          {isOwner 
            ? "Add your work experience to showcase your professional journey."
            : "No experience added yet."
          }
        </p>
      )}
    </ProfileSection>
  );
};
