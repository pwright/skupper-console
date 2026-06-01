
The build errors are coming from the mock JSON files being emptied.

With resolveJsonModule: true, TypeScript infers JSON types directly from the file contents. So this:

{
  "results": [],
  "count": 0,
  "timeRangeCount": 0
}
is inferred as:

{
  results: never[];
  count: number;
  timeRangeCount: number;
}
That means results[0] has type never, so TypeScript quite reasonably says:

Property 'sourceProcessName' does not exist on type 'never'
The failing mappings are:

ServiceHttpRequests.spec.tsx imports mocks/data/HTTP_REQUESTS.json

currently results: []
test expects results[0].sourceProcessName
ServiceTcpConnections.spec.tsx and SkBiFlowDetails.spec.tsx import mocks/data/TCP_CONNECTIONS.json

currently results: []
tests expect sourceSiteName, identity, protocol, etc.
ServicePairList.spec.tsx imports mocks/data/PROCESS_PAIRS.json

currently results: []
test expects results[7].sourceName
So the short version: the mocks are valid empty API responses, but these tests are written as fixture-backed tests and require populated mock rows at compile time.

Also, mocks/dataMap.ts casts the JSON into typed response wrappers for Mirage, but these tests import the JSON files directly, so those casts do not help them.