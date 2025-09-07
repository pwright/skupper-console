import { BIG_PAGINATION_SIZE } from '../../../config/app';
import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import SkTable from '../../../core/components/SkTable';
import MainContainer from '../../../layout/MainContainer';
import WithVanSelection from '../../../components/WithVanSelection';
import { useVanSelection } from '../../../contexts/VanSelectionContext';
import { TopologyRoutesPaths, TopologyViews } from '../../Topology/Topology.enum';
import { CustomComponentCells, ComponentColumns } from '../Components.constants';
import { useComponentsData } from '../hooks/useComponentsData';

const Components = function () {
  const { selectedVan } = useVanSelection();
  const {
    components,
    summary: { componentCount },
    handleGetFilters
  } = useComponentsData();

  return (
    <MainContainer
      dataTestId={getTestsIds.componentsView()}
      title={`${Labels.Components} - ${selectedVan?.vanName || 'No VAN Selected'}`}
      description={`Viewing components for ${selectedVan?.vanName || 'selected'} network`}
      link={`${TopologyRoutesPaths.Topology}?type=${TopologyViews.Components}`}
      mainContentChildren={
        <WithVanSelection 
          title={Labels.Components}
          description="Please select a Virtual Application Network to view its components"
        >
          <SkTable
            columns={ComponentColumns}
            rows={components}
            pagination={true}
            paginationPageSize={BIG_PAGINATION_SIZE}
            paginationTotalRows={componentCount}
            onGetFilters={handleGetFilters}
            customCells={CustomComponentCells}
          />
        </WithVanSelection>
      }
    />
  );
};

export default Components;
