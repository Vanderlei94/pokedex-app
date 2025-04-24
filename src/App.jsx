import React from 'react';
import GlobalStyle from './styles/GlobalStyle/globalStyles';
import { HashRouter as Router, Link } from 'react-router-dom';
import ThemeToggleButton from './components/theme-toggler';
import AppRoutes from './routes';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme, ThemeProvider } from './contexts/theme-context';
import themes from './styles/theme';
import AppContainer from './components/app-container';
import logo from './assets/logo.png';

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
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={themes[theme]}>
      <AppContainer>
        <Router>
        <LogoLink to="/">
        <Logo src={logo} alt="Logo" />
          </LogoLink>
          <ThemeToggleButton />
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