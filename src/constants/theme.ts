/**
 * App-wide theme: colors, spacing, typography, fonts.
 */
export const colors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  border: '#E0E0E0',
  tabBar: '#2D2D44',
  tabBarBorder: '#6B9BD1',
  tabBarActive: '#FFFFFF',
  tabBarActiveBg: '#FFFFFF',
  tabBarInactive: '#9E9EAD',
  seat: {
    regular: '#4A90E2',
    vip: '#9B59B6',
    selected: '#F1C40F',
    unavailable: '#95A5A6',
  },
  screenCurve: '#4A90E2',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

/** Poppins font family names (loaded in App.tsx). */
export const fonts = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const typography = {
  title: { fontSize: 20, fontFamily: fonts.bold },
  subtitle: { fontSize: 14, fontFamily: fonts.medium },
  body: { fontSize: 16, fontFamily: fonts.regular },
  caption: { fontSize: 12, fontFamily: fonts.regular },
} as const;
