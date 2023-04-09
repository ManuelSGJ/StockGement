import CryptoJS from 'crypto-js'

export const encryptText = (text) => {
    return CryptoJS.AES.encrypt(text, 'gealinda12345').toString()
}

export const decryptText = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, 'gealinda12345')
    return bytes.toString(CryptoJS.enc.Utf8)
}
