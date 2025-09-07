import React from 'react';
import { Alert, Button, Card, CardBody } from '@patternfly/react-core';
import { useNavigate } from 'react-router-dom';
import { useVanSelection } from '../contexts/VanSelectionContext';
import { DashboardRoutesPaths } from '../pages/Dashboard/Dashboard.enum';

interface WithVanSelectionProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const WithVanSelection: React.FC<WithVanSelectionProps> = ({ 
  children, 
  title, 
  description = "Please select a Virtual Application Network to view this section" 
}) => {
  const { isVanSelected } = useVanSelection();
  const navigate = useNavigate();

  if (!isVanSelected) {
    return (
      <Card>
        <CardBody>
          <Alert
            variant="info"
            title={`${title} - No VAN Selected`}
          >
            <p>{description}</p>
            <p>Click the button below to go back to the dashboard and select a VAN.</p>
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
    );
  }

  return <>{children}</>;
};

export default WithVanSelection;
