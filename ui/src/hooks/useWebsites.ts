import { useState, useEffect } from 'react';
import  { IWebsiteDto }  from './../types/websiteDto'
import api from '../api/api';

const useWebsites = () => {
  const [websites, setWebsites] = useState<IWebsiteDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    try {
      const response = await api.get<IWebsiteDto[]>('/', {
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