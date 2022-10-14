import { FlowAggregatesResponse } from 'API/REST.interfaces';

export interface TopologyNode {
    id: string;
    name: string;
    x: number;
    y: number;
    color: string;
    groupName: string;
    group: number;
    img?: XMLDocument;
    fx: number | null;
    fy: number | null;
    groupFx?: number;
    groupFy?: number;
}

export interface TopologyEdges {
    source: string;
    target: string;
    type?: 'dashed';
}

export interface TopologyEdgesModifiedByForce {
    source: TopologyNode;
    target: TopologyNode;
    type?: 'dashed';
}

export interface TopologyDetailsProps {
    name: string;
    link: string;
    tcpConnectionsOutEntries: FlowAggregatesResponse[];
    tcpConnectionsInEntries: FlowAggregatesResponse[];
}

export interface TrafficProps {
    data: { identity: string; name: string; value: number }[];
    link?: string;
    onSelected?: Function;
}
