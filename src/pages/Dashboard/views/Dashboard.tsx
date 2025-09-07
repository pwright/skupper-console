import { Card, CardBody, CardHeader, CardTitle, Grid, GridItem, Title, Button } from '@patternfly/react-core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import { useVanSelection } from '../../../contexts/VanSelectionContext';
import MainContainer from '../../../layout/MainContainer';
import { useVanData } from '../hooks/useVanData';
import { TopologyRoutesPaths } from '../../Topology/Topology.enum';

const Dashboard = function () {
  const { vanData, loading, error } = useVanData();
  const { selectedVan, setSelectedVan, setAvailableVans } = useVanSelection();
  const navigate = useNavigate();

  // Update available VANs when data loads
  React.useEffect(() => {
    if (vanData.length > 0) {
      setAvailableVans(vanData);
    }
  }, [vanData, setAvailableVans]);

  const handleVanSelect = (van: any) => {
    setSelectedVan(van);
    // Navigate to topology view with the selected VAN
    navigate(TopologyRoutesPaths.Topology);
  };

  return (
    <MainContainer
      dataTestId={getTestsIds.dashboardView()}
      title={Labels.Dashboard}
      description="Select a Virtual Application Network to view its details"
      hasMainContentPadding
      mainContentChildren={
        <div>
          <Title headingLevel="h2" size="lg" style={{ marginBottom: '2rem' }}>
            Virtual Application Networks
          </Title>

          {/* Selected VAN Display */}
          {selectedVan && (
            <Card style={{ marginBottom: '2rem', backgroundColor: '#f0f0f0' }}>
              <CardHeader>
                <CardTitle>Currently Selected: {selectedVan.vanName}</CardTitle>
              </CardHeader>
              <CardBody>
                <p>You are viewing data for the <strong>{selectedVan.vanName}</strong> network.</p>
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedVan(null)}
                  style={{ marginTop: '1rem' }}
                >
                  Clear Selection
                </Button>
              </CardBody>
            </Card>
          )}

          {/* Loading State */}
          {loading && (
            <Card>
              <CardBody>
                <p>Loading VAN information...</p>
              </CardBody>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card>
              <CardBody>
                <p style={{ color: 'red' }}>Error loading VAN data: {error}</p>
              </CardBody>
            </Card>
          )}

          {/* VAN Cards */}
          {vanData.length > 0 && (
            <Grid hasGutter>
              {vanData.map((van, index) => (
                <GridItem key={van.identity || index} span={12} md={6} lg={4}>
                  <Card 
                    isSelectable
                    isSelected={selectedVan?.identity === van.identity}
                    style={{ 
                      cursor: 'pointer',
                      border: selectedVan?.identity === van.identity ? '2px solid #0066cc' : '1px solid #d2d2d2'
                    }}
                    onClick={() => handleVanSelect(van)}
                  >
                    <CardHeader>
                      <CardTitle>{van.vanName}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Grid hasGutter>
                        <GridItem span={6}>
                          <div>
                            <strong>Status:</strong> {van.status}
                          </div>
                        </GridItem>
                        <GridItem span={6}>
                          <div>
                            <strong>Version:</strong> {van.version}
                          </div>
                        </GridItem>
                        <GridItem span={6}>
                          <div>
                            <strong>Sites:</strong> {van.siteCount}
                          </div>
                        </GridItem>
                        <GridItem span={6}>
                          <div>
                            <strong>Routers:</strong> {van.routerCount}
                          </div>
                        </GridItem>
                        <GridItem span={12}>
                          <div>
                            <strong>Identity:</strong> {van.identity}
                          </div>
                        </GridItem>
                      </Grid>
                      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <Button 
                          variant="primary" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVanSelect(van);
                          }}
                        >
                          Select & View Topology
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          )}

          {/* No Data State */}
          {!loading && !error && vanData.length === 0 && (
            <Card>
              <CardBody>
                <p>No Virtual Application Networks found.</p>
              </CardBody>
            </Card>
          )}
        </div>
      }
    />
  );
};

export default Dashboard;
