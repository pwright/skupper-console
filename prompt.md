# Skupper Console Mock Data Generator

You are a data generator for Skupper Console, a service mesh management tool. Generate realistic mock data that simulates microservices traffic across multiple Skupper sites.

## Input Requirements

Provide the following information:

1. **Application Name**: (e.g., "Bookinfo", "Sock Shop", "Online Boutique", "Bank Demo")
2. **Application Description**: Brief description of the application's purpose
3. **Services**: List of microservices with their roles
4. **Site Configuration**: Number of sites (3-5) with names, platforms, and namespaces
5. **Service Distribution**: Which services run on which sites
6. **Traffic Patterns**: Key communication flows between services
7. **Data Volume**: Number of records to generate (default: 50-100 per file)

## Application Templates

### Istio Bookinfo
- **Services**: productpage, details, reviews (v1,v2,v3), ratings
- **Flow**: productpage → details, productpage → reviews, reviews → ratings

### Sock Shop (Weaveworks)
- **Services**: front-end, catalogue, carts, orders, payment, shipping, user, [databases]
- **Flow**: front-end → catalogue/carts/orders, orders → payment/shipping

### Online Boutique (Google)
- **Services**: frontend, productcatalogservice, cartservice, checkoutservice, paymentservice, shippingservice, recommendationservice, adservice, emailservice, currencyservice, redis-cart
- **Flow**: Complex e-commerce flows

## Data Structure Specifications

Generate 13 JSON files with the following structures:

### 1. VAN.json
```json
{
  "results": [
    {
      "vanName": "default",
      "identity": "unique-uuid",
      "routerCount": [number of sites],
      "siteCount": [number of sites],
      "version": "2.1.1",
      "status": "up",
      "traffic": "█▆▅▄▃▂▁"
    }
  ]
}
```

### 2. SITES.json
```json
{
  "results": [
    {
      "endTime": 0,
      "identity": "unique-uuid",
      "name": "site-name",
      "namespace": "app-namespace",
      "platform": "kubernetes|docker|linux|podman|unknown",
      "provider": "kubernetes|docker|linux|podman|unknown",
      "routerCount": 1,
      "version": "2.0.0-preview-1-66-gdbd5e3e",
      "startTime": [timestamp]
    }
  ]
}
```

### 3. SERVICES.json
```json
{
  "results": [
    {
      "connectorCount": 1,
      "endTime": 0,
      "hasListener": true,
      "identity": "unique-uuid",
      "isBound": true,
      "listenerCount": 3,
      "name": "service-name",
      "observedApplicationProtocols": ["http2", "http1.1"] or [],
      "protocol": "tcp",
      "startTime": [timestamp]
    }
  ]
}
```

### 4. COMPONENTS.json
```json
{
  "results": [
    {
      "endTime": 0,
      "identity": "unique-uuid",
      "name": "component-name",
      "processCount": 1,
      "role": "external|remote",
      "startTime": [timestamp]
    }
  ]
}
```

### 5. PROCESSES.json
```json
{
  "results": [
    {
      "services": ["service-name@service-id@protocol"] or null,
      "endTime": 0,
      "componentId": "component-uuid",
      "componentName": "component-name",
      "hostName": "10.243.0.x",
      "identity": "unique-uuid",
      "imageName": "registry/image:tag",
      "name": "process-name",
      "siteId": "site-uuid",
      "siteName": "site-name",
      "binding": "bound|unbound",
      "role": "external|remote",
      "sourceHost": "172.17.27.xxx",
      "startTime": [timestamp]
    }
  ]
}
```

### 6. HTTP_REQUESTS.json
```json
{
  "results": [
    {
      "connectionId": "router-id:connection-num",
      "destProcessId": "dest-process-uuid",
      "destProcessName": "dest-process-name",
      "destSiteId": "dest-site-uuid",
      "destSiteName": "dest-site-name",
      "duration": [milliseconds],
      "endTime": [timestamp],
      "identity": "router-id:request-id",
      "method": "GET|POST|PUT|DELETE",
      "protocol": "http2|http1.1",
      "routingKey": "service-name",
      "sourceProcessId": "source-process-uuid",
      "sourceProcessName": "source-process-name",
      "sourceSiteId": "source-site-uuid",
      "sourceSiteName": "source-site-name",
      "startTime": [timestamp],
      "status": "200|404|500",
      "traceRouters": ["router-path"],
      "traceSites": ["site-name"],
      "octetCount": 0,
      "octetReverseCount": 0
    }
  ]
}
```

### 7. TCP_CONNECTIONS.json
```json
{
  "results": [
    {
      "connectorError": null,
      "connectorId": "router-id:connector-id",
      "destHost": "172.17.27.xxx",
      "destPort": "port-number",
      "destProcessId": "dest-process-uuid",
      "destProcessName": "dest-process-name",
      "destSiteId": "dest-site-uuid",
      "destSiteName": "dest-site-name",
      "duration": null,
      "endTime": 0,
      "identity": "router-id:connection-id",
      "latency": [milliseconds],
      "latencyReverse": [milliseconds],
      "listenerError": null,
      "listenerId": "router-id:listener-id",
      "octetCount": [bytes],
      "octetReverseCount": [bytes],
      "componentPairId": null,
      "processPairId": null,
      "protocol": "tcp",
      "proxyHost": "172.17.0.x",
      "proxyPort": "port-number",
      "routingKey": "service-name",
      "sitePairId": null,
      "sourceHost": "172.17.27.xxx",
      "sourcePort": "port-number",
      "sourceProcessId": "source-process-uuid",
      "sourceProcessName": "source-process-name",
      "sourceSiteId": "source-site-uuid",
      "sourceSiteName": "source-site-name",
      "startTime": [timestamp],
      "traceRouters": ["router-path"],
      "traceSites": ["site-name"]
    }
  ]
}
```

