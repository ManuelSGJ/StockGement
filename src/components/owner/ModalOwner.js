import { FaXmark } from "../Icons/IconsFontAwesome";
import styled from "styled-components";

const ContentModal = styled.div`
    position: relative;
    padding: 2rem;
    min-height: 45vh;

    input[type='submit']{
        cursor: pointer;
        position: absolute;
        bottom: 4%;
        right: 4%;
        border: none;
        border-radius: 7px;
        padding: 10px 20px;
        color: #ffffff;
        background-color: #54B9D9;
    }

    input[type='submit']:hover{
        background-color: #4699B3;
    }
`

const TitleModal = styled.div`
    position: relative;
    width: 98%;
    margin: 0 auto;
    padding: 1.5rem 1rem 1rem 1rem;
    border-bottom: 1px solid #54B9D9;

    h1{
        font-weight: lighter;
    }

    button{
        position: absolute;
        top: 15px;
        right: 20px;
        cursor: pointer;
        background-color: #ffffff;
        border: none;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        border-radius: 50%;
        box-shadow: 4px 4px 10px 0px rgba(84, 185, 217, 0.20);
    }
`

const Modal = styled.div`
    width: 45%;
    background-color: #fdfdfd;
    border-radius: 31px;
    box-shadow: 3px 3px 5px 0px rgba(84, 185, 217, 0.49);
    transition: all .5s ease-in-out;

    transform: ${props => props.active ? 'translateY(-5vw)': 'translateY(-15vw)'};
`

const Overlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgb(192 200 207 / 69%);
    transition: all .3s ease-in-out;


    visibility: ${props => props.active ? 'visible':'hidden'};
    opacity: ${props => props.active ? 1 : 0};
    
`

const ModalOwner = ({children: ch, titleModal, active, formModal, method, setClose}) => {
    return(
        <Overlay active={active}>
            <Modal active={active}>
                <TitleModal>
                    <h1>{titleModal}</h1>

                    <button onClick={() => method(setClose, formModal)}>
                        {FaXmark}
                    </button>
                </TitleModal>

                <ContentModal>
                    {ch}
                </ContentModal>
            </Modal>
        </Overlay>
    )
}

export default ModalOwner;