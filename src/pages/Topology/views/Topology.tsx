import { MouseEvent as ReactMouseEvent, useRef, useState } from 'react';

import { Card, CardBody, Tab, Tabs, TabTitleText, Alert, Button } from '@patternfly/react-core';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import { useVanSelection } from '../../../contexts/VanSelectionContext';
import useUpdateQueryStringValueWithoutNavigation from '../../../hooks/useUpdateQueryStringValueWithoutNavigation';
import MainContainer from '../../../layout/MainContainer';
import { ComponentRoutesPaths } from '../../Components/Components.enum';
import { ProcessesRoutesPaths } from '../../Processes/Processes.enum';
import { SitesRoutesPaths } from '../../Sites/Sites.enum';
import { DashboardRoutesPaths } from '../../Dashboard/Dashboard.enum';
import TopologyComponent from '../components/TopologyComponent';
import TopologyProcesses from '../components/TopologyProcesses';
import TopologySite from '../components/TopologySite';
import { TopologyController } from '../services';
import { TopologyURLQueyParams, TopologyViews } from '../Topology.enum';

const links: Record<string, { linkToPage: string; linkLabel: string }> = {
  [TopologyViews.Sites]: { linkToPage: SitesRoutesPaths.Sites, linkLabel: Labels.ListView },
  [TopologyViews.Components]: { linkToPage: ComponentRoutesPaths.Components, linkLabel: Labels.ListView },
  [TopologyViews.Processes]: { linkToPage: ProcessesRoutesPaths.Processes, linkLabel: Labels.ListView }
};

const Topology = function () {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedVan, isVanSelected } = useVanSelection();

  const serviceIdsString = useRef(searchParams.get(TopologyURLQueyParams.ServiceId) || undefined);
  const idsString = useRef(searchParams.get(TopologyURLQueyParams.IdSelected) || undefined);
  const type = searchParams.get(TopologyURLQueyParams.Type);

  const [tabSelected, setTabSelected] = useState<string>(type || TopologyViews.Sites);

  useUpdateQueryStringValueWithoutNavigation(TopologyURLQueyParams.Type, tabSelected, true);

  function handleChangeTab(_: ReactMouseEvent<HTMLElement, MouseEvent>, tabIndex: string | number) {
    setTabSelected(tabIndex as string);
    idsString.current = undefined;
    serviceIdsString.current = undefined;
  }

  const serviceIds = TopologyController.transformStringIdsToIds(serviceIdsString.current);
  // IdsSting can be a site,component, process or a pairs. Avoid pairs IDS to be selected from URL
  const ids = TopologyController.transformStringIdsToIds(idsString.current);

  // If no VAN is selected, show a message to select one
  if (!isVanSelected) {
    return (
      <MainContainer
        dataTestId={getTestsIds.topologyView()}
        title={Labels.Topology}
        description="Please select a Virtual Application Network to view its topology"
        hasMainContentPadding
        mainContentChildren={
          <Card>
            <CardBody>
              <Alert
                variant="info"
                title="No VAN Selected"
              >
                <p>
                  You need to select a Virtual Application Network from the dashboard to view its topology.
                </p>
                <p>
                  Click the button below to go back to the dashboard and select a VAN.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => navigate(DashboardRoutesPaths.Dashboard)}
                  style={{ marginTop: '1rem' }}
                >
                  Go to Dashboard
                </Button>
              </Alert>
            </CardBody>
          </Card>
        }
      />
    );
  }

  return (
    <MainContainer
      dataTestId={getTestsIds.topologyView()}
      title={`${Labels.Topology} - ${selectedVan?.vanName}`}
      description={`Viewing topology for ${selectedVan?.vanName} network`}
      hasMainContentPadding
      link={links[tabSelected].linkToPage}
      linkLabel={links[tabSelected].linkLabel}
      iconName="listIcon"
      navigationComponent={
        <div>
          {/* VAN Selection Info */}
          <Card style={{ marginBottom: '1rem' }}>
            <CardBody>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Selected VAN:</strong> {selectedVan?.vanName} 
                  <span style={{ marginLeft: '1rem', color: '#666' }}>
                    (Status: {selectedVan?.status}, Version: {selectedVan?.version})
                  </span>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate(DashboardRoutesPaths.Dashboard)}
                >
                  Change VAN
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Topology Tabs */}
          <Tabs activeKey={tabSelected} onSelect={handleChangeTab}>
            <Tab eventKey={TopologyViews.Sites} title={<TabTitleText>{TopologyViews.Sites}</TabTitleText>} />
            <Tab eventKey={TopologyViews.Components} title={<TabTitleText>{TopologyViews.Components}</TabTitleText>} />
            <Tab eventKey={TopologyViews.Processes} title={<TabTitleText>{TopologyViews.Processes}</TabTitleText>} />
          </Tabs>
        </div>
      }
      mainContentChildren={
        <>
          {tabSelected === TopologyViews.Sites && (
            <Card isFullHeight isPlain>
              <CardBody>
                <TopologySite ids={ids} />
              </CardBody>
            </Card>
          )}
          {tabSelected === TopologyViews.Components && (
            <Card isFullHeight isPlain>
              <CardBody>
                <TopologyComponent ids={ids} />
              </CardBody>
            </Card>
          )}
          {tabSelected === TopologyViews.Processes && (
            <Card isFullHeight isPlain>
              <CardBody>
                <TopologyProcesses serviceIds={serviceIds} ids={ids} />
              </CardBody>
            </Card>
          )}
        </>
      }
    />
  );
};

export default Topology;
