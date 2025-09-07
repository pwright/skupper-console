import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VanResponse } from '../types/REST.interfaces';

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
  const [selectedVan, setSelectedVan] = useState<VanResponse | null>(null);
  const [availableVans, setAvailableVans] = useState<VanResponse[]>([]);

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
