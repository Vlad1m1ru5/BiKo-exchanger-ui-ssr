import robotoRegular from 'assets/fonts/Roboto-Regular.woff'
import robotoRegular2 from 'assets/fonts/Roboto-Regular.woff2'
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    fonst-weight: 400;
    src: local('Roboto'), 
      local('Roboto-Regular'),
      url(${robotoRegular}) format('woff'),
      url(${robotoRegular2}) format('woff2');
  }

  body {
    background-color: ${({ theme }) => theme.brand.background}; 
    color: ${({ theme }) => theme.brand.color};
    font-family: 'Roboto';
    font-size: 14px;
    line-height: 19px;
    margin: 0;
  }
`

export default GlobalStyles