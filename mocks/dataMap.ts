import { loadAllVanData, getVanSpecificData } from './vanLoader';
import {
  SiteResponse,
  ComponentResponse,
  PairsResponse,
  ProcessResponse,
  ProcessPairsResponse,
  ServiceResponse,
  ConnectorResponse,
  ApplicationFlowResponse,
  RouterLinkResponse,
  ListenerResponse,
  VanResponse
} from '../src/types/REST.interfaces';

type SitesData = SiteResponse[];
type ComponentsData = ComponentResponse[];
type ComponentPairsData = PairsResponse[];
type ProcessesData = ProcessResponse[];
type SitePairsData = PairsResponse[];
type ProcessPairsData = ProcessPairsResponse[];
type ServicesData = ServiceResponse[];
type TcpConnectionsData = ConnectorResponse[];
type HttpRequestsData = ApplicationFlowResponse[];
type LinksData = RouterLinkResponse[];
type ListenersData = ListenerResponse[];
type ConnectorsData = ConnectorResponse[];

type DataEntry<T> = {
  results: T[];
  count: number;
  timeRangeCount: number;
};

export type DataMap = {
  SITES: DataEntry<SiteResponse>;
  COMPONENTS: DataEntry<ComponentResponse>;
  COMPONENT_PAIRS: DataEntry<PairsResponse>;
  PROCESSES: DataEntry<ProcessResponse>;
  SITE_PAIRS: DataEntry<PairsResponse>;
  PROCESS_PAIRS: DataEntry<ProcessPairsResponse>;
  SERVICES: DataEntry<ServiceResponse>;
  TCP_CONNECTIONS: DataEntry<ConnectorResponse>;
  HTTP_REQUESTS: DataEntry<ApplicationFlowResponse>;
  LINKS: DataEntry<RouterLinkResponse>;
  LISTENERS: DataEntry<ListenerResponse>;
  CONNECTORS: DataEntry<ConnectorResponse>;
  VAN: DataEntry<VanResponse>;
};

const createDataEntry = <T>(data: T[] | { results: T[] } | undefined | null): DataEntry<T> => {
  const results = Array.isArray(data) ? data : (data?.results ?? []);

  return {
    results,
    count: results.length,
    timeRangeCount: results.length
  };
};

// Create VAN-specific data map function
export const createVanSpecificDataMap = (vanName: string = 'default'): DataMap => {
  return {
    SITES: createDataEntry<SiteResponse>(getVanSpecificData(vanName, 'SITES') as unknown as SitesData),
    COMPONENTS: createDataEntry<ComponentResponse>(getVanSpecificData(vanName, 'COMPONENTS') as unknown as ComponentsData),
    COMPONENT_PAIRS: createDataEntry<PairsResponse>(getVanSpecificData(vanName, 'COMPONENT_PAIRS') as unknown as ComponentPairsData),
    PROCESSES: createDataEntry<ProcessResponse>(getVanSpecificData(vanName, 'PROCESSES') as unknown as ProcessesData),
    SITE_PAIRS: createDataEntry<PairsResponse>(getVanSpecificData(vanName, 'SITE_PAIRS') as unknown as SitePairsData),
    PROCESS_PAIRS: createDataEntry<ProcessPairsResponse>(getVanSpecificData(vanName, 'PROCESS_PAIRS') as unknown as ProcessPairsData),
    SERVICES: createDataEntry<ServiceResponse>(getVanSpecificData(vanName, 'SERVICES') as unknown as ServicesData),
    TCP_CONNECTIONS: createDataEntry<ConnectorResponse>(getVanSpecificData(vanName, 'TCP_CONNECTIONS') as unknown as TcpConnectionsData),
    HTTP_REQUESTS: createDataEntry<ApplicationFlowResponse>(getVanSpecificData(vanName, 'HTTP_REQUESTS') as unknown as HttpRequestsData),
    LINKS: createDataEntry<RouterLinkResponse>(getVanSpecificData(vanName, 'LINKS') as unknown as LinksData),
    LISTENERS: createDataEntry<ListenerResponse>(getVanSpecificData(vanName, 'LISTENERS') as unknown as ListenersData),
    CONNECTORS: createDataEntry<ConnectorResponse>(getVanSpecificData(vanName, 'CONNECTORS') as unknown as ConnectorsData),
    VAN: createDataEntry<VanResponse>(loadAllVanData())
  };
};

// Default data map (backward compatibility)
const dataMap: DataMap = createVanSpecificDataMap('default');

export { dataMap };
