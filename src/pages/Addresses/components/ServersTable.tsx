import React, { FC } from 'react';

import LinkCell from '@core/components/LinkCell';
import { LinkCellProps } from '@core/components/LinkCell/LinkCell.interfaces';
import SkTable from '@core/components/SkTable';
import { formatByteRate, formatBytes } from '@core/utils/formatBytes';
import { ProcessesRoutesPaths } from '@pages/Processes/Processes.enum';
import { ProcessGroupsRoutesPaths } from '@pages/ProcessGroups/ProcessGroups.enum';
import { SitesRoutesPaths } from '@pages/Sites/Sites.enum';
import { ProcessResponse } from 'API/REST.interfaces';
import { DEFAULT_TABLE_PAGE_SIZE } from 'config';

import { ProcessesColumnsNames } from '../Addresses.enum';
import { ProcessesTableProps } from '../Addresses.interfaces';

const columns = [
    {
        name: ProcessesColumnsNames.Process,
        prop: 'name' as keyof ProcessResponse,
        component: 'nameLinkCellProcess',
        width: 20,
    },
    {
        name: ProcessesColumnsNames.ProcessGroup,
        prop: 'groupName' as keyof ProcessResponse,
        component: 'nameLinkCellProcessGroup',
    },
    {
        name: ProcessesColumnsNames.Site,
        prop: 'parentName' as keyof ProcessResponse,
        component: 'nameLinkCellSite',
    },
    {
        name: ProcessesColumnsNames.Host,
        prop: 'sourceHost' as keyof ProcessResponse,
    },
    {
        name: ProcessesColumnsNames.ByteRateRx,
        prop: 'octetReceivedRate' as keyof ProcessResponse,
        format: formatByteRate,
    },
    {
        name: ProcessesColumnsNames.BytesRx,
        prop: 'octetsReceived' as keyof ProcessResponse,
        format: formatBytes,
    },
    {
        name: ProcessesColumnsNames.ByteRateTx,
        prop: 'octetSentRate' as keyof ProcessResponse,
        format: formatByteRate,
    },
    {
        name: ProcessesColumnsNames.BytesTx,
        prop: 'octetsSent' as keyof ProcessResponse,
        format: formatBytes,
    },
];

const ServersTable: FC<ProcessesTableProps> = function ({ processes }) {
    return (
        <SkTable
            columns={columns}
            rows={processes}
            pageSizeStart={DEFAULT_TABLE_PAGE_SIZE}
            components={{
                nameLinkCellProcess: (props: LinkCellProps<ProcessResponse>) =>
                    LinkCell({
                        ...props,
                        type: 'process',
                        link: `${ProcessesRoutesPaths.Processes}/${props.data.identity}`,
                    }),
                nameLinkCellProcessGroup: (props: LinkCellProps<ProcessResponse>) =>
                    LinkCell({
                        ...props,
                        type: 'service',
                        link: `${ProcessGroupsRoutesPaths.ProcessGroups}/${props.data.groupIdentity}`,
                    }),
                nameLinkCellSite: (props: LinkCellProps<ProcessResponse>) =>
                    LinkCell({
                        ...props,
                        type: 'site',
                        link: `${SitesRoutesPaths.Sites}/${props.data.parent}`,
                    }),
            }}
        />
    );
};

export default ServersTable;