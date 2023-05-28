import { createContext, useState ,useEffect } from "react"
import { encryptText, decryptText } from './cryptography'

const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const infoLocalStorage = localStorage.getItem('user')

        if (!infoLocalStorage) {
            localStorage.setItem('user', JSON.stringify({
                typeUser: encryptText(''),
                fallBack: encryptText('/Login'),
                navBar: encryptText('')
            }))

            setUser({
                fallBack: '/Login',
                navBar: '',
                typeUser: '',
            })
        }else{
            const decrypted = {
                fallBack: decryptText(JSON.parse(infoLocalStorage).fallBack),
                navBar: decryptText(JSON.parse(infoLocalStorage).navBar),
                typeUser: decryptText(JSON.parse(infoLocalStorage).typeUser),
            }    
            setUser(decrypted)
        }

    }, [])

    const updateSession = (newUSer) => {
        localStorage.setItem('user', JSON.stringify({
            typeUser: encryptText(newUSer.typeUser),
            fallBack: encryptText(newUSer.fallBack),
            navBar: encryptText(newUSer.navBar)
        }))

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

const Context = {
    Context: ProfileContext,
    Provider: ProfileProvider,
    Consumer: ProfileContext.Consumer
}

export default Context