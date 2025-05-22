
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { JobApplication } from '@/types/database';
import { useToast } from '@/components/ui/use-toast';

export const useApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchApplications = async () => {
    try {
      setLoading(true);

      if (!user) {
        setApplications([]);
        return;
      }

      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('date_applied', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: 'Error fetching applications',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setApplications(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  return { 
    applications, 
    loading,
    refetch: fetchApplications,
    applicationCount: applications.length 
  };
};
