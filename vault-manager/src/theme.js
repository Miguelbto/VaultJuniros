// theme.js
// Design tokens do Prism Finance

export const colors = {
  // Base
  background: '#F5F5FA',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F0F8',

  // Marca
  primary: '#7C5CFC',
  primaryDark: '#6647E0',
  primaryLight: '#EFE9FF',

  // Semânticas
  success: '#22B573',
  successLight: '#E3F9EE',
  danger: '#F0483E',
  dangerLight: '#FDEBEA',
  warning: '#F5A623',
  warningLight: '#FEF3E0',

  // Texto
  textPrimary: '#1A1A2E',
  textSecondary: '#8A8A9E',
  textInverse: '#FFFFFF',

  // Bordas / divisores
  border: '#ECECF4',

  // Overlay do modal
  overlay: 'rgba(15, 12, 41, 0.55)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  h2: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  bodyBold: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  caption: { fontSize: 12.5, fontWeight: '500', color: colors.textSecondary },
  amount: { fontSize: 30, fontWeight: '800', color: colors.textInverse },
};

export const shadow = {
  card: {
    shadowColor: '#3A2E85',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  fab: {
    shadowColor: '#5A3FE0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
};
