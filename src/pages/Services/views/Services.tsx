import { startTransition, useCallback, useState } from 'react';

import { useSuspenseQueries } from '@tanstack/react-query';

import { PrometheusApi } from '@API/Prometheus.api';
import { RESTApi } from '@API/REST.api';
import { RequestOptions } from '@API/REST.interfaces';
import { BIG_PAGINATION_SIZE } from '@config/config';
import { getTestsIds } from '@config/testIds';
import SkSearchFilter from '@core/components/SkSearchFilter';
import SkTable from '@core/components/SkTable';
import MainContainer from '@layout/MainContainer';

import { ServicesController } from '../services';
import { ServiceColumns, customServiceCells, servicesSelectOptions } from '../Services.constants';
import { ServicesLabels, QueriesServices } from '../Services.enum';

const initOldConnectionsQueryParams: RequestOptions = {
  limit: BIG_PAGINATION_SIZE
};

const Services = function () {
  const [servicesQueryParams, setServicesQueryParams] = useState<RequestOptions>(initOldConnectionsQueryParams);

  const [{ data: servicesData }, { data: tcpActiveFlows }] = useSuspenseQueries({
    queries: [
      {
        queryKey: [QueriesServices.GetServices, servicesQueryParams],
        queryFn: () => RESTApi.fetchServices(servicesQueryParams)
      },
      {
        queryKey: [QueriesServices.GetPrometheusActiveFlows],
        queryFn: () => PrometheusApi.fetchTcpActiveFlowsByService()
      }
    ]
  });

  const handleSetServiceFilters = useCallback((params: RequestOptions) => {
    startTransition(() => {
      setServicesQueryParams((previousQueryParams) => ({ ...previousQueryParams, ...params }));
    });
  }, []);

  const services = servicesData?.results || [];
  const serviceCount = servicesData?.timeRangeCount || 0;

  const serviceRows = ServicesController.extendServicesWithActiveAndTotalFlowPairs(services, {
    tcpActiveFlows
  });

  return (
    <MainContainer
      dataTestId={getTestsIds.servicesView()}
      title={ServicesLabels.Section}
      description={ServicesLabels.Description}
      mainContentChildren={
        <>
          <SkSearchFilter onSearch={handleSetServiceFilters} selectOptions={servicesSelectOptions} />

          <SkTable
            rows={serviceRows}
            columns={ServiceColumns}
            pagination={true}
            paginationPageSize={initOldConnectionsQueryParams.limit}
            onGetFilters={handleSetServiceFilters}
            paginationTotalRows={serviceCount}
            customCells={customServiceCells}
          />
        </>
      }
    />
  );
};

export default Services;
