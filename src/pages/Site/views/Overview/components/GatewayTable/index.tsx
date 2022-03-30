import React, { memo } from 'react';

import OverviewCard from '@core/components/SummaryCard';
import { SummaryCardColors } from '@core/components/SummaryCard/SummaryCard.enum';
import { ServiceData } from '@pages/Site/services/services.interfaces';

import { GATEWAYS_HEADER_TABLE } from './GatewayTable.constants';
import { GatewaysTableProps } from './GatewayTable.interfaces';

const Pluralize = require('pluralize');

const GatewaysTable = memo(function ({ siteId, gateways }: GatewaysTableProps) {
  return (
    <OverviewCard
      columns={GATEWAYS_HEADER_TABLE}
      data={gateways}
      label={Pluralize('exposed Service', gateways?.length, true)}
      color={SummaryCardColors.Green}
      styleCell={(cell: ServiceData) => (cell.siteId === siteId ? 'sk-table-bg-green' : '')}
    />
  );
});

export default GatewaysTable;
