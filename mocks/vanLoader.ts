// Import vans.json configuration
import vansConfig from './vans.json';

// Import default data files
import defaultSitesData from './data/SITES.json';
import defaultComponentsData from './data/COMPONENTS.json';
import defaultComponentPairsData from './data/COMPONENT_PAIRS.json';
import defaultProcessesData from './data/PROCESSES.json';
import defaultSitePairsData from './data/SITE_PAIRS.json';
import defaultProcessPairsData from './data/PROCESS_PAIRS.json';
import defaultServicesData from './data/SERVICES.json';
import defaultTcpConnectionsData from './data/TCP_CONNECTIONS.json';
import defaultHttpRequestsData from './data/HTTP_REQUESTS.json';
import defaultLinksData from './data/LINKS.json';
import defaultListenersData from './data/LISTENERS.json';
import defaultConnectorsData from './data/CONNECTORS.json';

// Import VAN2 data files
import van2SitesData from './VAN2/SITES.json';
import van2ComponentsData from './VAN2/COMPONENTS.json';
import van2ComponentPairsData from './VAN2/COMPONENT_PAIRS.json';
import van2ProcessesData from './VAN2/PROCESSES.json';
import van2SitePairsData from './VAN2/SITE_PAIRS.json';
import van2ProcessPairsData from './VAN2/PROCESS_PAIRS.json';
import van2ServicesData from './VAN2/SERVICES.json';
import van2TcpConnectionsData from './VAN2/TCP_CONNECTIONS.json';
import van2HttpRequestsData from './VAN2/HTTP_REQUESTS.json';
import van2LinksData from './VAN2/LINKS.json';
import van2ListenersData from './VAN2/LISTENERS.json';
import van2ConnectorsData from './VAN2/CONNECTORS.json';

// Import VAN3 data files
import van3SitesData from './VAN3/SITES.json';
import van3ComponentsData from './VAN3/COMPONENTS.json';
import van3ComponentPairsData from './VAN3/COMPONENT_PAIRS.json';
import van3ProcessesData from './VAN3/PROCESSES.json';
import van3SitePairsData from './VAN3/SITE_PAIRS.json';
import van3ProcessPairsData from './VAN3/PROCESS_PAIRS.json';
import van3ServicesData from './VAN3/SERVICES.json';
import van3TcpConnectionsData from './VAN3/TCP_CONNECTIONS.json';
import van3HttpRequestsData from './VAN3/HTTP_REQUESTS.json';
import van3LinksData from './VAN3/LINKS.json';
import van3ListenersData from './VAN3/LISTENERS.json';
import van3ConnectorsData from './VAN3/CONNECTORS.json';

// Import bookinfo data files
import bookinfoSitesData from './bookinfo/SITES.json';
import bookinfoComponentsData from './bookinfo/COMPONENTS.json';
import bookinfoComponentPairsData from './bookinfo/COMPONENT_PAIRS.json';
import bookinfoProcessesData from './bookinfo/PROCESSES.json';
import bookinfoSitePairsData from './bookinfo/SITE_PAIRS.json';
import bookinfoProcessPairsData from './bookinfo/PROCESS_PAIRS.json';
import bookinfoServicesData from './bookinfo/SERVICES.json';
import bookinfoTcpConnectionsData from './bookinfo/TCP_CONNECTIONS.json';
import bookinfoHttpRequestsData from './bookinfo/HTTP_REQUESTS.json';
import bookinfoLinksData from './bookinfo/LINKS.json';
import bookinfoListenersData from './bookinfo/LISTENERS.json';
import bookinfoConnectorsData from './bookinfo/CONNECTORS.json';

// Import SpringPetclinic data files
import springPetclinicSitesData from './SpringPetclinic/SITES.json';
import springPetclinicComponentsData from './SpringPetclinic/COMPONENTS.json';
import springPetclinicComponentPairsData from './SpringPetclinic/COMPONENT_PAIRS.json';
import springPetclinicProcessesData from './SpringPetclinic/PROCESSES.json';
import springPetclinicSitePairsData from './SpringPetclinic/SITE_PAIRS.json';
import springPetclinicProcessPairsData from './SpringPetclinic/PROCESS_PAIRS.json';
import springPetclinicServicesData from './SpringPetclinic/SERVICES.json';
import springPetclinicTcpConnectionsData from './SpringPetclinic/TCP_CONNECTIONS.json';
import springPetclinicHttpRequestsData from './SpringPetclinic/HTTP_REQUESTS.json';
import springPetclinicLinksData from './SpringPetclinic/LINKS.json';
import springPetclinicListenersData from './SpringPetclinic/LISTENERS.json';
import springPetclinicConnectorsData from './SpringPetclinic/CONNECTORS.json';

