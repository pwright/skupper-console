export const getTestsIds = {
  loadingView: () => 'sk-loading-view',
  header: () => 'sk-header',
  sitesView: () => 'sk-sites-view',
  componentsView: () => 'sk-components-view',
  processesView: () => 'sk-processes-view',
  servicesView: () => 'sk-services-view',
  notFoundView: () => `sk-not-found-view`,
  siteView: (id: string) => `sk-site-view-${id}`,
  componentView: (id: string) => `sk-component-view-${id}`,
  processView: (id: string) => `sk-process-view-${id}`,
  navbarComponent: () => 'sk-nav-bar-component',
  breadcrumbComponent: () => 'sk-breadcrumb'
};