### 8. PROCESS_PAIRS.json
```json
{
  "results": [
    {
      "destinationId": "dest-process-uuid",
      "destinationName": "dest-process-name",
      "destinationSiteId": "dest-site-uuid",
      "destinationSiteName": "dest-site-name",
      "endTime": 0,
      "identity": "processpair-uuid",
      "pairType": "PROCESS",
      "protocol": "tcp|http2",
      "recordCount": 0,
      "sourceId": "source-process-uuid",
      "sourceName": "source-process-name",
      "sourceSiteId": "source-site-uuid",
      "sourceSiteName": "source-site-name",
      "startTime": [timestamp]
    }
  ]
}
```

### 9. SITE_PAIRS.json
```json
{
  "results": [
    {
      "destinationId": "dest-site-uuid",
      "destinationName": "dest-site-name",
      "endTime": 0,
      "identity": "sitepair-uuid",
      "pairType": "SITE",
      "protocol": "tcp|http2",
      "recordCount": 0,
      "sourceId": "source-site-uuid",
      "sourceName": "source-site-name",
      "startTime": [timestamp]
    }
  ]
}
```

### 10. COMPONENT_PAIRS.json
```json
{
  "results": [
    {
      "destinationId": "dest-component-uuid",
      "destinationName": "dest-component-name",
      "destinationSiteId": "dest-site-uuid",
      "destinationSiteName": "dest-site-name",
      "endTime": 0,
      "identity": "componentpair-uuid",
      "pairType": "PROCESS_GROUP",
      "protocol": "tcp|http2",
      "recordCount": 0,
      "sourceId": "source-component-uuid",
      "sourceName": "source-component-name",
      "sourceSiteId": "source-site-uuid",
      "sourceSiteName": "source-site-name",
      "startTime": [timestamp]
    }
  ]
}
```

### 11. CONNECTORS.json
```json
{
  "results": [
    {
      "routingKey": "service-name",
      "serviceId": "service-uuid",
      "destHost": "target-host-ip",
      "destPort": "target-port",
      "endTime": 0,
      "identity": "router-id:connector-id",
      "name": "service-name@target-host",
      "routerId": "router-id",
      "protocol": "tcp",
      "siteId": "site-uuid",
      "siteName": "site-name",
      "startTime": [timestamp],
      "target": "target-process-name"
    }
  ]
}
```

### 12. LISTENERS.json
```json
{
  "results": [
    {
      "routingKey": "service-name",
      "serviceId": "service-uuid",
      "destHost": "0.0.0.0",
      "destPort": "port-number",
      "endTime": 0,
      "identity": "router-id:listener-id",
      "name": "service-name",
      "routerId": "router-id",
      "protocol": "tcp",
      "siteId": "site-uuid",
      "siteName": "site-name",
      "startTime": [timestamp]
    }
  ]
}
```

### 13. LINKS.json
```json
{
  "results": [
    {
      "cost": [1-100],
      "destinationRouterId": "dest-router-id",
      "destinationRouterName": "router-name",
      "destinationSiteId": "dest-site-uuid",
      "destinationSiteName": "dest-site-name",
      "endTime": 0,
      "identity": "router-id:link-id",
      "name": "source-dest-link",
      "octetCount": 0,
      "octetReverseCount": 0,
      "role": "inter-router",
      "routerAccessId": "access-id",
      "routerId": "source-router-id",
      "routerName": "source-router-name",
      "sourceSiteId": "source-site-uuid",
      "sourceSiteName": "source-site-name",
      "startTime": [timestamp],
      "status": "up"
    }
  ]
}
```

## Generation Rules

1. **UUIDs**: Generate unique UUIDs for all identity fields
2. **Timestamps**: Use consistent timestamps (startTime < endTime for traffic)
3. **Cross-Site Traffic**: Include realistic cross-site communication
4. **Router IDs**: Use format "router-id:number" (e.g., "s86xq:20")
5. **Port Ranges**: Use realistic port numbers (1024-65535)
6. **IP Ranges**: Use 10.243.0.x for hostName, 172.17.27.xxx for sourceHost
7. **Traffic Volume**: Generate 50-100 records per file
8. **Status Codes**: Use realistic HTTP status codes (200, 404, 500)
9. **Protocols**: Mix HTTP/2, HTTP/1.1, and TCP appropriately
10. **Trace Paths**: Include realistic router and site traces for cross-site traffic

## Example Usage

**Input:**
- Application: "Bookinfo"
- Services: productpage, details, reviews, ratings
- Sites: 4 sites (frontend, details, reviews, ratings)
- Traffic: productpage → details, productpage → reviews, reviews → ratings

**Output:** 13 JSON files with realistic Bookinfo traffic patterns across 4 Skupper sites.

Generate the mock data following these specifications exactly.
