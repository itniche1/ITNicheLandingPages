"""Backend health tests for the FastAPI scaffolding (/api/ root + /api/status)."""
import os
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://minimal-site-refresh.preview.emergentagent.com").rstrip("/")


def test_api_root():
    r = requests.get(f"{BASE_URL}/api/", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data.get("message") == "Hello World"


def test_api_status_get():
    r = requests.get(f"{BASE_URL}/api/status", timeout=15)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_api_status_post_and_get():
    payload = {"client_name": "TEST_landing_smoke"}
    p = requests.post(f"{BASE_URL}/api/status", json=payload, timeout=15)
    assert p.status_code == 200
    created = p.json()
    assert created["client_name"] == payload["client_name"]
    assert "id" in created and isinstance(created["id"], str)
    assert "timestamp" in created
    # verify persistence
    g = requests.get(f"{BASE_URL}/api/status", timeout=15)
    assert g.status_code == 200
    ids = [c.get("id") for c in g.json()]
    assert created["id"] in ids
