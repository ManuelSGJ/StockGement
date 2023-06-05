import { encryptText } from './cryptography'

export const addToLocalStorage = (keyStorage, objValue) => {
    const objEncrypt = {}
    
    Object.keys(objValue).forEach((keyValue) => {
        objEncrypt[keyValue] = encryptText(objValue[keyValue])
    })

    localStorage.setItem(keyStorage, JSON.stringify(objEncrypt))
}

export const getToLocalStorage = (keyStorage, itemKey) => {
    const infoStorage = JSON.parse(localStorage.getItem(keyStorage))
    return infoStorage[itemKey]
}

export const removeToLocalStorage = (keyStorage) => {
    localStorage.removeItem(keyStorage)
}