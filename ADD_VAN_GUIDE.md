# Adding New VAN Files

To add a new VAN.json file to the dashboard, follow these simple steps:

## 1. Create the VAN Directory and File
```bash
mkdir -p mocks/VAN4
cat > mocks/VAN4/VAN.json << 'EOF'
{
  "results": [
    {
      "vanName": "van4",
      "identity": "88c2efa0-5fbc-4fe4-bba8-530e775bb2f6",
      "routerCount": 4,
      "siteCount": 4,
      "version": "2.3.0",
      "status": "up"
    }
  ]
}
