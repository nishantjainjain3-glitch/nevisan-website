#!/usr/bin/env python3
"""
Flipkart Ads / Seller API OAuth Token Exchange Utility
Nevisan Tea Automation Suite
"""

import os
import sys
import json
import base64
import time
import argparse
import urllib.request
import urllib.parse
import urllib.error

TOKEN_ENDPOINT = "https://api.flipkart.net/oauth-service/oauth/token"
DEFAULT_REDIRECT_URI = "https://nevisan.in/oauth/callback/"
TOKENS_FILE = "flipkart_tokens.json"
ENV_FILE = ".env"


def load_env_file(filepath=ENV_FILE):
    env_vars = {}
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env_vars[k.strip()] = v.strip().strip("\"'")
    return env_vars


def save_tokens(data, filepath=TOKENS_FILE):
    record = {
        "access_token": data.get("access_token"),
        "refresh_token": data.get("refresh_token"),
        "token_type": data.get("token_type", "Bearer"),
        "expires_in": data.get("expires_in"),
        "scope": data.get("scope"),
        "obtained_at": int(time.time()),
        "expires_at": int(time.time()) + int(data.get("expires_in", 21600)) if data.get("expires_in") else None
    }
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(record, f, indent=2)
    return record


def exchange_code_for_tokens(client_id, client_secret, auth_code, redirect_uri=DEFAULT_REDIRECT_URI):
    auth_bytes = f"{client_id}:{client_secret}".encode("utf-8")
    basic_auth = base64.b64encode(auth_bytes).decode("ascii")

    post_data = urllib.parse.urlencode({
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": redirect_uri
    }).encode("utf-8")

    req = urllib.request.Request(
        TOKEN_ENDPOINT,
        data=post_data,
        headers={
            "Authorization": f"Basic {basic_auth}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            resp_body = resp.read().decode("utf-8")
            data = json.loads(resp_body)
            record = save_tokens(data)
            print("[SUCCESS] Successfully exchanged authorization code for Flipkart API tokens.")
            print(f"[INFO] Access Token expires in {record.get('expires_in', 21600)} seconds.")
            print(f"[INFO] Tokens securely saved to local file: {TOKENS_FILE}")
            return record
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        print(f"[ERROR] Flipkart API returned HTTP {e.code}: {e.reason}", file=sys.stderr)
        print(f"[DETAILS] {err_body}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Connection failure: {e}", file=sys.stderr)
        sys.exit(1)


def refresh_access_token(client_id, client_secret, refresh_token):
    auth_bytes = f"{client_id}:{client_secret}".encode("utf-8")
    basic_auth = base64.b64encode(auth_bytes).decode("ascii")

    post_data = urllib.parse.urlencode({
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
    }).encode("utf-8")

    req = urllib.request.Request(
        TOKEN_ENDPOINT,
        data=post_data,
        headers={
            "Authorization": f"Basic {basic_auth}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            resp_body = resp.read().decode("utf-8")
            data = json.loads(resp_body)
            if "refresh_token" not in data:
                data["refresh_token"] = refresh_token
            record = save_tokens(data)
            print("[SUCCESS] Successfully refreshed Flipkart access token.")
            print(f"[INFO] New Access Token expires in {record.get('expires_in', 21600)} seconds.")
            print(f"[INFO] Updated tokens saved to: {TOKENS_FILE}")
            return record
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        print(f"[ERROR] Token refresh failed with HTTP {e.code}: {e.reason}", file=sys.stderr)
        print(f"[DETAILS] {err_body}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Connection failure during refresh: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Nevisan Tea - Flipkart Ads OAuth Token Manager")
    parser.add_argument("--code", help="Single-use authorization code from /oauth/callback/")
    parser.add_argument("--client-id", help="Flipkart Developer Application Client ID")
    parser.add_argument("--client-secret", help="Flipkart Developer Application Client Secret")
    parser.add_argument("--redirect-uri", default=DEFAULT_REDIRECT_URI, help="OAuth Redirect URI")
    parser.add_argument("--refresh", action="store_true", help="Refresh existing access token using stored refresh token")
    args = parser.parse_args()

    env_vars = load_env_file()
    client_id = args.client_id or env_vars.get("FLIPKART_CLIENT_ID") or os.environ.get("FLIPKART_CLIENT_ID")
    client_secret = args.client_secret or env_vars.get("FLIPKART_CLIENT_SECRET") or os.environ.get("FLIPKART_CLIENT_SECRET")

    if not client_id:
        client_id = input("Enter Flipkart Client ID: ").strip()
    if not client_secret:
        client_secret = input("Enter Flipkart Client Secret: ").strip()

    if not client_id or not client_secret:
        print("[ERROR] Both Client ID and Client Secret are required.", file=sys.stderr)
        sys.exit(1)

    if args.refresh:
        if not os.path.exists(TOKENS_FILE):
            print(f"[ERROR] Cannot refresh token: {TOKENS_FILE} does not exist.", file=sys.stderr)
            sys.exit(1)
        with open(TOKENS_FILE, "r", encoding="utf-8") as f:
            tokens = json.load(f)
        refresh_token = tokens.get("refresh_token")
        if not refresh_token:
            print("[ERROR] No refresh_token found in tokens file.", file=sys.stderr)
            sys.exit(1)
        refresh_access_token(client_id, client_secret, refresh_token)
    elif args.code:
        exchange_code_for_tokens(client_id, client_secret, args.code, args.redirect_uri)
    else:
        print("[INFO] No authorization code provided.")
        print(f"1. Open https://nevisan.in/oauth/callback/ in your browser.")
        print(f"2. Click 'Log In & Authorize with Flipkart'.")
        print(f"3. After logging in, you will be redirected back with an authorization code.")
        print(f"4. Run: python flipkart_auth.py --code <YOUR_CODE>")


if __name__ == "__main__":
    main()
