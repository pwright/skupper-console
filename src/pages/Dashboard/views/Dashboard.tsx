import { Card, CardBody, CardHeader, CardTitle, Grid, GridItem, Title } from '@patternfly/react-core';
import { Link } from 'react-router-dom';

import { Labels } from '../../../config/labels';
import { getTestsIds } from '../../../config/testIds';
import MainContainer from '../../../layout/MainContainer';
import { ComponentRoutesPaths } from '../../Components/Components.enum';
import { ProcessesRoutesPaths } from '../../Processes/Processes.enum';
import { ServicesRoutesPaths } from '../../Services/Services.enum';
import { SitesRoutesPaths } from '../../Sites/Sites.enum';
import { TopologyRoutesPaths } from '../../Topology/Topology.enum';

const Dashboard = function () {
  const navigationCards = [
    {
      title: 'Topology View',
      description: 'Visualize your network topology with interactive graphs showing sites, components, and processes',
      link: TopologyRoutesPaths.Topology,
      icon: 'topologyIcon'
    },
    {
      title: 'Services',
      description: 'Manage and monitor your services, including HTTP requests and TCP connections',
      link: ServicesRoutesPaths.Services,
      icon: 'listIcon'
    },
    {
      title: 'Sites',
      description: 'View and manage your sites and their configurations',
      link: SitesRoutesPaths.Sites,
      icon: 'listIcon'
    },
    {
      title: 'Components',
      description: 'Monitor individual components and their performance metrics',
      link: ComponentRoutesPaths.Components,
      icon: 'listIcon'
    },
    {
      title: 'Processes',
      description: 'Track processes and their relationships across your network',
      link: ProcessesRoutesPaths.Processes,
      icon: 'listIcon'
    }
  ];

  return (
    <MainContainer
      dataTestId={getTestsIds.dashboardView()}
      title={Labels.Dashboard}
      description="Welcome to Skupper Console. Select a view to explore your network topology and manage your services."
      hasMainContentPadding
      mainContentChildren={
        <div>
          <Title headingLevel="h2" size="lg" style={{ marginBottom: '2rem' }}>
            Network Overview
          </Title>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Navigate to different sections to view detailed information about your Skupper network:
          </p>

          <Grid hasGutter>
            {navigationCards.map((card, index) => (
              <GridItem key={index} span={12} md={6} lg={4}>
                <Card>
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p style={{ marginBottom: '1rem' }}>{card.description}</p>
                    <Link to={card.link} style={{ fontWeight: 'bold' }}>
                      Go to {card.title} →
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </div>
      }
    />
  );
};

export default Dashboard;
