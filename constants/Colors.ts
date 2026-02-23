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
    background: '#0d1117',
    card: '#161b22',
    cardElevated: '#1c2128',
    tint: tintColorDark,
    tintLight: '#6BB5FF20',
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    border: '#30363d',
    borderLight: '#21262d',
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

export const gradients = {
  primary: ['#4A90D9', '#357ABD'] as const,
  primaryDark: ['#6BB5FF', '#4A90D9'] as const,
  success: ['#2ECC71', '#27AE60'] as const,
  error: ['#E74C3C', '#C0392B'] as const,
  warning: ['#F39C12', '#E67E22'] as const,
  purple: ['#9B59B6', '#8E44AD'] as const,
  orange: ['#F39C12', '#E67E22'] as const,
};

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
