export enum ServicesRoutesPaths {
  Services = '/services'
}

export enum QueriesServices {
  GetFlowPair = 'services-flowpair-query',
  GetFlowPairsByService = 'services-flowpairs-by-service-query',
  GetProcessesByService = 'processes-by-service-query',
  GetTcpByteRateByService = 'tcp-byterate-by-service-query',
  GetServices = 'services-query',
  GetPrometheusActiveFlows = 'services-get-prometheus-active-flows',
  GetPrometheusTcpTotalFlows = 'services-get-tcp-prometheus-total-flows',
  GetPrometheusHttpTotalFlows = 'services-get-http-prometheus-total-flows',
  GetResourcePairsByService = 'services-get-resource-pair-by-service',
  GetProcessPairsByService = 'services-get-process-pairs-by-service'
}

// LABELS
export enum ServicesLabels {
  Section = 'Services',
  HTTP = ' HTTP/2',
  TCP = 'TCP',
  Description = 'Set of processes that are exposed across the Virtual Application Network.',
  MetricDestinationProcessFilter = 'All servers',
  ActiveConnections = 'Live connections',
  OldConnections = 'Connection history',
  TcpTrafficTx = 'Outbound traffic ',
  TcpTrafficRx = 'Inbound traffic',
  TcpAvgByteRateRx = 'Avg. inbound speed',
  TcpAvgByteRateTx = 'Avg. outbound speed',
  Clients = 'Clients',
  Requests = 'Requests',
  TrafficTx = 'Response Traffic ',
  TrafficRx = 'Request traffic',
  AvgByteRateRx = 'Avg. rate responses',
  AvgByteRateTx = 'Avg. rate requests',
  Overview = 'Overview',
  Servers = 'Exposed servers',
  SankeyChartTitle = 'Distribution of flows',
  SankeyChartDescription = 'Sankey diagram to visualize the relationships between processes and/or sites',
  Name = 'Address',
  Protocol = 'Protocol',
  CurrentFlowPairs = 'Active',
  TotalFLowPairs = 'Total'
}