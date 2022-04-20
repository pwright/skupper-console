import React, { memo } from 'react';

import OverviewCard from '@core/components/SummaryCard';
import { SummaryCardColors } from '@core/components/SummaryCard/SummaryCard.enum';

import { SERVICES_HEADER_TABLE } from './ServicesTable.constants';
import { ServicesTableProps } from './ServicesTable.interfaces';

const Pluralize = require('pluralize');

const ServicesTable = memo(function ({ services }: ServicesTableProps) {
    return (
        <OverviewCard
            columns={SERVICES_HEADER_TABLE}
            data={services}
            label={Pluralize('exposed Service', services?.length, true)}
            color={SummaryCardColors.Blue}
        />
    );
});

export default ServicesTable;
