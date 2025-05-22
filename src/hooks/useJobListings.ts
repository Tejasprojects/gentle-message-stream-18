
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { JobListing } from '@/types/database';
import { useToast } from '@/components/ui/use-toast';

export const useJobListings = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJobListings = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true)
        .order('posted_date', { ascending: false });

      if (error) {
        console.error('Error fetching job listings:', error);
        toast({
          title: 'Error fetching job listings',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setJobListings(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, []);

  return { jobListings, loading, refetch: fetchJobListings };
};
