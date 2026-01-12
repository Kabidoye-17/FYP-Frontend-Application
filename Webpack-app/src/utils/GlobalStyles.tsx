import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --page-background: #FFFBF7;
    --section-background: #f0e9e2ff;
    --text-primary: #333333ff;
    --text-secondary: #727272ff;
    

    --tan: #E3C18A;
    --white: #FFFFFF;
    --black: #000000;
    --plum: #B24F9F;
    --light-plum: #D47EC3ff;
    --purple: #6945CA;

  }
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }
`;
export default GlobalStyles;
