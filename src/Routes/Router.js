import { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import ProtectView from './ProtectView'
import HomePage from '../pages/HomePage'
import EmpresasPage from '../pages/Owners/EmpresasPage'
import AdminPage from '../pages/Owners/AdminsPage'
import UsersPage from '../pages/Owners/UsersPage'
import OwnerPage from '../pages/Owners/OwnerPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfileContext from '../global/ProfileContext'
import VentasPage from '../pages/Admins/VentasPage'
import ArticulosPage from '../pages/Admins/ArticulosPage'

const Router = () => {
    const {user: userInfo} = useContext(ProfileContext.Context)

    if (userInfo === null) {
        return null
    }

    return(
        <Routes>

            {/*//? Owners pages */}
            <Route 
                path='/Empresas'  
                element={
                    <ProtectView 
                        allowedUserType='Owner' 
                        view={<EmpresasPage/>}
                    />
                }
            />

            <Route 
                path='/Administradores'  
                element={
                    <ProtectView 
                        allowedUserType='Owner' 
                        view={<AdminPage/>}
                    />
                }
            />

            <Route 
                path='/Usuarios'  
                element={
                    <ProtectView 
                        allowedUserType='Owner' 
                        view={<UsersPage/>}
                    />
                }
            />

            <Route 
                path='/Owners'  
                element={
                    <ProtectView 
                        allowedUserType='Owner' 
                        view={<OwnerPage/>}
                    />
                }
            />

            {/*//? Admins pages */}
            <Route 
                path='/Ventas'
                element={
                    <ProtectView 
                        allowedUserType={'Admin'}
                        view={<VentasPage/>}
                    />
                }
            />

            <Route 
                path='/Articulos'
                element={
                    <ProtectView 
                        allowedUserType={'Admin'}
                        view={<ArticulosPage/>}
                    />
                }
            />

            {/* Global pages */}
            <Route 
                path='/'  
                element={
                    // lo redirecciona al main page
                    <ProtectView 
                        allowedUserType={userInfo.typeUser+'False'} 
                        notNavBar
                    />
                }
            />

            <Route 
                path='/Login'  
                element={
                    // lo redirecciona al main page
                    <ProtectView 
                        allowedUserType=''
                        view={<LoginPage/>}
                        notNavBar
                    />
                }
            />

            <Route 
                path='/*' 
                element={
                    <ProtectView 
                        allowedUserType={userInfo.typeUser} 
                        view={<NotFoundPage/>}
                        notNavBar
                    />
                }
            />
        </Routes>
    )
}

export default Router