// FLOW PAIRS TABLE
export interface FlowPairsTableProps {
    flowPairs: FlowPairBasic[];
}

// Process TABLE
export interface ProcessRow {
    id: string;
    siteId: string;
    siteName: string;
    processName: string;
    bytes: number;
    byteRate: number;
    host: string;
    port: string;
    groupId: string;
    groupName: string;
    imageName: string;
}

// FLOW PAIR BASIC INFO
export interface FlowPairBasic {
    id: string;
    siteId: string;
    siteName: string;
    byteRate: number;
    bytes: number;
    host: string;
    port: string;
    processId: string;
    processName: string;
    processImageName: string;
    latency: number;
    startTime: number;
    endTime?: number;
    targetSiteId: string;
    targetSiteName: string;
    targetByteRate: number;
    targetBytes: number;
    targetHost: string;
    targetPort: string;
    targetProcessId: string;
    targetProcessName: string;
    targetProcessImageName: string;
    targetLatency: number;
    protocol: string;
}
export interface FlowsPairsBasic {
    connections: FlowPairBasic[];
    total: number;
}
