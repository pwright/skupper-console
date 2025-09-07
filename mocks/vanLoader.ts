// Import all VAN files statically but in a way that's easy to extend
import vanData from './data/VAN.json';
import van2Data from './VAN2/VAN.json';
import van3Data from './VAN3/VAN.json';
import { VanResponse } from '../src/types/REST.interfaces';

// This function returns all VAN data from all known VAN files
// To add a new VAN file, just import it above and add it to the array
export const loadAllVanData = (): VanResponse[] => {
  const allVanData: VanResponse[] = [];

  // Add all VAN files here - just add new imports and push to this array
  const vanFiles = [vanData, van2Data, van3Data];

  vanFiles.forEach((vanFile) => {
    if (vanFile && vanFile.results && Array.isArray(vanFile.results)) {
      allVanData.push(...vanFile.results);
    }
  });

  return allVanData;
};
