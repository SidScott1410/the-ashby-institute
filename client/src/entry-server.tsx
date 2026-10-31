/**
 * SSR entry point used by the build-time renderer to generate static HTML.
 * Wouter receives the requested path directly, so every public route can be
 * written as a complete document before deployment.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { PUBLICATIONS_DATA } from "./lib/publications";

export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>
  );
}
