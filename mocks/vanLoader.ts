// Import all VAN files statically but in a way that's easy to extend
import vanData from './data/VAN.json';
import van2Data from './VAN2/VAN.json';
import van3Data from './VAN3/VAN.json';

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
  const allVans = loadAllVanData();
  const van = allVans.find(v => v.identity === vanIdentity);
  return van?.vanName || 'default';
};
