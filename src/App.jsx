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

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px 0 20px;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0px;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 50px;
  object-fit: contain;
`;

const ThemeButtonWrapper = styled.div`
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    align-self: flex-end;
    width: 100%;
    display: flex;
    justify-content: center;
  }`;

const LogoLink = styled(Link)`
display: block;
`;


function App() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={themes[theme]}>
      <AppContainer>
        <Router>
        <Header>
            <LogoLink to="/">
              <Logo src={logo} alt="Logo" />
            </LogoLink>
            <ThemeButtonWrapper>
              <ThemeToggleButton />
            </ThemeButtonWrapper>
          </Header>
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