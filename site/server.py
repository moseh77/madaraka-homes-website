#!/usr/bin/env python3
"""Minimal server mapping clean URLs → .html files for Madaraka Homes."""

import http.server
import socketserver
import os

PORT = 8742
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def do_GET(self):
        # Map clean URLs to .html files
        path = self.path.split('?')[0]
        if not os.path.splitext(path)[1]:
            html_path = path.rstrip('/') + '.html'
            if os.path.isfile(os.path.join(DIR, html_path.lstrip('/'))):
                self.path = html_path
        super().do_GET()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Madaraka Homes → http://localhost:{PORT}")
        httpd.serve_forever()
