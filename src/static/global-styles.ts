import robotoRegular from 'assets/fonts/Roboto-Regular.woff'
import robotoRegular2 from 'assets/fonts/Roboto-Regular.woff2'
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
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
    background-color: #fcfcfc; 
    color: #121212;
    font-family:  'Roboto';
    margin: 0;
  }
`

export default GlobalStyles