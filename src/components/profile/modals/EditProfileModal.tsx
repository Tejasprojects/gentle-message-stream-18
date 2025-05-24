
import React, { useState } from 'react';
import { X, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/context/AuthContext';
import type { UserProfile } from '@/types/profile';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onUpdate: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdate
}) => {
  const { user } = useAuth();
  const { updateProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    professional_headline: profile?.professional_headline || '',
    location: profile?.location || '',
    website_url: profile?.website_url || '',
    about_summary: profile?.about_summary || '',
    phone: profile?.phone || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headline">Professional Headline</Label>
            <Input
              id="headline"
              value={formData.professional_headline}
              onChange={(e) => setFormData(prev => ({ ...prev, professional_headline: e.target.value }))}
              placeholder="Full Stack Developer | React Expert | Open Source Contributor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="San Francisco Bay Area"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              rows={6}
              value={formData.about_summary}
              onChange={(e) => setFormData(prev => ({ ...prev, about_summary: e.target.value }))}
              placeholder="Write a compelling professional summary that highlights your expertise, achievements, and career goals..."
              className="resize-none"
            />
            <div className="text-sm text-gray-500 text-right">
              {formData.about_summary.length}/2600
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
              <Save className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
