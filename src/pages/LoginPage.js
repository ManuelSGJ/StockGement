import { Link } from 'react-router-dom'
import { useContext} from 'react'
import { addToLocalStorage } from '../global/manageLocalStorage'
import ProfileContext from '../global/ProfileContext'
import styled from 'styled-components'
import InputForm from '../components/inputs/InputForm'
import Swal from 'sweetalert2'

const Login = ({className}) => {

    const {updateSession} = useContext(ProfileContext.Context)

    const loginUser = async (event) => {
        event.preventDefault()
        const [user, password] = event.target
        let url = 'http://localhost:3001/owners/login'
        
        if(!(isNaN(user.value))) {
            url = 'http://localhost:3001/admins/login'
        }

        const request = await fetch(url, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: user.value, 
                password: password.value
            })
        })
        
        const {infoProcess, dataProcess, error} = await request.json()

        if (infoProcess === 'error') {
            let errorDescription = error;

            if (error === 'userNotFound')  errorDescription = 'Usuario no encontrado'
            if (error === 'incorrectPassword')  errorDescription = 'Contraseña incorrecta. Intente nuevamente'

            Swal.fire(
                'Opss...!',
                errorDescription,
                'error'
            )
        }

        if (infoProcess === 'success') {
            const {userInfo} = dataProcess
            let user = {}

            if (userInfo.typeUser === 'Owner') {
                user = {
                    typeUser: 'Owner',
                    fallBack: '/Empresas',
                    navBar: 'owner'
                }
            }

            if (userInfo.typeUser === 'Admin') {
                addToLocalStorage('userInfo', {
                    empresa: userInfo.Admin_nit_empresa_FK
                })

                user = {
                    typeUser: 'Admin',
                    fallBack: '/Ventas',
                    navBar: 'admin'
                }
            }

            if (userInfo.typeUser === 'User') {
                user = {
                    typeUser: 'User',
                    fallBack: '/Index',
                    navBar: 'user'
                }
            }
            
            updateSession(user)
        }
    }   

    return (
        <div className={className}>
            <form
                onSubmit={loginUser}
                autoComplete="off"
            >
                <div className="box-input">
                    <InputForm
                        type='text'
                        text='Usuario'
                        fullInput
                    />

                    <InputForm
                        type='password'
                        text='Contraseña'
                        fullInput
                    />

                    <Link className="link-clave" to='/RecuperacionClave'>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <div className="box-submit">
                    <button>
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </div>
    )
}

const LoginPage = styled(Login)`

    width: 23%;
    min-width: 400px;
    height: 50vh;
    min-height: 50vh;
    background: #FDFDFD;
    padding: 20px;
    box-shadow: 3px 3px 10px 0px rgba(84, 185, 217, 0.4);
    position: fixed;
    top: 50%;
    left: 10%;
    transform: translate(-10%, -50%);


    form{
        background-color: transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }
    
    .box-input{
        padding: 50px 0;
        height: 70%;
        display: flex;
        flex-direction: column;
    }

    .box-input > div{
        width: 80%;
        margin: 2rem auto;
    }

    .box-submit{
        text-align: center;
        background-color: transparent;
    }

    .box-submit button{
        cursor: pointer;
        width: 40%;
        min-width: 200px;
        font-size: 1.3rem;
        background: #fff;
        outline: none;
        border: none;
        padding: 10px 20px;
        border-radius: 3px;
        transition: all 0.3s ease-in-out;
        box-shadow: 1px 1px 4px 0px rgba(84, 185, 217, 0.4);
    }

    .link-clave{
        font-size: 13px;
        width: 80%;
        margin: 1em auto;
        text-decoration: none;
    }

    a:hover{
        text-decoration: underline;
    }

    button:hover{
        background-color: #F4F4F4;
    }
`

export default LoginPage