
import { redirect, json } from "react-router-dom"
import axios from "../api/axios"

export function getTokenDuration() {
    const expireTokenData = localStorage.getItem('expiration')
    const expireDate = new Date(expireTokenData)
    const now = new Date()
    const duration = expireDate.getTime() - now.getTime()
    return duration
}

export function getToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        return null
    }

    const tokenDuration = getTokenDuration()
    if (tokenDuration < 0) {
        localStorage.removeItem('expiration')
        localStorage.removeItem('token')

        const logout = async () => {
            try {
                const response = await axios.post('/logout', {}, {
                    headers: {
                        Authorization: 'Bearer ' +token
                    }
                })
                console.log(response)
                return 'EXPIRED'

            } catch (err) {
                throw json({message: 'Logout Failed', status: 500})
            }
        }

        logout()
    }

    return token
}

export function checkAuthLoader() {
    const token = getToken();

    if (!token) {
        return redirect('/login');
    }
        
    return null
}