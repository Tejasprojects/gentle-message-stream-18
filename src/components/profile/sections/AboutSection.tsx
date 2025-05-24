
import React from 'react';
import { ProfileSection } from '../ProfileSection';

interface AboutSectionProps {
  about?: string;
  isOwner: boolean;
  onEdit: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  isOwner,
  onEdit
}) => {
  return (
    <ProfileSection
      title="About"
      isOwner={isOwner}
      onEdit={onEdit}
    >
      <div className="prose max-w-none">
        {about ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {about}
          </p>
        ) : (
          <p className="text-gray-500 italic">
            {isOwner 
              ? "Add a professional summary to help others understand your background and expertise."
              : "No summary provided."
            }
          </p>
        )}
      </div>
    </ProfileSection>
  );
};
