import base64
import json
import ssl
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path  
  
BASE     = sys.argv[1]   # https://my-observer-host/api/v2alpha1  
USERNAME = sys.argv[2] if len(sys.argv) > 2 else None  
PASSWORD = sys.argv[3] if len(sys.argv) > 3 else None  
  
# Skip TLS verification for self-signed certs  
ctx = ssl.create_default_context()  
ctx.check_hostname = False  
ctx.verify_mode = ssl.CERT_NONE  
  
opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx))


def fetch_json(url):
    headers = {}
    if USERNAME and PASSWORD:
        token = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
        headers["Authorization"] = f"Basic {token}"

    req = urllib.request.Request(url, headers=headers)
    try:
        with opener.open(req) as resp:
            return json.loads(resp.read())
    except urllib.error.URLError as exc:
        if not isinstance(exc.reason, ssl.SSLError):
            raise

    cmd = ["curl", "-fsSk", "--connect-timeout", "10"]
    if USERNAME and PASSWORD:
        cmd.extend(["-u", f"{USERNAME}:{PASSWORD}"])
    cmd.append(url)
    completed = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return json.loads(completed.stdout)
  
RESOURCES = [  
    ("sites",            "SITES"),  
    ("routerlinks",      "LINKS"),  
    ("components",       "COMPONENTS"),  
    ("processes",        "PROCESSES"),  
    ("services",         "SERVICES"),  
    ("listeners",        "LISTENERS"),  
    ("connectors",       "CONNECTORS"),  
    ("connections",      "TCP_CONNECTIONS"),  
    ("applicationflows", "HTTP_REQUESTS"),  
    ("sitepairs",        "SITE_PAIRS"),  
    ("componentpairs",   "COMPONENT_PAIRS"),  
    ("processpairs",     "PROCESS_PAIRS"),  
]  
  
OUT_DIR = Path("mocks/data")  
LIMIT = 200  
OUT_DIR.mkdir(parents=True, exist_ok=True)
  
for path, filename in RESOURCES:  
    all_results, offset = [], 0  
    while True:  
        url = f"{BASE}/{path}?limit={LIMIT}&offset={offset}"  
        data = fetch_json(url)
        all_results.extend(data["results"])  
        if len(all_results) >= data["count"]:  
            break  
        offset += LIMIT  
  
    output = {"results": all_results, "count": len(all_results), "timeRangeCount": len(all_results)}  
    (OUT_DIR / f"{filename}.json").write_text(json.dumps(output, indent=2))  
    print(f"Wrote {filename}.json ({len(all_results)} items)")
