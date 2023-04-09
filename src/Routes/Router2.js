import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Protected from '../global/Protected'
import HomePage from '../pages/HomePage'
import EmpresasPage from '../pages/EmpresasPage'
import OwnerPage from '../pages/OwnerPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfileContext from '../global/ProfileContext'

const Router = () => {
    const { user: userInfo } = useContext(ProfileContext.Context)

    if (userInfo === null) {
        return null
    }

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Protected
                        allowedUserType='Owner'
                        fallBack='/Login'
                        component={<HomePage />}
                    />
                }
            />

            <Route
                path='/Empresas'
                element={
                    <Protected
                        allowedUserType='Owner'
                        fallBack='/Login'
                        component={<EmpresasPage />}
                    />
                }
            />

            <Route
                path='/Owners'
                element={
                    <Protected
                        allowedUserType='Owner'
                        fallBack='/Login'
                        component={<OwnerPage />}
                    />
                }
            />

            <Route
                path='/Login'
                element={
                    <Protected
                        fallBack={userInfo.altPath}//* '/'
                        component={<LoginPage />}
                    />
                }
            />

            <Route
                path='/*'
                element={
                    <Protected
                        component={<NotFoundPage />}
                    />
                }
            />
        </Routes>
    )
}

export default Router