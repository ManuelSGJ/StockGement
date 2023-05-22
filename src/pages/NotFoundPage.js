import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCloud, FaArrowLeft } from "../images/Icons/IconsFontAwesome";

const NotFound = ({className=""}) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <div>
                <h1>404 {FaCloud}<br/> <span>La página que intentas visitar no existe o no esta disponible.</span> </h1>
                <button 
                    onClick={() => navigate(-1)}
                >
                    {FaArrowLeft} Regresar
                </button>
            </div>
        </div>
    )
}

const NotFoundPage = styled(NotFound)`
    height: 70vh;
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

    button{
        background: none;
        border: none;
        cursor: pointer;
        margin-top: 2rem;
        font-size: 18px;
    }
`

export default NotFoundPage