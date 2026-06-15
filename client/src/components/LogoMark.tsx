/**
 * THE ASHBY INSTITUTE — Shared LogoMark Component
 *
 * Matches the official TAI logo:
 *   - Double-ring circle with a small upward-pointing triangle at the top
 *   - "THE ASHBY INSTITUTE" in Barlow Condensed, wide tracking, navy/slate color
 *
 * Design: GI-style, white bg, slate blue (#2C3E6B) accent, 1px border grid
 */

import React from "react";

const SLATE = "#2C3E6B";

interface LogoMarkProps {
  /** Total height of the logo lockup in px. Width scales proportionally. */
  size?: number;
  /** Color for the circle icon and text. Defaults to slate blue. */
  color?: string;
  /** If true, render only the circle icon without the wordmark. */
  iconOnly?: boolean;
}

/**
 * TAI logo: double-ring circle icon + "THE ASHBY INSTITUTE" wordmark.
 * The icon is a circle with an inner concentric ring and a small triangle at 12 o'clock.
 * The wordmark uses Barlow Condensed, wide letter-spacing, font-weight 600.
 */
export function LogoMark({ size = 32, color = SLATE, iconOnly = false }: LogoMarkProps) {
  // Icon is square; wordmark height matches icon height
  const iconSize = size;
  const fontSize = Math.round(size * 0.38);
  const gap = Math.round(size * 0.35);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        textDecoration: "none",
        userSelect: "none",
      }}
    >
      {/* Circle icon: outer ring + inner ring + triangle at top */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={{ flexShrink: 0 }}
      >
        {/* Outer circle */}
        <circle cx="20" cy="20" r="17" stroke={color} strokeWidth="2" fill="none" />
        {/* Inner concentric circle */}
        <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Small upward triangle at 12 o'clock, sitting on the outer circle */}
        <polygon points="20,1.5 22.5,6.5 17.5,6.5" fill={color} />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span
          style={{
            fontFamily: "'Barlow Condensed', 'Chakra Petch', sans-serif",
            fontSize,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color,
            lineHeight: 1,
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          THE ASHBY INSTITUTE
        </span>
      )}
    </span>
  );
}

export default LogoMark;
