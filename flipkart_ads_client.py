#!/usr/bin/env python3
"""
Nevisan Tea - Flipkart Ads API Client & Performance Manager
Provides automated campaign monitoring, token lifecycle management, and bid management.
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import urllib.parse
import urllib.error

# Reuse token logic from flipkart_auth
from flipkart_auth import (
    TOKENS_FILE,
    ENV_FILE,
    load_env_file,
    refresh_access_token
)

ADS_BASE_URL = "https://api.flipkart.net/ads-service"


class FlipkartAdsClient:
    def __init__(self, tokens_path=TOKENS_FILE, env_path=ENV_FILE):
        self.tokens_path = tokens_path
        self.env_vars = load_env_file(env_path)
        self.client_id = os.environ.get("FLIPKART_CLIENT_ID") or self.env_vars.get("FLIPKART_CLIENT_ID")
        self.client_secret = os.environ.get("FLIPKART_CLIENT_SECRET") or self.env_vars.get("FLIPKART_CLIENT_SECRET")
        self.tokens = self._load_tokens()

    def _load_tokens(self):
        if not os.path.exists(self.tokens_path):
            return None
        with open(self.tokens_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_valid_access_token(self, force_refresh=False):
        if not self.tokens or not self.tokens.get("access_token"):
            print("[ERROR] No tokens found. Complete authorization at https://nevisan.in/oauth/callback/ first.", file=sys.stderr)
            print("Run: python flipkart_auth.py --code <YOUR_CODE>", file=sys.stderr)
            sys.exit(1)

        now = int(time.time())
        expires_at = self.tokens.get("expires_at")

        # If expired or within 5 minutes of expiring, refresh automatically
        if force_refresh or (expires_at is not None and now >= expires_at - 300):
            print("[INFO] Access token expired or expiring soon. Refreshing...", file=sys.stderr)
            if not self.client_id or not self.client_secret:
                print("[ERROR] Client ID and Client Secret are required to refresh tokens. Check your .env file.", file=sys.stderr)
                sys.exit(1)
            if not self.tokens.get("refresh_token"):
                raise ValueError("No refresh token available; authorize again")
            self.tokens = refresh_access_token(
                self.client_id, self.client_secret, self.tokens["refresh_token"],
                filepath=self.tokens_path
            )

        return self.tokens.get("access_token")

    def _request(self, endpoint, method="GET", data=None):
        access_token = self.get_valid_access_token()
        url = f"{ADS_BASE_URL}/{endpoint.lstrip('/')}"
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        body_bytes = json.dumps(data).encode("utf-8") if data is not None else None
        req = urllib.request.Request(url, data=body_bytes, headers=headers, method=method)

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                body = resp.read().decode("utf-8")
                return json.loads(body) if body.strip() else {}
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8", errors="replace")
            print(f"[API ERROR] HTTP {e.code} for {url}: {err}", file=sys.stderr)
            return {"error": e.code, "message": err}
        except Exception as e:
            print(f"[NETWORK ERROR] Failed to contact {url}: {e}", file=sys.stderr)
            return {"error": "network_failure", "message": str(e)}

    def check_connection(self):
        if not self.tokens or not self.tokens.get("access_token"):
            return False, "Tokens file does not exist. Please authenticate via /oauth/callback/."
        now = int(time.time())
        expires_at = self.tokens.get("expires_at")
        if not expires_at:
            return True, "Token present (expiration unknown)."
        remaining_seconds = expires_at - now
        if remaining_seconds > 0:
            return True, f"Token active (expires in {remaining_seconds // 60} minutes)."
        return False, "Token expired. Refresh it before requesting campaigns."

    def list_campaigns(self):
        return self._request("/campaigns", method="GET")

    def get_insights(self, start_date, end_date):
        payload = {
            "startDate": start_date,
            "endDate": end_date
        }
        return self._request("/reports/performance", method="POST", data=payload)

    def update_bid(self, campaign_id, keyword_id, new_bid):
        payload = {
            "keywordId": keyword_id,
            "bid": float(new_bid)
        }
        return self._request(f"/campaigns/{campaign_id}/bids", method="PUT", data=payload)


def main():
    parser = argparse.ArgumentParser(description="Nevisan Tea - Flipkart Ads Manager")
    parser.add_argument("--status", action="store_true", help="Check current token and connection status")
    parser.add_argument("--campaigns", action="store_true", help="List active ad campaigns")
    parser.add_argument("--refresh", action="store_true", help="Manually refresh access token")
    args = parser.parse_args()

    client = FlipkartAdsClient()

    if args.status:
        active, msg = client.check_connection()
        print(f"Local token status: {'AVAILABLE' if active else 'UNAVAILABLE'}")
        print(f"Details: {msg}")
    elif args.campaigns:
        result = client.list_campaigns()
        print(json.dumps(result, indent=2))
    elif args.refresh:
        client.get_valid_access_token(force_refresh=True)
        print("[SUCCESS] Access token refreshed and saved.")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
