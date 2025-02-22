import { FC, ReactElement, Suspense } from 'react';

import {
  Divider,
  Flex,
  PageGroup,
  PageNavigation,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  TextVariants,
  Title
} from '@patternfly/react-core';

import LoadingPage from '@pages/shared/Loading';
import { TopologyLabels } from '@pages/Topology/Topology.enum';

import NavigationViewLink from '../core/components/NavigationViewLink';
import TransitionPage from '../core/components/TransitionPages/Fade';

import '@patternfly/patternfly/patternfly-addons.css';
import '@patternfly/patternfly/patternfly-charts-theme-dark.css';

interface MainContainerProps {
  dataTestId?: string;
  title?: string;
  link?: string;
  linkLabel?: string;
  description?: string;
  isPlain?: boolean;
  hasMainContentPadding?: boolean;
  navigationComponent?: ReactElement;
  mainContentChildren?: ReactElement;
}

const MainContainer: FC<MainContainerProps> = function ({
  dataTestId,
  title,
  link,
  linkLabel = TopologyLabels.TopologyView,
  description,
  hasMainContentPadding = false,
  navigationComponent,
  mainContentChildren
}) {
  return (
    <TransitionPage>
      <PageGroup data-testid={dataTestId}>
        {title && (
          <PageSection role="sk-heading" variant={PageSectionVariants.light}>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <TextContent>
                <Title headingLevel="h1">{title}</Title>
                {description && <Text component={TextVariants.p}>{description}</Text>}
              </TextContent>
              {link && <NavigationViewLink link={link} linkLabel={linkLabel} />}
            </Flex>
          </PageSection>
        )}

        {navigationComponent && (
          <>
            <PageNavigation className="pf-v5-u-py-0 pf-v5-u-px-xl">
              <Flex>{navigationComponent}</Flex>
            </PageNavigation>
            <Divider />
          </>
        )}
        {mainContentChildren && (
          <PageSection padding={{ default: hasMainContentPadding ? 'noPadding' : 'padding' }} isFilled={true}>
            <Suspense fallback={<LoadingPage />}>{mainContentChildren} </Suspense>
          </PageSection>
        )}
      </PageGroup>
    </TransitionPage>
  );
};

export default MainContainer;
