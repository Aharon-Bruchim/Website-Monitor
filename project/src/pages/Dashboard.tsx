import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Website } from '../types';
import { AddWebsiteForm } from '../components/AddWebsiteForm';
import { WebsiteList } from '../components/WebsiteList';

export function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([]);

  const fetchWebsites = async () => {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching websites:', error);
      return;
    }

    setWebsites(data || []);
  };

  useEffect(() => {
    fetchWebsites();

    const subscription = supabase
      .channel('websites')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'websites' }, () => {
        fetchWebsites();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Activity size={32} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <AddWebsiteForm onWebsiteAdded={fetchWebsites} />
      <WebsiteList 
        websites={websites}
        onWebsiteDeleted={fetchWebsites}
      />
    </div>
  );
}