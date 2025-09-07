import { BIG_PAGINATION_SIZE } from '../../../config/app';
import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import SkTable from '../../../core/components/SkTable';
import SkSearchFilter from '../../../core/components/SkTable/SkSearchFilter';
import MainContainer from '../../../layout/MainContainer';
import WithVanSelection from '../../../components/WithVanSelection';
import { useVanSelection } from '../../../contexts/VanSelectionContext';
import { TopologyRoutesPaths, TopologyViews } from '../../Topology/Topology.enum';
import { useProcessesData } from '../hooks/useProcessesData';
import { CustomProcessCells, processesSelectOptions, processesTableColumns } from '../Processes.constants';

const Processes = function () {
  const { selectedVan } = useVanSelection();
  const {
    processes,
    summary: { processCount },
    handleGetFilters
  } = useProcessesData();

  return (
    <MainContainer
      dataTestId={getTestsIds.processesView()}
      title={`${Labels.Processes} - ${selectedVan?.vanName || 'No VAN Selected'}`}
      description={`Viewing processes for ${selectedVan?.vanName || 'selected'} network`}
      link={`${TopologyRoutesPaths.Topology}?type=${TopologyViews.Processes}`}
      mainContentChildren={
        <WithVanSelection 
          title={Labels.Processes}
          description="Please select a Virtual Application Network to view its processes"
        >
          <SkSearchFilter onSearch={handleGetFilters} selectOptions={processesSelectOptions} />

          <SkTable
            columns={processesTableColumns}
            rows={processes}
            pagination={true}
            paginationPageSize={BIG_PAGINATION_SIZE}
            paginationTotalRows={processCount}
            onGetFilters={handleGetFilters}
            customCells={CustomProcessCells}
          />
        </WithVanSelection>
      }
    />
  );
};

export default Processes;
