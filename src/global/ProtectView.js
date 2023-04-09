import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import NavBarOwner from '../components/navBars/NavBarOwner'
import ProfileContext from '../global/ProfileContext'

const ProtectView = ({view, allowedUserType, notNavBar}) => {
    const {user} = useContext(ProfileContext.Context)
    
    if (!(user.typeUser === allowedUserType)){
        return <Navigate to={user.fallBack}/>
    }

    if (notNavBar) {
        return view
    }

    let NavBarPage = NavBarOwner
    return (
        <>
            <NavBarPage/>
            {view}
        </>
    )
}

export default ProtectView

