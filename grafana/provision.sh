#!/usr/bin/env bash
# ALS-244: Deploy Grafana dashboards and alerts to Grafana Cloud
# Required env vars:
#   GRAFANA_CLOUD_URL        e.g. https://agrilink.grafana.net
#   GRAFANA_CLOUD_API_KEY    service account token with Editor role
#   GRAFANA_FOLDER_UID       UID of the "LOP" folder in Grafana (create manually first)

set -euo pipefail

BASE_URL="${GRAFANA_CLOUD_URL}/api"
AUTH_HEADER="Authorization: Bearer ${GRAFANA_CLOUD_API_KEY}"

echo "==> Provisioning Grafana dashboards to ${GRAFANA_CLOUD_URL}"

# ── Ensure folder exists ──────────────────────────────────────────────────────
FOLDER_RESP=$(curl -sf -X POST \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d "{\"uid\":\"lop-dashboards\",\"title\":\"LOP Platform\"}" \
  "${BASE_URL}/folders" 2>/dev/null || \
  curl -sf -H "${AUTH_HEADER}" "${BASE_URL}/folders/lop-dashboards")
FOLDER_ID=$(echo "${FOLDER_RESP}" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo "    Folder ID: ${FOLDER_ID}"

# ── Upload dashboards ─────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for dashboard_file in "${SCRIPT_DIR}/dashboards/"*.json; do
  title=$(python3 -c "import json; d=json.load(open('${dashboard_file}')); print(d['title'])")
  echo "    Uploading: ${title}"
  payload=$(python3 -c "
import json, sys
d = json.load(open('${dashboard_file}'))
print(json.dumps({'dashboard': d, 'folderId': ${FOLDER_ID}, 'overwrite': True}))
")
  curl -sf -X POST \
    -H "${AUTH_HEADER}" \
    -H "Content-Type: application/json" \
    -d "${payload}" \
    "${BASE_URL}/dashboards/db" > /dev/null
  echo "      OK"
done

# ── Upload alert rules ────────────────────────────────────────────────────────
echo "==> Provisioning alert rules"
curl -sf -X POST \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/yaml" \
  --data-binary @"${SCRIPT_DIR}/alerts/rules.yaml" \
  "${BASE_URL}/v1/provisioning/alert-rules/export" > /dev/null 2>&1 || true

# Use Grafana provisioning API for alert rules
python3 - <<'PYEOF'
import json, os, sys
import urllib.request, urllib.error

base = os.environ['GRAFANA_CLOUD_URL'] + '/api/v1/provisioning/alert-rules'
key  = os.environ['GRAFANA_CLOUD_API_KEY']

# Read rules and post each one
import yaml
with open(os.path.join(os.path.dirname(sys.argv[0] if sys.argv[0] else '.'), 'alerts', 'rules.yaml')) as f:
    data = yaml.safe_load(f)

for group in data.get('groups', []):
    for rule in group.get('rules', []):
        rule_payload = {
            'title': rule['title'],
            'condition': rule['condition'],
            'data': rule['data'],
            'noDataState': rule.get('noDataState', 'NoData'),
            'execErrState': rule.get('execErrState', 'Alerting'),
            'for': rule.get('for', '5m'),
            'annotations': rule.get('annotations', {}),
            'labels': rule.get('labels', {}),
            'uid': rule.get('uid'),
            'folderUID': 'lop-dashboards',
            'ruleGroup': group['name'],
        }
        body = json.dumps(rule_payload).encode()
        req = urllib.request.Request(base, data=body, method='POST',
              headers={'Authorization': f'Bearer {key}', 'Content-Type': 'application/json'})
        try:
            urllib.request.urlopen(req)
            print(f'    Rule OK: {rule["title"]}')
        except urllib.error.HTTPError as e:
            print(f'    Rule WARN ({e.code}): {rule["title"]} — {e.read().decode()[:200]}')
PYEOF

echo ""
echo "==> Done. Open ${GRAFANA_CLOUD_URL}/dashboards to verify."
