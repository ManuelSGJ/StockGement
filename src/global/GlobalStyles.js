import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100&family=Roboto:wght@100&display=swap');
    *{
        background-color: #FAFAFA;
        color: #3A4F66;
        margin: 0; 
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        outline: none;
    }

    body{
        min-height: 100vh;
    }
`

export default GlobalStyle