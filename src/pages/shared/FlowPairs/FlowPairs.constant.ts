import LinkCell from '@core/components/LinkCell';
import { LinkCellProps } from '@core/components/LinkCell/LinkCell.interfaces';
import { SKColumn } from '@core/components/SkTable/SkTable.interface';
import { formatByteRate, formatBytes, formatTraceBySites } from '@core/utils/formatBytes';
import { formatTime } from '@core/utils/formatTime';
import { timeAgo } from '@core/utils/timeAgo';
import { ProcessesRoutesPaths } from '@pages/Processes/Processes.enum';
import { SitesRoutesPaths } from '@pages/Sites/Sites.enum';
import { FlowPairsResponse } from 'API/REST.interfaces';

import { FlowPairsColumnsNames } from './FlowPairs.enum';

export const flowPairsComponentsTable = {
    ProcessNameLinkCell: (props: LinkCellProps<FlowPairsResponse>) =>
        LinkCell({
            ...props,
            type: 'process',
            link: `${ProcessesRoutesPaths.Processes}/${props.data.forwardFlow.process}`,
        }),
    SiteNameLinkCell: (props: LinkCellProps<FlowPairsResponse>) =>
        LinkCell({
            ...props,
            type: 'site',
            link: `${SitesRoutesPaths.Sites}/${props.data.sourceSiteId}`,
        }),
    TargetSiteNameLinkCell: (props: LinkCellProps<FlowPairsResponse>) =>
        LinkCell({
            ...props,
            type: 'site',
            link: `${SitesRoutesPaths.Sites}/${props.data.destinationSiteId}`,
        }),
    TargetProcessNameLinkCell: (props: LinkCellProps<FlowPairsResponse>) =>
        LinkCell({
            ...props,
            type: 'process',
            link: `${ProcessesRoutesPaths.Processes}/${props.data.counterFlow.process}`,
        }),
    ClientServerLatencyCell: (props: LinkCellProps<FlowPairsResponse>) =>
        formatTime(props.data.counterFlow.latency + props.data.forwardFlow.latency),
    DurationCell: (props: LinkCellProps<FlowPairsResponse>) =>
        formatTime((props.data.endTime || Date.now() * 1000) - props.data.startTime),
};

export const TcpFlowPairsColumns: SKColumn<FlowPairsResponse>[] = [
    {
        name: FlowPairsColumnsNames.Client,
        prop: 'forwardFlow.processName' as keyof FlowPairsResponse,
        component: 'ProcessNameLinkCell',
        width: 15,
    },
    {
        name: FlowPairsColumnsNames.Port,
        prop: 'forwardFlow.sourcePort' as keyof FlowPairsResponse,
    },
    {
        name: FlowPairsColumnsNames.Site,
        prop: 'sourceSiteName' as keyof FlowPairsResponse,
        component: 'SiteNameLinkCell',
    },
    {
        name: FlowPairsColumnsNames.TxByteRate,
        prop: 'forwardFlow.octetRate' as keyof FlowPairsResponse,
        format: formatByteRate,
    },
    {
        name: FlowPairsColumnsNames.RxByteRate,
        prop: 'counterFlow.octetRate' as keyof FlowPairsResponse,
        format: formatByteRate,
    },
    {
        name: FlowPairsColumnsNames.TxBytes,
        prop: 'forwardFlow.octets' as keyof FlowPairsResponse,
        format: formatBytes,
    },
    {
        name: FlowPairsColumnsNames.RxBytes,
        prop: 'counterFlow.octets' as keyof FlowPairsResponse,
        format: formatBytes,
    },
    {
        name: FlowPairsColumnsNames.TTFB,
        columnDescription: 'time elapsed between client and server',
        component: 'ClientServerLatencyCell',
    },
    {
        name: FlowPairsColumnsNames.Server,
        prop: 'counterFlow.processName' as keyof FlowPairsResponse,
        component: 'TargetProcessNameLinkCell',
        width: 15,
    },
    {
        name: FlowPairsColumnsNames.ServerSite,
        prop: 'destinationSiteName' as keyof FlowPairsResponse,
        component: 'TargetSiteNameLinkCell',
    },
    {
        name: FlowPairsColumnsNames.Trace,
        prop: 'flowTrace' as keyof FlowPairsResponse,
        format: formatTraceBySites,
        width: 20,
    },
    {
        name: FlowPairsColumnsNames.Duration,
        component: 'DurationCell',
    },
];

export const HttpFlowPairsColumns: SKColumn<FlowPairsResponse>[] = [
    {
        name: FlowPairsColumnsNames.Method,
        prop: 'forwardFlow.method' as keyof FlowPairsResponse,
    },
    {
        name: FlowPairsColumnsNames.StatusCode,
        prop: 'counterFlow.result' as keyof FlowPairsResponse,
    },
    {
        name: FlowPairsColumnsNames.From,
        prop: 'forwardFlow.processName' as keyof FlowPairsResponse,
        component: 'ProcessNameLinkCell',
        width: 15,
    },
    {
        name: FlowPairsColumnsNames.To,
        prop: 'counterFlow.processName' as keyof FlowPairsResponse,
        component: 'TargetProcessNameLinkCell',
        width: 15,
    },
    {
        name: FlowPairsColumnsNames.Trace,
        prop: 'flowTrace' as keyof FlowPairsResponse,
        format: formatTraceBySites,
        width: 20,
    },
    {
        name: FlowPairsColumnsNames.RxByteRate,
        prop: 'counterFlow.octetRate' as keyof FlowPairsResponse,
        format: formatByteRate,
    },
    {
        name: FlowPairsColumnsNames.RxLatency,
        prop: 'counterFlow.latency' as keyof FlowPairsResponse,
        format: formatTime,
    },

    {
        name: FlowPairsColumnsNames.RequestCompleted,
        prop: 'counterFlow.endTime' as keyof FlowPairsResponse,
        format: timeAgo,
    },
    {
        name: FlowPairsColumnsNames.Duration,
        component: 'DurationCell',
    },
];