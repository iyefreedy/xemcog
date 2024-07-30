import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers['X-CSRF-TOKEN'] = getCookie('csrf_access_token')
    console.log(getCookie('csrf_access_token'))

    return config
})

axiosInstance.interceptors.response.use(function (config) {
    // config.headers['X-CSRF-TOKEN'] = getCookie('csrf_access_token')
    // window.location.href = 'http://localhost:5173/login'

    return config
})

function getCookie(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export function dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    //New Code
    return new Blob([ab], { type: mimeString })
}
