/**
 * entry-server.tsx
 * SSR entry point used by prerender.mjs to generate static HTML for each route.
 * Uses Wouter's ssrPath prop to render the correct page component for a given URL.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>
  );
}
