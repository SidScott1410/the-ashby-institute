/*
 * AsciiCanvas.tsx — TAI Procedural ASCII Art Engine
 * Design: Full-screen dark hero canvas rendering live mathematical/systems simulations
 * as ASCII characters. Character palette drawn from systems theory notation.
 * Five simulation types: cellular-automaton, reaction-diffusion, lorenz, network, boids
 */

import { useEffect, useRef } from "react";

// Systems theory character palette — ordered by visual density
const CHARS = " .·:;+|=xX$V(R)≥D∀∃→∞∂∇Σ01";
const CHARS_DENSE = "VRD≥∀∃→∞∂∇Σ01xX$@#%&";

type SimType = "cellular" | "reaction-diffusion" | "lorenz" | "network" | "boids";

interface AsciiCanvasProps {
  sim: SimType;
  cellSize?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Cellular Automaton (Game of Life variant) ───────────────────────────────
function createCellularSim(cols: number, rows: number) {
  let grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() < 0.3 ? 1 : 0))
  );
  let age = Array.from({ length: rows }, () => Array(cols).fill(0));

  function step() {
    const next = grid.map((row, r) =>
      row.map((cell, c) => {
        let n = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = (r + dr + rows) % rows;
            const nc = (c + dc + cols) % cols;
            n += grid[nr][nc];
          }
        if (cell === 1) return n === 2 || n === 3 ? 1 : 0;
        return n === 3 ? 1 : 0;
      })
    );
    age = age.map((row, r) =>
      row.map((a, c) => (next[r][c] === 1 ? Math.min(a + 1, 20) : 0))
    );
    grid = next;
  }

  function getValue(r: number, c: number): number {
    return grid[r][c] === 1 ? 0.4 + Math.min(age[r][c] / 20, 1) * 0.6 : 0;
  }

  return { step, getValue };
}

// ─── Reaction-Diffusion (Gray-Scott) ─────────────────────────────────────────
function createReactionDiffusionSim(cols: number, rows: number) {
  const f = 0.055, k = 0.062, dA = 1.0, dB = 0.5;
  let A = Array.from({ length: rows }, () => Array(cols).fill(1.0));
  let B = Array.from({ length: rows }, () => Array(cols).fill(0.0));

  // Seed with a few spots
  for (let i = 0; i < 8; i++) {
    const sr = Math.floor(Math.random() * rows);
    const sc = Math.floor(Math.random() * cols);
    for (let dr = -2; dr <= 2; dr++)
      for (let dc = -2; dc <= 2; dc++) {
        const r = (sr + dr + rows) % rows;
        const c = (sc + dc + cols) % cols;
        B[r][c] = 1.0;
      }
  }

  function laplacian(grid: number[][], r: number, c: number) {
    return (
      grid[(r - 1 + rows) % rows][c] +
      grid[(r + 1) % rows][c] +
      grid[r][(c - 1 + cols) % cols] +
      grid[r][(c + 1) % cols] -
      4 * grid[r][c]
    );
  }

  function step() {
    const nA = A.map(r => [...r]);
    const nB = B.map(r => [...r]);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = A[r][c], b = B[r][c];
        const abb = a * b * b;
        nA[r][c] = Math.max(0, Math.min(1, a + dA * laplacian(A, r, c) - abb + f * (1 - a)));
        nB[r][c] = Math.max(0, Math.min(1, b + dB * laplacian(B, r, c) + abb - (k + f) * b));
      }
    }
    A = nA; B = nB;
  }

  function getValue(r: number, c: number): number {
    return Math.max(0, Math.min(1, 1 - A[r][c]));
  }

  return { step, getValue };
}

// ─── Lorenz Attractor ─────────────────────────────────────────────────────────
function createLorenzSim(cols: number, rows: number) {
  const σ = 10, ρ = 28, β = 8 / 3, dt = 0.005;
  const trails: Array<{ x: number; y: number; z: number; age: number }> = [];
  const density = new Float32Array(rows * cols);

  for (let i = 0; i < 6; i++) {
    trails.push({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: 20 + Math.random() * 10,
      age: 0,
    });
  }

  function step() {
    density.fill(0);
    for (const t of trails) {
      const dx = σ * (t.y - t.x);
      const dy = t.x * (ρ - t.z) - t.y;
      const dz = t.x * t.y - β * t.z;
      t.x += dx * dt;
      t.y += dy * dt;
      t.z += dz * dt;
      t.age++;
      if (t.age > 2000) {
        t.x = (Math.random() - 0.5) * 2;
        t.y = (Math.random() - 0.5) * 2;
        t.z = 20 + Math.random() * 10;
        t.age = 0;
      }
      // Map Lorenz space to grid
      const px = Math.floor(((t.x + 25) / 50) * cols);
      const py = Math.floor(((t.z - 0) / 50) * rows);
      if (px >= 0 && px < cols && py >= 0 && py < rows) {
        density[py * cols + px] = Math.min(1, density[py * cols + px] + 0.3);
      }
    }
  }

  function getValue(r: number, c: number): number {
    return density[r * cols + c];
  }

  return { step, getValue };
}

