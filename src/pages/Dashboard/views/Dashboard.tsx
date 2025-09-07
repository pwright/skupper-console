import { Card, CardBody, CardHeader, CardTitle, Grid, GridItem, Title } from '@patternfly/react-core';

import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import MainContainer from '../../../layout/MainContainer';
import { useVanData } from '../hooks/useVanData';

const Dashboard = function () {
  const { vanData, loading, error } = useVanData();

  return (
    <MainContainer
      dataTestId={getTestsIds.dashboardView()}
      title={Labels.Dashboard}
      description="Virtual Application Networks Overview"
      hasMainContentPadding
      mainContentChildren={
        <div>
          <Title headingLevel="h2" size="lg" style={{ marginBottom: '2rem' }}>
            Virtual Application Networks
          </Title>

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
                  <Card>
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
