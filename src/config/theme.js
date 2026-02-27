/**
 * MFD Theme Configuration
 *
 * All visual tokens — colors, spacing, border radius, shadows,
 * and base component style objects.
 */

// Color Palette
export var T = {
  bg: '#0f172a',
  bg2: '#1e293b',
  bg3: '#334155',
  surface: '#1e293b',
  text: '#e2e8f0',
  dim: '#94a3b8',
  faint: '#64748b',
  gold: '#fbbf24',
  green: '#34d399',
  red: '#ef4444',
  blue: '#60a5fa',
  orange: '#f59e0b',
  purple: '#a78bfa',
  cyan: '#22d3ee',
  border: 'rgba(255,255,255,0.08)',
  glass: 'rgba(30,41,59,0.75)',
  glassBorder: 'rgba(255,255,255,0.1)',
  shadow:
    '0 4px 6px -1px rgba(0,0,0,0.5),0 2px 4px -1px rgba(0,0,0,0.3)',
  neonGlow: '0 0 10px rgba(251,191,36,0.3)',
  backdrop: 'blur(12px)',
};

// Spacing Scale
export var SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 };

// Border Radius Scale
export var RAD = { sm: 6, md: 10, lg: 14, xl: 20 };

// Shadow Scale
export var SH = {
  sm: '0 2px 4px rgba(0,0,0,0.3)',
  md: '0 4px 12px rgba(0,0,0,0.4)',
  lg: '0 8px 24px rgba(0,0,0,0.5)',
  glow: '0 0 20px rgba(251,191,36,0.15)',
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
    transition: 'all 0.15s ease',
    fontFamily: 'inherit',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
    color: '#000',
    boxShadow: SH.sm,
  },
  btnGhost: {
    background: 'rgba(255,255,255,0.06)',
    color: T.dim,
    border: '1px solid ' + T.glassBorder,
  },
  btnDanger: {
    background: 'rgba(239,68,68,0.15)',
    color: T.red,
    border: '1px solid rgba(239,68,68,0.3)',
  },
  btnSmall: {
    padding: '5px 10px',
    fontSize: 10,
    borderRadius: RAD.sm,
  },
  card: {
    background: T.glass,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid ' + T.glassBorder,
    borderRadius: RAD.lg,
    padding: SP.lg,
    boxShadow: SH.md,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    padding: '2px 8px',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 700,
  },
  badgeGold: { background: 'rgba(251,191,36,0.15)', color: T.gold },
  badgeGreen: { background: 'rgba(52,211,153,0.15)', color: T.green },
  badgeRed: { background: 'rgba(239,68,68,0.15)', color: T.red },
  badgePurple: { background: 'rgba(167,139,250,0.15)', color: T.purple },
  badgeCyan: { background: 'rgba(34,211,238,0.15)', color: T.cyan },
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
    fontFamily: "'Courier New',monospace",
    letterSpacing: '0.5px',
  },
  studioCard: {
    background:
      'linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02))',
    border: '1px solid rgba(251,191,36,0.2)',
    borderRadius: RAD.lg,
    padding: SP.lg,
    boxShadow: '0 0 20px rgba(251,191,36,0.08)',
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
    borderRadius: RAD.xl,
    padding: '14px 24px',
    fontSize: 14,
    fontWeight: 900,
    cursor: 'pointer',
    border: 'none',
    boxShadow:
      '0 8px 24px rgba(0,0,0,0.5),0 0 20px rgba(251,191,36,0.2)',
    background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
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
    background: 'rgba(15,23,42,0.92)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
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
