import { FaXmark } from "../images/Icons/IconsFontAwesome";
import styled from "styled-components";

const ContentModal = styled.div`
    position: relative;
    padding: 2rem;
    min-height: 45vh;
    display: flex;
    flex-direction: ${({horientation}) => horientation === 'vertical' ? 'colmun' : 'row'};
    align-items: flex-start;
    flex-wrap: ${({horientation}) => horientation === 'vertical' ? 'nowrap' : 'wrap'};
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

const ModalContainer = styled.div`
    width: 45%;
    min-width: 700px;
    background-color: #fdfdfd;
    border-radius: 31px;
    box-shadow: 3px 3px 5px 0px rgba(84, 185, 217, 0.49);
    transition: all .5s ease-in-out;
    overflow: hidden;
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

const ModalOption = ({children: ch, titleModal, active, method, setClose, horientation='vertical'}) => {
    return(
        <Overlay active={active}>
            <ModalContainer active={active}>
                <TitleModal>
                    <h1>{titleModal}</h1>

                    <button onClick={() => method(setClose)}>
                        {FaXmark}
                    </button>
                </TitleModal>

                <ContentModal horientation={horientation}>
                    {ch}
                </ContentModal>
            </ModalContainer>
        </Overlay>
    )
}

export default ModalOption;