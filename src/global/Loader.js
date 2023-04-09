import loader from '../images/loaders/Loader.gif'
import styled from 'styled-components'

const LoaderStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        text-align: center;
        font-size: 2rem;
        font-weight: lighter;
    }

    div{
        padding: 20px;
        width: 30%;
        background-color: #ffffff;
        border-radius: 31px;
        text-align: center;
    }

    div img{
        max-width: 400px;
        user-select: none;
        pointer-events: none;
    }
`

const Loader = () => {
    return(
        <LoaderStyled>
            <div>
                <h1>Cargando</h1>
                <img src={loader} alt="loader" />
            </div>
        </LoaderStyled>
    )
}

export default Loader

