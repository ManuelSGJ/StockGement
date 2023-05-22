import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import NavBarOwner from '../components/navBars/NavBarOwner'
import NavBarAdmin from '../components/navBars/NavBarAdmin'
import ProfileContext from '../global/ProfileContext'

const ProtectView = ({view, allowedUserType, notNavBar}) => {
    const {user} = useContext(ProfileContext.Context)
    
    if (!(user.typeUser === allowedUserType)){
        return <Navigate to={user.fallBack}/>
    }

    if (notNavBar) {
        return view
    }

    let NavBarPage;
    switch (user.typeUser) {
        case 'Owner':
            NavBarPage = <NavBarOwner/>
            break
    
        case 'Admin':
            NavBarPage = <NavBarAdmin/>
            break

        case '':
            NavBarPage = <NavBarAdmin/>
            break

        default:
            NavBarPage = <></>
            break;
    }
    
    return (
        <>
            {NavBarPage}
            {view}
        </>
    )
}

export default ProtectView

