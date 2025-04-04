import React from 'react';
import GlobalStyle from './styles/GlobalStyle/globalStyles';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/theme-context';
import AppRoutes from './routes/AppRoutes';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import themes from './styles/theme';
import AppContainer from './components/AppContainer';
import Button from './components/StylizedButton';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledThemeProvider theme={themes[theme]}>
      <AppContainer>
        <Router>
          <img src="./" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'fixed', zIndex: -1 }} />
          <Button onClick={toggleTheme} style={{ zIndex: 1000, top: '20px', right: '20px' }}>
            Alternar para {theme === 'light' ? 'escuro' : 'claro'}
          </Button>
          <GlobalStyle />
          <AppRoutes />
        </Router>
      </AppContainer>
    </StyledThemeProvider>
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}