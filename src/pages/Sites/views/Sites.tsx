import { BIG_PAGINATION_SIZE } from '../../../config/app';
import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import SkTable from '../../../core/components/SkTable';
import MainContainer from '../../../layout/MainContainer';
import WithVanSelection from '../../../components/WithVanSelection';
import { useVanSelection } from '../../../contexts/VanSelectionContext';
import { TopologyRoutesPaths, TopologyViews } from '../../Topology/Topology.enum';
import { useSitesData } from '../hooks/useSitesData';
import { customSiteCells, siteColumns } from '../Sites.constants';

const Sites = function () {
  const { selectedVan } = useVanSelection();
  const { sites } = useSitesData();

  return (
    <MainContainer
      dataTestId={getTestsIds.sitesView()}
      title={`${Labels.Sites} - ${selectedVan?.vanName || 'No VAN Selected'}`}
      description={`Viewing sites for ${selectedVan?.vanName || 'selected'} network`}
      link={`${TopologyRoutesPaths.Topology}?type=${TopologyViews.Sites}`}
      mainContentChildren={
        <WithVanSelection 
          title={Labels.Sites}
          description="Please select a Virtual Application Network to view its sites"
        >
          <SkTable
            columns={siteColumns}
            rows={sites}
            paginationPageSize={BIG_PAGINATION_SIZE}
            pagination={true}
            customCells={customSiteCells}
          />
        </WithVanSelection>
      }
    />
  );
};

export default Sites;
