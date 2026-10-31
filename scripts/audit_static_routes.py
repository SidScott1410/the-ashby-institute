#!/usr/bin/env python3
"""Audit canonical routes as an HTML-only client would see them.

Usage:
  python3 scripts/audit_static_routes.py dist/public --expect-count 13
  python3 scripts/audit_static_routes.py https://theashbyinstitute.org --expect-count 13
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title: list[str] = []
        self.h1: list[str] = []
        self.main: list[str] = []
        self.canonical: str | None = None
        self.robots: str | None = None
        self.rendering: str | None = None
        self._current: str | None = None
        self._main_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        if tag == "title":
            self._current = "title"
        elif tag == "h1":
            self._current = "h1"
        elif tag == "main":
            self._main_depth += 1
        elif tag == "link" and attr.get("rel") == "canonical":
            self.canonical = attr.get("href")
        elif tag == "meta" and attr.get("name") == "robots":
            self.robots = attr.get("content")
        elif tag == "meta" and attr.get("name") == "rendering":
            self.rendering = attr.get("content")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"title", "h1"}:
            self._current = None
        elif tag == "main" and self._main_depth:
            self._main_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._current == "title":
            self.title.append(data)
        elif self._current == "h1":
            self.h1.append(data)
        if self._main_depth:
            self.main.append(data)


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", unescape(value)).strip()


def is_url(value: str) -> bool:
    return value.startswith("https://") or value.startswith("http://")


def read_resource(target: str) -> tuple[int, str]:
    if is_url(target):
        request = Request(target, headers={"User-Agent": "AshbyStaticRouteAudit/1.0"})
        with urlopen(request, timeout=45) as response:
            return response.status, response.read().decode("utf-8")
    return 200, Path(target).read_text(encoding="utf-8")


def route_resource(base: str, route_url: str) -> str:
    if is_url(base):
        return route_url
    relative = route_url.removeprefix("https://theashbyinstitute.org/").strip("/")
    return str(Path(base) / relative / "index.html") if relative else str(Path(base) / "index.html")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("base", help="A public site URL or the local dist/public directory")
    parser.add_argument("--expect-count", type=int)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    sitemap_target = f"{args.base.rstrip('/')}/sitemap.xml" if is_url(args.base) else str(Path(args.base) / "sitemap.xml")
    status, sitemap = read_resource(sitemap_target)
    root = ET.fromstring(sitemap)
    routes = [node.text for node in root.findall(".//{*}loc") if node.text]
    if args.expect_count is not None and len(routes) != args.expect_count:
        raise SystemExit(f"Expected {args.expect_count} sitemap routes, found {len(routes)}")

    results: list[dict[str, Any]] = []
    failed = False
    for route in routes:
        target = route_resource(args.base, route)
        try:
            http_status, html = read_resource(target)
            document = DocumentParser()
            document.feed(html)
            title = normalize(" ".join(document.title))
            h1 = normalize(" ".join(document.h1))
            main_text = normalize(" ".join(document.main))
            errors: list[str] = []
            if http_status != 200:
                errors.append(f"HTTP status {http_status}")
            if not title:
                errors.append("missing <title>")
            if not h1:
                errors.append("missing <h1>")
            if len(main_text) < 250:
                errors.append(f"main text too short ({len(main_text)} chars)")
            if document.canonical != route:
                errors.append(f"canonical is {document.canonical!r}, expected {route!r}")
            if document.robots and "noindex" in document.robots.lower():
                errors.append("page declares noindex")
            if document.rendering != "static-prerendered":
                errors.append("missing static-prerendered marker")
            if re.search(r'<div id="root"(?:\s[^>]*)?>\s*</div>', html):
                errors.append("empty root shell")
            result = {"url": route, "status": http_status, "title": title, "h1": h1, "mainTextCharacters": len(main_text), "canonical": document.canonical, "errors": errors}
        except Exception as error:  # report a route failure alongside successful routes
            result = {"url": route, "errors": [str(error)]}
        results.append(result)
        failed = failed or bool(result["errors"])

    report = {"sitemap": sitemap_target, "routeCount": len(routes), "passed": not failed, "routes": results}
    if args.output:
        args.output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    for result in results:
        marker = "PASS" if not result["errors"] else "FAIL"
        print(f"{marker} {result['url']} — {result.get('mainTextCharacters', 0)} main-text chars")
        for error in result["errors"]:
            print(f"  - {error}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
