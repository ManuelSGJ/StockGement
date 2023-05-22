import {NavLink, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { removeToLocalStorage } from '../../global/manageLocalStorage'
import ProfileContext from '../../global/ProfileContext'
import styled from 'styled-components'

const NavBar = ({className}) => {

    const appContext = useContext(ProfileContext.Context)
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault()

        removeToLocalStorage('userInfo')
        appContext.updateSession({
            typeUser: '',
            fallBack: '/Login',
            navBar: ''
        })
        navigate('/Login')
    }

    return(
        <div className={className}>
            <div className='box-link'>
                <ul>
                    <li>
                        <NavLink
                            to={'/Ventas'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Ventas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/Articulos'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Articulos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/Compras'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Compras
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/Proveedores'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Proveedores
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/Clientes'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Clientes
                        </NavLink>
                    </li>              
                    <li>
                        <NavLink
                            to={'/Historiales'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Historiales
                        </NavLink>
                    </li>  
                    <li>
                        <NavLink
                            to={'/Configuraciones'}
                            className={({ isActive }) =>
                                isActive ? 'link-selected' : undefined
                            }
                        >
                            Configuraciones
                        </NavLink>
                    </li>  
                </ul>
            </div>

            <div className='box-session-link'>
                <button onClick={logout}>Cerrar sesión</button>
            </div>
        </div>
    )
}

const NavBarAdmin = styled(NavBar)`
    /*! componente father styles */
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding:  5px 20px;
    box-shadow: 0px 4px 4px 0px rgba(84, 185, 217, .2);
    z-index: 9;

    .box-link{
        width: 80%;
    }

    .box-session-link{
        width: 20%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    button{
        background-color: transparent;
        border: none;
        font-size: 16px;
        font-weight: lighter;
        cursor: pointer;
    }

    button:hover{
        text-decoration: underline;
    }

    ul{
        list-style: none;
        display: flex;
        align-items: center;
    }

    ul li{
        margin: 1rem 1.3rem;
    }

    a{
        text-decoration: none;
    }

    a:hover{
        color: #0EA8B0;
    }

    .link-selected{
        font-size: 15px;
        color: #435159;
    }
`

export default NavBarAdmin