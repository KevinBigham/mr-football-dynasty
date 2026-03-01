/**
 * MFD Theme Configuration — Bloomberg Edition
 *
 * All visual tokens — colors, spacing, border radius, shadows,
 * and base component style objects.
 *
 * Design language: Bloomberg Terminal — amber on near-black,
 * sharp corners, flat solid surfaces, no glass morphism, snappy transitions.
 */

// Color Palette
export var T = {
  bg: '#070d17',
  bg2: '#0e1826',
  bg3: '#19253a',
  surface: '#0e1826',
  text: '#e8ecf1',
  dim: '#8a97aa',
  faint: '#4a5a6e',
  gold: '#f0a028',          // Bloomberg amber
  green: '#00b87a',
  red: '#e03c3c',
  blue: '#4a9fe8',
  orange: '#e07a10',
  purple: '#8b72ea',
  cyan: '#00afc8',
  border: 'rgba(255,255,255,0.09)',
  glass: '#0e1826',         // solid surface — no blur
  glassBorder: 'rgba(255,255,255,0.09)',
  shadow: '0 1px 3px rgba(0,0,0,0.7)',
  neonGlow: 'none',
  backdrop: 'none',         // disables all T.backdrop usages
};

// Spacing Scale
export var SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 };

// Border Radius Scale — sharp, Bloomberg-style
export var RAD = { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 };

// Shadow Scale
export var SH = {
  sm: '0 1px 3px rgba(0,0,0,0.7)',
  md: '0 2px 6px rgba(0,0,0,0.6)',
  lg: '0 4px 12px rgba(0,0,0,0.7)',
  glow: 'none',
};

// Base Component Style Objects
export var S = {
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    border: 'none',
    borderRadius: RAD.md,
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.05s ease',
    fontFamily: 'inherit',
  },
  btnPrimary: {
    background: '#f0a028',
    color: '#000',
  },
  btnGhost: {
    background: 'transparent',
    color: T.dim,
    border: '1px solid ' + T.border,
  },
  btnDanger: {
    background: 'rgba(224,60,60,0.15)',
    color: T.red,
    border: '1px solid rgba(224,60,60,0.3)',
  },
  btnSmall: {
    padding: '5px 10px',
    fontSize: 10,
    borderRadius: RAD.sm,
  },
  card: {
    background: T.bg3,
    border: '1px solid ' + T.border,
    borderRadius: RAD.lg,
    padding: SP.lg,
    boxShadow: SH.md,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    padding: '2px 8px',
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 700,
  },
  badgeGold: { background: 'rgba(240,160,40,0.18)', color: T.gold },
  badgeGreen: { background: 'rgba(0,184,122,0.18)', color: T.green },
  badgeRed: { background: 'rgba(224,60,60,0.18)', color: T.red },
  badgePurple: { background: 'rgba(139,114,234,0.18)', color: T.purple },
  badgeCyan: { background: 'rgba(0,175,200,0.18)', color: T.cyan },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 0.5,
    marginBottom: SP.md,
  },
  kpiBox: {
    textAlign: 'center',
    padding: SP.md,
    borderRadius: RAD.md,
    background: 'rgba(255,255,255,0.03)',
    minWidth: 70,
  },
  kpiValue: { fontSize: 22, fontWeight: 900, lineHeight: 1 },
  kpiLabel: {
    fontSize: 9,
    color: T.dim,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scanlines: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(0,0,0,0.03) 1px,rgba(0,0,0,0.03) 2px)',
    pointerEvents: 'none',
    zIndex: 9999,
    opacity: 0.5,
  },
  header: {
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontWeight: 900,
  },
  mono: {
    fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
    letterSpacing: '0.5px',
  },
  studioCard: {
    background: T.bg3,
    border: '1px solid rgba(240,160,40,0.2)',
    borderRadius: RAD.lg,
    padding: SP.lg,
  },
  ticker: {
    background: 'rgba(0,0,0,0.6)',
    borderTop: '2px solid ' + T.gold,
    padding: '6px 12px',
    fontSize: 10,
    color: T.gold,
    fontWeight: 700,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 100,
    borderRadius: RAD.md,
    padding: '14px 24px',
    fontSize: 14,
    fontWeight: 900,
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
    background: '#f0a028',
    color: '#000',
    letterSpacing: 0.5,
  },
  toastArea: {
    position: 'fixed',
    top: 12,
    right: 12,
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    pointerEvents: 'none',
  },
  toast: {
    pointerEvents: 'auto',
    background: T.bg2,
    border: '1px solid ' + T.border,
    borderRadius: RAD.md,
    padding: '8px 12px',
    boxShadow: SH.lg,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 220,
    maxWidth: 280,
    animation: 'slideIn 0.3s ease-out forwards',
    color: T.text,
  },
  bracketContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    overflowX: 'auto',
    background: T.bg2,
    borderRadius: RAD.lg,
    border: '1px solid ' + T.border,
  },
  matchCard: {
    background: T.bg,
    border: '1px solid ' + T.border,
    borderRadius: RAD.md,
    padding: 8,
    width: 150,
    position: 'relative',
    boxShadow: SH.sm,
  },
};
