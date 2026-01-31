/**
 * App-wide theme: colors, spacing, typography.
 */
export const colors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  border: '#E0E0E0',
  tabBar: '#2C2C2E',
  tabBarActive: '#FFFFFF',
  tabBarInactive: '#8E8E93',
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

export const typography = {
  title: { fontSize: 20, fontWeight: '700' as const },
  subtitle: { fontSize: 14, fontWeight: '500' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const;
