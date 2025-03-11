import { useState, useEffect } from 'react';
import { Website } from '../types';
import api from '../api/api';

const useWebsites = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    try {
      const response = await api.get<Website[]>('/', {
        params: { limit: 5, order: 'desc' }
      });
      setWebsites(response.data);
    } catch (err) {
      setError('Error fetching websites');
      console.error('Error fetching websites:', err);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return { websites, error, fetchWebsites };
};

export default useWebsites;