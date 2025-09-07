import { useMemo } from 'react';
import { useVanSelection } from '../contexts/VanSelectionContext';

// This hook provides VAN-filtered data based on the selected VAN
// For now, we'll return all data since the mock data doesn't have VAN-specific filtering
// In a real implementation, this would filter data based on the selected VAN's identity
export const useVanFilteredData = () => {
  const { selectedVan } = useVanSelection();

  const vanFilter = useMemo(() => {
    if (!selectedVan) {
      return null;
    }
    
    // In a real implementation, you would filter by VAN-specific criteria
    // For now, we'll use the VAN identity as a filter
    return {
      vanId: selectedVan.identity,
      vanName: selectedVan.vanName
    };
  }, [selectedVan]);

  return {
    vanFilter,
    selectedVan,
    isVanSelected: !!selectedVan
  };
};
