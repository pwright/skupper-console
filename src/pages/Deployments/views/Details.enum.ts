export enum DeploymentDetailsColumns {
    ServiceName = 'Service',
    Ip = 'IP',
    BytesIn = 'Bytes In',
    BytesOut = 'Bytes Out',
    Requests = 'Requests',
    MaxLatency = 'Max Latency',
}

export enum DeploymentDetailsColumnsLabels {
    HTTPrequestsIn = 'HTTP Requests Received',
    HTTPrequestsOut = 'HTTP Requests Sent',
    TCPconnectionsIn = 'Inbound TCP Connections',
    TCPconnectionsOut = 'Outbound TCP Connections',
}