// ─── Network Graph ────────────────────────────────────────────────────────────
function createNetworkSim(cols: number, rows: number) {
  const N = 18;
  const nodes = Array.from({ length: N }, () => ({
    x: Math.random() * cols,
    y: Math.random() * rows,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    active: Math.random() < 0.4,
    pulse: 0,
  }));
  const edges: [number, number][] = [];
  for (let i = 0; i < N; i++)
    for (let j = i + 1; j < N; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < cols * 0.35) edges.push([i, j]);
    }

  const density = new Float32Array(rows * cols);

  function drawLine(x0: number, y0: number, x1: number, y1: number, val: number) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2;
    for (let s = 0; s <= steps; s++) {
      const t = steps === 0 ? 0 : s / steps;
      const px = Math.round(x0 + (x1 - x0) * t);
      const py = Math.round(y0 + (y1 - y0) * t);
      if (px >= 0 && px < cols && py >= 0 && py < rows)
        density[py * cols + px] = Math.min(1, density[py * cols + px] + val);
    }
  }

  function step() {
    density.fill(0);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x >= cols) n.vx *= -1;
      if (n.y < 0 || n.y >= rows) n.vy *= -1;
      n.pulse = Math.max(0, n.pulse - 0.03);
      if (Math.random() < 0.005) { n.active = !n.active; n.pulse = 1; }
    }
    for (const [i, j] of edges) {
      const strength = nodes[i].active && nodes[j].active ? 0.25 : 0.06;
      drawLine(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, strength);
    }
    for (const n of nodes) {
      const r = Math.round(n.y), c = Math.round(n.x);
      if (r >= 0 && r < rows && c >= 0 && c < cols)
        density[r * cols + c] = n.active ? 0.9 + n.pulse * 0.1 : 0.3;
    }
  }

  function getValue(r: number, c: number): number {
    return density[r * cols + c];
  }

  return { step, getValue };
}

// ─── Boids (Flocking) ─────────────────────────────────────────────────────────
function createBoidsSim(cols: number, rows: number) {
  const N = 60;
  const boids = Array.from({ length: N }, () => ({
    x: Math.random() * cols,
    y: Math.random() * rows,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));
  const density = new Float32Array(rows * cols);
  const VISUAL = 8, SEP = 3, MAX_SPEED = 0.5;

  function step() {
    density.fill(0);
    for (let i = 0; i < N; i++) {
      const b = boids[i];
      let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, nc = 0, ns = 0;
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const dx = boids[j].x - b.x, dy = boids[j].y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < VISUAL) { ax += boids[j].vx; ay += boids[j].vy; cx += boids[j].x; cy += boids[j].y; nc++; }
        if (d < SEP) { sx -= dx / (d + 0.01); sy -= dy / (d + 0.01); ns++; }
      }
      if (nc > 0) { b.vx += (ax / nc - b.vx) * 0.05; b.vy += (ay / nc - b.vy) * 0.05; b.vx += (cx / nc - b.x) * 0.005; b.vy += (cy / nc - b.y) * 0.005; }
      if (ns > 0) { b.vx += sx * 0.05; b.vy += sy * 0.05; }
      const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (spd > MAX_SPEED) { b.vx = (b.vx / spd) * MAX_SPEED; b.vy = (b.vy / spd) * MAX_SPEED; }
      b.x = (b.x + b.vx + cols) % cols;
      b.y = (b.y + b.vy + rows) % rows;
      const r = Math.round(b.y), c = Math.round(b.x);
      if (r >= 0 && r < rows && c >= 0 && c < cols) density[r * cols + c] = Math.min(1, density[r * cols + c] + 0.7);
    }
  }

  function getValue(r: number, c: number): number {
    return density[r * cols + c];
  }

  return { step, getValue };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AsciiCanvas({ sim, cellSize = 11, opacity = 0.85, className = "", style = {} }: AsciiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    if (cols < 2 || rows < 2) return;

    let simulation: { step: () => void; getValue: (r: number, c: number) => number };
    if (sim === "cellular") simulation = createCellularSim(cols, rows);
    else if (sim === "reaction-diffusion") simulation = createReactionDiffusionSim(cols, rows);
    else if (sim === "lorenz") simulation = createLorenzSim(cols, rows);
    else if (sim === "network") simulation = createNetworkSim(cols, rows);
    else simulation = createBoidsSim(cols, rows);

    ctx.font = `${cellSize - 1}px "IBM Plex Mono", monospace`;
    ctx.textBaseline = "top";

    let frame = 0;
    const stepsPerFrame = sim === "reaction-diffusion" ? 3 : 1;

    function draw() {
      for (let s = 0; s < stepsPerFrame; s++) simulation.step();
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = simulation.getValue(r, c);
          if (v < 0.02) continue;
          const charSet = v > 0.6 ? CHARS_DENSE : CHARS;
          const idx = Math.floor(v * (charSet.length - 1));
          const ch = charSet[Math.max(0, Math.min(charSet.length - 1, idx))];
          // Color: dim crimson for high-value cells, muted white for low
          const brightness = Math.floor(60 + v * 160);
          const r_col = v > 0.5 ? Math.floor(120 + v * 80) : brightness;
          const g_col = v > 0.5 ? Math.floor(20 + v * 20) : brightness;
          const b_col = v > 0.5 ? Math.floor(15 + v * 15) : brightness;
          ctx!.fillStyle = `rgba(${r_col},${g_col},${b_col},${opacity * (0.3 + v * 0.7)})`;
          ctx!.fillText(ch, c * cellSize, r * cellSize);
        }
      }
      frame++;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [sim, cellSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", background: "transparent", ...style }}
    />
  );
}
