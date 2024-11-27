import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Hot Pink - main brand color
      light: '#FF8DC7',
      dark: '#FF1493',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9370DB', // Medium Purple
      light: '#B19CD9',
      dark: '#7B68EE',
      contrastText: '#FFFFFF',
    },
    accent: {
      pink: {
        light: '#FFC0CB',
        main: '#FF69B4',
        dark: '#FF1493',
      },
      purple: {
        light: '#E6E6FA',
        main: '#9370DB',
        dark: '#663399',
      },
      gold: {
        light: '#FFD700',
        main: '#DAA520',
        dark: '#B8860B',
      }
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      light: '#F0F2F5',
      dark: '#E8EAF6',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#636E72',
      light: '#B2BEC3',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FFA726',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
      dark: '#0288D1',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

// Custom Tailwind classes for our theme colors
export const customColors = {
  primary: {
    50: '#FFF0F7',
    100: '#FFE1EF',
    200: '#FFB8D9',
    300: '#FF8FC4',
    400: '#FF69B4', // main
    500: '#FF1493',
    600: '#DB0C7C',
    700: '#B70966',
    800: '#930650',
    900: '#7A033F',
  },
  secondary: {
    50: '#F5F3FF',
    100: '#EDE9FF',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#9370DB', // main
    500: '#7C3AED',
    600: '#6D28D9',
    700: '#5B21B6',
    800: '#4C1D95',
    900: '#2E1065',
  },
};

// Add these to your tailwind.config.js
export const tailwindTheme = {
  extend: {
    colors: {
      primary: customColors.primary,
      secondary: customColors.secondary,
    },
  },
}; 