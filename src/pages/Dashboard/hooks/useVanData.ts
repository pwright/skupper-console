import { useState, useEffect } from 'react';

import { RESTApi } from '../../../API/REST.resources';
import { VanResponse } from '../../../types/REST.interfaces';

export const useVanData = () => {
  const [vanData, setVanData] = useState<VanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVanData = async () => {
      try {
        setLoading(true);
        const response = await RESTApi.fetchVan();
        setVanData(response.results);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch VAN data');
      } finally {
        setLoading(false);
      }
    };

    fetchVanData();
  }, []);

  return { vanData, loading, error };
};
