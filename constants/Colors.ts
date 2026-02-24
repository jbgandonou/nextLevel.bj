const tintColorLight = '#4A90D9';
const tintColorDark = '#6BB5FF';

const Colors = {
  light: {
    text: '#1a1a2e',
    textSecondary: '#666',
    textTertiary: '#999',
    background: '#f5f6fa',
    card: '#ffffff',
    cardElevated: '#ffffff',
    tint: tintColorLight,
    tintLight: '#4A90D920',
    tabIconDefault: '#b0b0b0',
    tabIconSelected: tintColorLight,
    border: '#e0e0e0',
    borderLight: '#f0f0f0',
    success: '#2ECC71',
    successLight: '#2ECC7118',
    error: '#E74C3C',
    errorLight: '#E74C3C18',
    warning: '#F39C12',
    warningLight: '#F39C1218',
    shadow: '#000',
    overlay: 'rgba(0,0,0,0.3)',
  },
  dark: {
    text: '#e0e0e0',
    textSecondary: '#999',
    textTertiary: '#666',
    background: '#0a0e1a',
    card: 'rgba(255,255,255,0.08)',
    cardElevated: 'rgba(255,255,255,0.12)',
    tint: tintColorDark,
    tintLight: '#6BB5FF20',
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    border: 'rgba(255,255,255,0.15)',
    borderLight: 'rgba(255,255,255,0.08)',
    success: '#2ECC71',
    successLight: '#2ECC7120',
    error: '#E74C3C',
    errorLight: '#E74C3C20',
    warning: '#F39C12',
    warningLight: '#F39C1220',
    shadow: '#000',
    overlay: 'rgba(0,0,0,0.5)',
  },
};

export const glass = {
  card: 'rgba(255,255,255,0.08)',
  cardLight: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.15)',
  cardBorderLight: 'rgba(255,255,255,0.08)',
  /** For light mode glass */
  cardLightMode: 'rgba(255,255,255,0.7)',
  cardBorderLightMode: 'rgba(255,255,255,0.9)',
} as const;

export const gradients = {
  primary: ['#4A90D9', '#357ABD'] as const,
  primaryDark: ['#6BB5FF', '#4A90D9'] as const,
  success: ['#2ECC71', '#27AE60'] as const,
  error: ['#E74C3C', '#C0392B'] as const,
  warning: ['#F39C12', '#E67E22'] as const,
  purple: ['#9B59B6', '#8E44AD'] as const,
  orange: ['#F39C12', '#E67E22'] as const,
  /** App background gradient (dark) */
  backgroundDark: ['#0a0e1a', '#1a1040'] as const,
  backgroundLight: ['#f5f6fa', '#eef1f6'] as const,
  /** XP bar */
  xp: ['#FFD700', '#FF8C00'] as const,
  /** Level circle */
  level: ['#9B59B6', '#6C3483'] as const,
};

/** Badge gradient by rarity */
export const badgeGradients = {
  common: ['#8E9AAF', '#6B7B8D'] as const,
  rare: ['#4A90D9', '#357ABD'] as const,
  epic: ['#9B59B6', '#6C3483'] as const,
  legendary: ['#FFD700', '#FF8C00'] as const,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

/** Inter font family mapping — use these instead of fontWeight */
export const Fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;

export default Colors;
