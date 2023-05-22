import { useState } from 'react'
import styled from 'styled-components'

const Iterable = ({ className, title, description, methods }) => {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => setShowMenu(!showMenu)

    const showMenuStyle = showMenu ? 'iterable-menu active' : 'iterable-menu'

    return (
        <div 
            className={className}
            onMouseLeave={() => setShowMenu(false)}
        >
            <div className='iterabe-title'>
                <h4>{title}</h4>
            </div>
            <div className='iterable-description'>
                <p>{description}</p>
            </div>

            <button 
                className='menu'
                onClick={toggleMenu}
                onMouseEnter={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div 
                className={showMenuStyle}
                onMouseLeave={() => setShowMenu(false)}
            >
                {
                    methods.map((method, index) => (
                        <button
                            key={index}
                            onClick={method.action}
                        >
                            {method.description}
                        </button>
                    ))
                }

                <span></span>
            </div>
        </div>
    )
}

const IterableComponent = styled(Iterable).attrs(props => ({
    title: props.title ? props.title : 'Title component',
    description: props.description ? props.description : 'Description component',
    methods: props.methods ? props.methods : [
        {
            description: 'Udate',
            action: () => { console.log('Updated') }
        },
        {
            description: 'Delete',
            action: () => { console.log('Deleted') }
        }
    ]
})
)`
    position: relative;
    width: 20%;
    min-height: 100px;
    margin:  30px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #FDFDFD;
    box-shadow: 3px 3px 5px 0px rgba(84, 185, 217, 0.49);

    .iterabe-title{
        font-size: 1vw;
        margin-bottom: 5px;
    }

    .iterabe-title h4{
        font-weight: lighter;
    }

    .iterable-description{
        font-size: 14px;
    }

    > button{
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: transparent;
    }

    > button span{
        height: 4px;
        width: 4px;
        margin: 2px 0;
        background-color: #54B9D9;
        border-radius: 50%;
    }

    .iterable-menu{
        position: absolute;
        right: 5%;
        top: -30%;
        min-width: 50px;
        opacity: 0;
        visibility: hidden;
        background: #ffffff;
        border-radius: 5px;
        transition: all .2s ease-in-out; 
        box-shadow: 0px 6px 10px 0px rgb(0, 0, 0, .15);
    }

    .active{
        opacity: 1;
        visibility: visible;
    }

    .iterable-menu button{
        position: relative;
        display: block;
        width: 100%;
        background-color: transparent;
        border: none;
        padding: 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: all .2s ease-in-out;
        z-index: 10;
    }

    .iterable-menu span{
        position: absolute;
        bottom: -5px;
        right: 7px;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background: inherit;
        transform: rotate(45deg);
        z-index: 5;
    }

    .iterable-menu button:hover{
        background: #FDFDFD;
        text-decoration: underline;
    }

`

export default IterableComponent