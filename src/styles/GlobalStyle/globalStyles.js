import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;
  }

  #root {
  text-align: center;
  }
`;

export default GlobalStyle;