import { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import ProtectView from '../global/ProtectView'
import HomePage from '../pages/HomePage'
import EmpresasPage from '../pages/Owners/EmpresasPage'
import AdminPage from '../pages/Owners/AdminsPage'
import OwnerPage from '../pages/Owners/OwnerPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfileContext from '../global/ProfileContext'

const Router = () => {
    const {user: userInfo} = useContext(ProfileContext.Context)

    if (userInfo === null) {
        return null
    }

    return(
        <Routes>
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
                path='/Owners'  
                element={
                    <ProtectView 
                        allowedUserType='Owner' 
                        view={<OwnerPage/>}
                    />
                }
            />

            <Route 
                path='/'  
                element={
                    <ProtectView 
                        allowedUserType='Admin' 
                        view={<HomePage/>}
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