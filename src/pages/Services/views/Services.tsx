import { BIG_PAGINATION_SIZE } from '../../../config/app';
import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import SkTable from '../../../core/components/SkTable';
import SkSearchFilter from '../../../core/components/SkTable/SkSearchFilter';
import MainContainer from '../../../layout/MainContainer';
import WithVanSelection from '../../../components/WithVanSelection';
import { useVanSelection } from '../../../contexts/VanSelectionContext';
import useServicesData from '../hooks/useServicesData';
import { ServiceColumns, customServiceCells, servicesSelectOptions } from '../Services.constants';

const Services = function () {
  const { selectedVan } = useVanSelection();
  const {
    services,
    summary: {},
    handleSetServiceFilters
  } = useServicesData({ limit: BIG_PAGINATION_SIZE });

  return (
    <MainContainer
      dataTestId={getTestsIds.servicesView()}
      title={`${Labels.Services} - ${selectedVan?.vanName || 'No VAN Selected'}`}
      description={`Viewing services for ${selectedVan?.vanName || 'selected'} network`}
      mainContentChildren={
        <WithVanSelection 
          title={Labels.Services}
          description="Please select a Virtual Application Network to view its services"
        >
          <SkSearchFilter onSearch={handleSetServiceFilters} selectOptions={servicesSelectOptions} />

          <SkTable
            rows={services}
            columns={ServiceColumns}
            pagination={true}
            paginationPageSize={BIG_PAGINATION_SIZE}
            customCells={customServiceCells}
          />
        </WithVanSelection>
      }
    />
  );
};

export default Services;
