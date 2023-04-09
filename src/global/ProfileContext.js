import { createContext, useState ,useEffect } from "react"
import {ReactSession} from 'react-client-session'
import { encryptText, decryptText } from '../functions/cryptography'

const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        ReactSession.setStoreType('localStorage')

        const infoLocalStorage = ReactSession.get('user')

        if (infoLocalStorage === undefined) {
            ReactSession.set('user', {
                typeUser: encryptText(''),
                fallBack: encryptText('/Login'),
                navBar: encryptText('')
            })
        }

        const decrypted = {
            fallBack: decryptText(infoLocalStorage.fallBack),
            navBar: decryptText(infoLocalStorage.navBar),
            typeUser: decryptText(infoLocalStorage.typeUser),
        }

        setUser(decrypted)
    }, [])

    const updateSession = (newUSer) => {
        ReactSession.set('user', {
            typeUser: encryptText(newUSer.typeUser),
            fallBack: encryptText(newUSer.fallBack),
            navBar: encryptText(newUSer.navBar),
        })

        setUser(newUSer)
    }

    return (
        <ProfileContext.Provider value={{
            updateSession, 
            user
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default {
    Context: ProfileContext,
    Provider: ProfileProvider,
    Consumer: ProfileContext.Consumer
}