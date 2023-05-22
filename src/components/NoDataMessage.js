import styled from "styled-components"

const NoDataMessage = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1{
        font-weight: lighter;
        text-align: center;
        font-size: 3rem;
        padding: 20px 0;
    }

    h1 span{
        font-size: 1.5rem;
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 70%;
        border-radius: 1.2rem;
        box-shadow: 10px 4px 30px 0px rgba(84, 185, 217, .3);
    }
`

export default NoDataMessage