import React from 'react';
import { getLightTheme } from '../theme/light-theme';
import { ThemeProvider } from '@material-ui/core/styles';

export default function MockTheme({ children }: any) {
  const theme = getLightTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
