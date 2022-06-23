import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    box-sizing: border-box;
    padding:0;
    margin:0;
  }

  .hover{
    cursor:pointer;
  }

  .hover-underline{
    text-underline-offset:blue;
  }
`;

export default GlobalStyle;