import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { VanResponse } from '../types/REST.interfaces';
import { RESTApi } from '../API/REST.resources';

interface VanSelectionContextType {
  selectedVan: VanResponse | null;
  setSelectedVan: (van: VanResponse | null) => void;
  availableVans: VanResponse[];
  setAvailableVans: (vans: VanResponse[]) => void;
  isVanSelected: boolean;
}

const VanSelectionContext = createContext<VanSelectionContextType | undefined>(undefined);

export const useVanSelection = () => {
  const context = useContext(VanSelectionContext);
  if (context === undefined) {
    throw new Error('useVanSelection must be used within a VanSelectionProvider');
  }
  return context;
};

interface VanSelectionProviderProps {
  children: ReactNode;
}

export const VanSelectionProvider: React.FC<VanSelectionProviderProps> = ({ children }) => {
  const [selectedVan, setSelectedVanState] = useState<VanResponse | null>(null);
  const [availableVans, setAvailableVans] = useState<VanResponse[]>([]);

  const setSelectedVan = useCallback(async (van: VanResponse | null) => {
    setSelectedVanState(van);
    
    // Update the mock server with the selected VAN
    if (van) {
      try {
        console.log(`Setting current VAN to: ${van.vanName}`);
        await RESTApi.setCurrentVan(van.vanName);
        console.log(`Successfully set current VAN to: ${van.vanName}`);
      } catch (error) {
        console.error('Failed to set current VAN in mock server:', error);
        // Don't prevent the UI from updating even if the API call fails
      }
    }
  }, []);

  const isVanSelected = !!selectedVan;

  return (
    <VanSelectionContext.Provider
      value={{
        selectedVan,
        setSelectedVan,
        availableVans,
        setAvailableVans,
        isVanSelected
      }}
    >
      {children}
    </VanSelectionContext.Provider>
  );
};
