import { HttpStatusErrors } from '@pages/shared/Errors/errors.constants';

import { fetchWithTimeout, handleStatusError } from './axiosMiddleware';
import { getData, getDeployments, getFlowsTopology, getServices, getSites } from './controllers';
import {
    DATA_URL,
    FLOWS_CONNECTORS,
    FLOWS_LINKS,
    FLOWS_LISTENERS,
    FLOWS_ROUTERS,
    SITES_PATH,
    FLOWS_VAN_ADDRESSES,
    FLOWS_PROCESSES,
    FLOWPAIRS,
    getFlowsPairsByVanAddressIdPATH,
    getProcessesBySitePATH,
    getProcessesByVanAddressIdPATH,
    getConnectorByProcessIdPATH,
    getFlowsByProcessIdPATH,
    getSitePATH,
    getRoutersBySitePATH,
    getLinksBySitePATH,
    getHostsBySitePATH,
} from './REST.constant';
import {
    DataAdapterResponse,
    ServiceResponse,
    SiteDataResponse,
    DeploymentTopologyResponse,
    FlowsVanAddressesResponse,
    FlowsTopologyResponse,
    FlowsDeviceResponse,
    ProcessResponse,
    FlowPairResponse,
    HTTPError,
    FlowResponse,
    SiteResponse,
    LinkResponse,
    RouterResponse,
    HostResponse,
} from './REST.interfaces';