// Import ACME_Fitness data files
import acmeFitnessSitesData from './ACME_Fitness/SITES.json';
import acmeFitnessComponentsData from './ACME_Fitness/COMPONENTS.json';
import acmeFitnessComponentPairsData from './ACME_Fitness/COMPONENT_PAIRS.json';
import acmeFitnessProcessesData from './ACME_Fitness/PROCESSES.json';
import acmeFitnessSitePairsData from './ACME_Fitness/SITE_PAIRS.json';
import acmeFitnessProcessPairsData from './ACME_Fitness/PROCESS_PAIRS.json';
import acmeFitnessServicesData from './ACME_Fitness/SERVICES.json';
import acmeFitnessTcpConnectionsData from './ACME_Fitness/TCP_CONNECTIONS.json';
import acmeFitnessHttpRequestsData from './ACME_Fitness/HTTP_REQUESTS.json';
import acmeFitnessLinksData from './ACME_Fitness/LINKS.json';
import acmeFitnessListenersData from './ACME_Fitness/LISTENERS.json';
import acmeFitnessConnectorsData from './ACME_Fitness/CONNECTORS.json';

import { VanResponse } from '../src/types/REST.interfaces';

// Dynamic VAN data loading based on vans.json configuration
const loadVanDataFromDirectory = async (directory: string): Promise<VanResponse[]> => {
  try {
    // Dynamically import VAN.json from the specified directory
    const vanModule = await import(`./${directory}/VAN.json`);
    return vanModule.default?.results || [];
  } catch (error) {
    console.warn(`Failed to load VAN data from ${directory}:`, error);
    return [];
  }
};

// This function returns all VAN data from all VAN directories defined in vans.json
export const loadAllVanData = async (): Promise<VanResponse[]> => {
  const allVanData: VanResponse[] = [];

  // Load VAN data from all configured directories
  for (const vanConfig of vansConfig.vans) {
    const vanData = await loadVanDataFromDirectory(vanConfig.directory);
    allVanData.push(...vanData);
  }

  return allVanData;
};

// Synchronous version for backward compatibility
export const loadAllVanDataSync = (): VanResponse[] => {
  const allVanData: VanResponse[] = [];

  // For synchronous loading, we'll use the existing hardcoded approach
  // This maintains backward compatibility while we transition to async loading
  const vanFiles = [
    { results: [{ vanName: "default", identity: "bookinfo-van-4f8a-9b2c-1d3e-5f6a7b8c9d0e", routerCount: 4, siteCount: 4, version: "2.1.1", status: "up", traffic: "█▆▅▄▃▂▁" }] },
    { results: [{ vanName: "bookinfo", identity: "bookinfo-van-2a3b-4c5d-6e7f-8a9b0c1d2e3f", routerCount: 3, siteCount: 3, version: "2.1.1", status: "up", traffic: "█▆▅▄▃▂▁" }] },
    { results: [{ vanName: "springpetclinic", identity: "p1e2t3c4-l5i6n7i8c9-0123456789ab", routerCount: 3, siteCount: 3, version: "2.1.1", status: "up", traffic: "█▆▅▄▃▂▁" }] },
    { results: [{ vanName: "acmefitness", identity: "a1c2m3e4-f5i6t7n8e9s0-0123456789ab", routerCount: 4, siteCount: 4, version: "2.1.1", status: "up", traffic: "█▆▅▄▃▂▁" }] }
  ];

  vanFiles.forEach((vanFile) => {
    if (vanFile && vanFile.results && Array.isArray(vanFile.results)) {
      allVanData.push(...vanFile.results);
    }
  });

  return allVanData;
};

