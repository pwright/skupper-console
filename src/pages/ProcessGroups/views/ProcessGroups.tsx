import { useCallback, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { RESTApi } from '@API/REST.api';
import { BIG_PAGINATION_SIZE } from '@config/config';
import { getTestsIds } from '@config/testIds.config';
import SkTable from '@core/components/SkTable';
import MainContainer from '@layout/MainContainer';
import { TopologyRoutesPaths, TopologyViews } from '@pages/Topology/Topology.enum';
import { RequestOptions } from 'API/REST.interfaces';

import { CustomComponentCells, processGroupsColumns } from '../ProcessGroups.constants';
import { ProcessGroupsLabels } from '../ProcessGroups.enum';
import { QueriesProcessGroups } from '../services/services.enum';

const initComponentsQueryParams = {
  limit: BIG_PAGINATION_SIZE
};

const ProcessGroups = function () {
  const [componentsQueryParams, setComponentsQueryParams] = useState<RequestOptions>(initComponentsQueryParams);

  const { data: componentsData } = useQuery(
    [QueriesProcessGroups.GetProcessGroups, componentsQueryParams],
    () => RESTApi.fetchProcessGroups(componentsQueryParams),
    {
      keepPreviousData: true
    }
  );

  const handleGetFilters = useCallback((params: RequestOptions) => {
    setComponentsQueryParams({ ...initComponentsQueryParams, ...params });
  }, []);

  const componentsNoFiltered =
    componentsData?.results.filter(({ processGroupRole }) => processGroupRole !== 'internal') || [];
  const processGroupsCount = componentsData?.timeRangeCount;

  const components = componentsNoFiltered.filter(({ processGroupRole }) => processGroupRole !== 'internal');

  return (
    <MainContainer
      dataTestId={getTestsIds.componentsView()}
      title={ProcessGroupsLabels.Section}
      description={ProcessGroupsLabels.Description}
      link={`${TopologyRoutesPaths.Topology}?type=${TopologyViews.ProcessGroups}`}
      mainContentChildren={
        <SkTable
          columns={processGroupsColumns}
          rows={components}
          pagination={true}
          paginationPageSize={BIG_PAGINATION_SIZE}
          paginationTotalRows={processGroupsCount}
          onGetFilters={handleGetFilters}
          customCells={CustomComponentCells}
        />
      }
    />
  );
};

export default ProcessGroups;
