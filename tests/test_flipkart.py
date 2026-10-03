import json
import os
import stat
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import flipkart_auth
from flipkart_ads_client import FlipkartAdsClient


class Response:
    def __init__(self, body):
        self.body = body
    def __enter__(self):
        return self
    def __exit__(self, *args):
        pass
    def read(self):
        return self.body


class TokenTests(unittest.TestCase):
    def test_invalid_response_does_not_overwrite_tokens(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'tokens.json'
            path.write_text('existing')
            for data in [{}, {'access_token': 'test', 'expires_in': -1}]:
                with self.assertRaises(ValueError):
                    flipkart_auth.save_tokens(data, path)
                self.assertEqual(path.read_text(), 'existing')

    def test_atomic_token_write_uses_private_permissions(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'tokens.json'
            with patch('flipkart_auth.time.time', return_value=1000):
                result = flipkart_auth.save_tokens({'access_token': 'test', 'expires_in': '600'}, path)
            self.assertEqual(result['expires_at'], 1600)
            self.assertEqual(json.loads(path.read_text()), result)
            if os.name == 'posix':
                self.assertEqual(stat.S_IMODE(path.stat().st_mode), 0o600)

    def test_refresh_preserves_old_refresh_token_and_custom_path(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'custom.json'
            with patch('flipkart_auth.urllib.request.urlopen', return_value=Response(b'{"access_token":"new","expires_in":600}')) as request:
                result = flipkart_auth.refresh_access_token('id', 'secret', 'old-refresh', filepath=path)
            self.assertEqual(result['refresh_token'], 'old-refresh')
            self.assertEqual(json.loads(path.read_text())['access_token'], 'new')
            self.assertEqual(request.call_args.kwargs['timeout'], 30)

    def test_client_refresh_persists_to_configured_path(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'custom.json'
            path.write_text(json.dumps({'access_token': 'old', 'refresh_token': 'refresh', 'expires_at': 1}))
            with patch.dict(os.environ, {'FLIPKART_CLIENT_ID': 'id', 'FLIPKART_CLIENT_SECRET': 'secret'}):
                client = FlipkartAdsClient(path, Path(directory) / 'missing.env')
            with patch('flipkart_ads_client.refresh_access_token', return_value={'access_token':'new'}) as refresh:
                self.assertEqual(client.get_valid_access_token(), 'new')
                self.assertEqual(refresh.call_args.kwargs['filepath'], path)

    def test_manual_refresh_refreshes_unexpired_token(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'tokens.json'
            path.write_text(json.dumps({'access_token':'old', 'refresh_token':'refresh', 'expires_at':99999999999}))
            with patch.dict(os.environ, {'FLIPKART_CLIENT_ID':'id','FLIPKART_CLIENT_SECRET':'secret'}):
                client = FlipkartAdsClient(path, Path(directory) / 'missing.env')
            with patch('flipkart_ads_client.refresh_access_token', return_value={'access_token':'new'}) as refresh:
                client.get_valid_access_token(force_refresh=True)
                refresh.assert_called_once()

    def test_empty_success_response_is_not_a_network_error(self):
        client = FlipkartAdsClient(tokens_path='/nonexistent/nevisan-tokens.json')
        with patch.object(client, 'get_valid_access_token', return_value='test'), patch('flipkart_ads_client.urllib.request.urlopen', return_value=Response(b'')) as request:
            self.assertEqual(client._request('campaigns/test/bids', 'PUT', {}), {})
            self.assertEqual(request.call_args.args[0].data, b'{}')

    def test_expired_token_does_not_report_connected(self):
        client = FlipkartAdsClient(tokens_path='/nonexistent/nevisan-tokens.json')
        client.tokens = {'access_token':'test', 'expires_at':1}
        self.assertFalse(client.check_connection()[0])


if __name__ == '__main__':
    unittest.main()
