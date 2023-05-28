import { useState } from 'react'
import styled from 'styled-components'

const MenuList = ({items, size}) => {

    const [showMenu, setShowMenu] = useState(false)

    const toggleShow = () => setShowMenu(!showMenu)

    return(
        <div 
            style={{position: 'relative'}} 
        >
            <ButtonActive 
                onClick={toggleShow}
                onMouseEnter={() => setShowMenu(true)}
            >
                <span></span>
                <span></span>
                <span></span>
            </ButtonActive>

            <DivMenu 
                visible={showMenu} 
                size={size}
                onMouseLeave={() => setShowMenu(false)}
            >
                {
                    items.map(({description, action}, index) => (
                        <button key={index} onClick={action}>
                            {description}
                        </button>
                    ))
                }
                <span></span>
            </DivMenu>
        </div>
    )
}


const DivMenu = styled.div`
    width: ${({size}) => {
        switch (size) {
            case 'normal': return '100px'
            case 'large': return '200px'
            default: return '50px'
        }
    }};

    position: absolute;
    right: 15%;
    top: 100%;
    opacity: ${props => props.visible ? '1' : '0'};
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    border-radius: 5px;
    transition: all .2s ease-in-out; 
    box-shadow: 0px 6px 10px 0px rgb(0, 0, 0, .15);

    button{
        position: relative;
        font-size: 15px;
        width: 100%;
        background-color: transparent;
        border: none;
        padding: 4px;
        cursor: pointer;
        border-radius: 5px;
        transition: all .2s ease-in-out;
        z-index: 10;
    }

    span{
        position: absolute;
        top: -5px;
        right: 5px;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background: inherit;
        transform: rotate(45deg);
        z-index: 5;
    }

    button:hover{
        background-color: #f0f0f0;
    }
`

const ButtonActive = styled.button`
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;

    span{
        height: 4px;
        width: 4px;
        margin: 2px 0;
        background-color: #54B9D9;
        border-radius: 50%;
    }
`

export default MenuList
