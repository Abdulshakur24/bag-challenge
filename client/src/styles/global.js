import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

  :root {
      --black: #000000;
      --dark: #b5b5b5;
      --whiteSmoke: #FAFAFA;
      --white: #FFFFFF;
      --gray: #F1F1F1;
      --toastify-color-info: #111;
  }
  [data-theme="dark"] {
      --black: #FFFFFF;
      --dark: #444444;
      --whiteSmoke: #111;
      --white: #0000;
      --gray: #111;
  }

  * { 
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


  html {
      background: var(--whiteSmoke);
      color: var(--black);
      transition: all 250ms ease-in-out;
  }
  
  body {
    font-family: ${(props) => props.theme.fonts};
    font-size: 1rem;
    cursor: default;

  }
  
 .MuiPaper-root {
   max-width: 246px !important;
   width: 100%;
 }
`
