import React from 'react';
import GlobalStyle from './styles/GlobalStyle/globalStyles';
import { HashRouter as Router, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/theme-context';
import AppRoutes from './routes/AppRoutes';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import themes from './styles/theme';
import AppContainer from './components/AppContainer';
import Button from './components/StylizedButton';

const Logo = styled.img`
width: auto;
height: 50px;
object-fit: contain;
position: absolute;
top: 20px;
left: 20px;
z-index: 1;
`;

const LogoLink = styled(Link)`
display: block;
`;


function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledThemeProvider theme={themes[theme]}>
      <AppContainer>
        <Router>
        <LogoLink to="/">
            <Logo src="/pokedex-app/img/logo.png" alt="Logo" />
          </LogoLink>
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