// VAN-specific data mapping
const vanDataMaps = {
  'default': {
    SITES: defaultSitesData,
    COMPONENTS: defaultComponentsData,
    COMPONENT_PAIRS: defaultComponentPairsData,
    PROCESSES: defaultProcessesData,
    SITE_PAIRS: defaultSitePairsData,
    PROCESS_PAIRS: defaultProcessPairsData,
    SERVICES: defaultServicesData,
    TCP_CONNECTIONS: defaultTcpConnectionsData,
    HTTP_REQUESTS: defaultHttpRequestsData,
    LINKS: defaultLinksData,
    LISTENERS: defaultListenersData,
    CONNECTORS: defaultConnectorsData
  },
  'bookinfo': {
    SITES: bookinfoSitesData,
    COMPONENTS: bookinfoComponentsData,
    COMPONENT_PAIRS: bookinfoComponentPairsData,
    PROCESSES: bookinfoProcessesData,
    SITE_PAIRS: bookinfoSitePairsData,
    PROCESS_PAIRS: bookinfoProcessPairsData,
    SERVICES: bookinfoServicesData,
    TCP_CONNECTIONS: bookinfoTcpConnectionsData,
    HTTP_REQUESTS: bookinfoHttpRequestsData,
    LINKS: bookinfoLinksData,
    LISTENERS: bookinfoListenersData,
    CONNECTORS: bookinfoConnectorsData
  },
  'springpetclinic': {
    SITES: springPetclinicSitesData,
    COMPONENTS: springPetclinicComponentsData,
    COMPONENT_PAIRS: springPetclinicComponentPairsData,
    PROCESSES: springPetclinicProcessesData,
    SITE_PAIRS: springPetclinicSitePairsData,
    PROCESS_PAIRS: springPetclinicProcessPairsData,
    SERVICES: springPetclinicServicesData,
    TCP_CONNECTIONS: springPetclinicTcpConnectionsData,
    HTTP_REQUESTS: springPetclinicHttpRequestsData,
    LINKS: springPetclinicLinksData,
    LISTENERS: springPetclinicListenersData,
    CONNECTORS: springPetclinicConnectorsData
  },
  'acmefitness': {
    SITES: acmeFitnessSitesData,
    COMPONENTS: acmeFitnessComponentsData,
    COMPONENT_PAIRS: acmeFitnessComponentPairsData,
    PROCESSES: acmeFitnessProcessesData,
    SITE_PAIRS: acmeFitnessSitePairsData,
    PROCESS_PAIRS: acmeFitnessProcessPairsData,
    SERVICES: acmeFitnessServicesData,
    TCP_CONNECTIONS: acmeFitnessTcpConnectionsData,
    HTTP_REQUESTS: acmeFitnessHttpRequestsData,
    LINKS: acmeFitnessLinksData,
    LISTENERS: acmeFitnessListenersData,
    CONNECTORS: acmeFitnessConnectorsData
  },
  // Legacy VAN2 and VAN3 support
  'van2': {
    SITES: van2SitesData,
    COMPONENTS: van2ComponentsData,
    COMPONENT_PAIRS: van2ComponentPairsData,
    PROCESSES: van2ProcessesData,
    SITE_PAIRS: van2SitePairsData,
    PROCESS_PAIRS: van2ProcessPairsData,
    SERVICES: van2ServicesData,
    TCP_CONNECTIONS: van2TcpConnectionsData,
    HTTP_REQUESTS: van2HttpRequestsData,
    LINKS: van2LinksData,
    LISTENERS: van2ListenersData,
    CONNECTORS: van2ConnectorsData
  },
  'van3': {
    SITES: van3SitesData,
    COMPONENTS: van3ComponentsData,
    COMPONENT_PAIRS: van3ComponentPairsData,
    PROCESSES: van3ProcessesData,
    SITE_PAIRS: van3SitePairsData,
    PROCESS_PAIRS: van3ProcessPairsData,
    SERVICES: van3ServicesData,
    TCP_CONNECTIONS: van3TcpConnectionsData,
    HTTP_REQUESTS: van3HttpRequestsData,
    LINKS: van3LinksData,
    LISTENERS: van3ListenersData,
    CONNECTORS: van3ConnectorsData
  }
};

// Function to get VAN-specific data based on VAN name
export const getVanSpecificData = (vanName: string, dataType: keyof typeof vanDataMaps.default) => {
  // Map VAN names to data keys
  let vanKey: keyof typeof vanDataMaps;
  
  switch (vanName?.toLowerCase()) {
    case 'bookinfo':
      vanKey = 'bookinfo';
      break;
    case 'springpetclinic':
      vanKey = 'springpetclinic';
      break;
    case 'acmefitness':
      vanKey = 'acmefitness';
      break;
    case 'van2':
      vanKey = 'van2';
      break;
    case 'van3':
      vanKey = 'van3';
      break;
    default:
      vanKey = 'default';
      break;
  }
  
  return vanDataMaps[vanKey][dataType];
};

// Function to determine VAN name from VAN identity
export const getVanNameFromIdentity = (vanIdentity: string): string => {
  const allVans = loadAllVanDataSync();
  const van = allVans.find(v => v.identity === vanIdentity);
  return van?.vanName || 'default';
};
