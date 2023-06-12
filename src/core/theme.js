//*! theme.js v1.0 June 1 2023

import { DefaultTheme } from 'react-native-paper'

// colour theme hex codes
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#4D7C91',
    secondary: '#493003',
    error: '#f13a59',
  },
}