export const RESTApi = {
    fetchData: async (): Promise<DataAdapterResponse> => {
        const { data } = await fetchWithTimeout(DATA_URL);

        return getData(data);
    },
    fetchDATASites: async (): Promise<SiteDataResponse[]> => {
        const { data } = await fetchWithTimeout(DATA_URL);

        return getSites(data);
    },

    // SITES APIs
    fetchSites: async (): Promise<SiteResponse[]> => {
        const { data } = await fetchWithTimeout(SITES_PATH);

        return data;
    },
    fetchSite: async (id: string): Promise<SiteDataResponse> => {
        const { data } = await fetchWithTimeout(getSitePATH(id));

        return data;
    },
    fetchProcessesBySite: async (id: string): Promise<ProcessResponse[]> => {
        const { data } = await fetchWithTimeout(getProcessesBySitePATH(id));

        return data;
    },
    fetchRoutersBySite: async (id: string): Promise<RouterResponse[]> => {
        const { data } = await fetchWithTimeout(getRoutersBySitePATH(id));

        return data;
    },
    fetchLinksBySite: async (id: string): Promise<LinkResponse[]> => {
        const { data } = await fetchWithTimeout(getLinksBySitePATH(id));

        return data;
    },
    fetchHostsBySite: async (id: string): Promise<HostResponse[]> => {
        const { data } = await fetchWithTimeout(getHostsBySitePATH(id));

        return data;
    },

    // SERVICES APIs
    fetchServices: async (): Promise<ServiceResponse[]> => {
        const { data } = await fetchWithTimeout(DATA_URL);

        return getServices(data);
    },

    // DEPLOYMENTS APIs
    fetchDeployments: async (): Promise<DeploymentTopologyResponse[]> => {
        const { data } = await fetchWithTimeout(DATA_URL);

        return getDeployments(data);
    },

    // FLOWS APIs
    fetchVanAddresses: async (): Promise<FlowsVanAddressesResponse[]> => {
        const { data } = await fetchWithTimeout(FLOWS_VAN_ADDRESSES);

        return data;
    },
    fetchFlowsSites: async (): Promise<SiteResponse[]> => {
        const { data } = await fetchWithTimeout(`${SITES_PATH}`);

        return data;
    },
    fetchFlowsSite: async (id: string): Promise<SiteResponse> => {
        const { data } = await fetchWithTimeout(`${SITES_PATH}/${id}`);

        return data;
    },
    fetchFlowsProcesses: async (): Promise<ProcessResponse[]> => {
        const { data } = await fetchWithTimeout(`${FLOWS_PROCESSES}`);

        return data;
    },
    fetchFlowsByProcessesId: async (id: string): Promise<FlowResponse[]> => {
        const { data } = await fetchWithTimeout(getFlowsByProcessIdPATH(id));

        return data;
    },
    fetchFlowProcess: async (id: string): Promise<ProcessResponse> => {
        const { data } = await fetchWithTimeout(`${FLOWS_PROCESSES}/${id}`);

        return data;
    },
    fetchFlowConnectorByProcessId: async (id: string): Promise<FlowsDeviceResponse> => {
        const { data } = await fetchWithTimeout(getConnectorByProcessIdPATH(id));

        return data;
    },
    fetchFlowsRouters: async (): Promise<RouterResponse[]> => {
        const { data } = await fetchWithTimeout(`${FLOWS_ROUTERS}`);

        return data;
    },
    fetchFlowsRouter: async (id: string): Promise<RouterResponse> => {
        const { data } = await fetchWithTimeout(`${FLOWS_ROUTERS}/${id}`);

        return data;
    },
    fetchFlowsLinks: async (): Promise<FlowsDeviceResponse[]> => {
        const { data } = await fetchWithTimeout(`${FLOWS_LINKS}`);

        return data;
    },
    fetchFlowsLink: async (id: string): Promise<FlowsDeviceResponse> => {
        const { data } = await fetchWithTimeout(`${FLOWS_LINKS}/${id}`);

        return data;
    },
    fetchFlowsConnectors: async (): Promise<FlowsDeviceResponse[]> => {
        const { data } = await fetchWithTimeout(`${FLOWS_CONNECTORS}`);

        return data;
    },
    fetchFlowsConnector: async (id: string): Promise<FlowsDeviceResponse | null> => {
        try {
            const { data } = await fetchWithTimeout(`${FLOWS_CONNECTORS}/${id}`);

            return data;
        } catch (e) {
            const error = e as HTTPError;

            if (error.httpStatus === HttpStatusErrors.NotFound) {
                return null;
            }

            return handleStatusError(error);
        }
    },
    fetchFlowsListeners: async (): Promise<FlowsDeviceResponse[]> => {
        const { data } = await fetchWithTimeout(`${FLOWS_LISTENERS}`);

        return data;
    },
    fetchFlowsListener: async (id: string): Promise<FlowsDeviceResponse> => {
        const { data } = await fetchWithTimeout(`${FLOWS_LISTENERS}/${id}`);

        return data;
    },
    fetchFlowsPairsByVanAddr: async (id: string): Promise<FlowPairResponse[]> => {
        const { data } = await fetchWithTimeout(getFlowsPairsByVanAddressIdPATH(id));

        return data;
    },
    fetchProcessesByVanAddr: async (id: string): Promise<ProcessResponse[]> => {
        const { data } = await fetchWithTimeout(getProcessesByVanAddressIdPATH(id));

        return data;
    },
    fetchFlowPair: async (id: string): Promise<FlowPairResponse> => {
        const { data } = await fetchWithTimeout(`${FLOWPAIRS}/${id}`);

        return data;
    },
    fetchFlowsTopology: async (): Promise<FlowsTopologyResponse> => {
        const { data: sites } = await fetchWithTimeout(`${SITES_PATH}`);
        const { data: routers } = await fetchWithTimeout(`${FLOWS_ROUTERS}`);
        const { data: links } = await fetchWithTimeout(`${FLOWS_LINKS}`);

        const sitesMap = (sites as SiteResponse[]).reduce((acc, site) => {
            acc[site.identity] = site;

            return acc;
        }, {} as Record<string, SiteResponse>);

        const routersExtended = (routers as RouterResponse[]).map((router) => ({
            ...router,
            siteName: sitesMap[router.parent].name,
        }));

        return getFlowsTopology(routersExtended, links);
    },
};
