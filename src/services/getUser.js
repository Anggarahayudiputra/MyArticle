import axios from "../api/axios"
import { json } from "react-router-dom"
import { getToken } from "../utils/Auth"
const getUser = async (name) => {
    try {
        const token = getToken()
        let headers  = {} 
        const isLoggedIn = token && token !== 'EXPIRED'
        if (isLoggedIn) {
            headers = {
                'Authorization' : `Bearer ${token}`
            }
        }
        const response = await axios.get(`/user${name ? `?name=${name}` : ''}`, {
            headers: headers
        })

        return response
    } catch (err) {
        console.log(err)
        if (!err?.response) {
            throw json({ message: err?.message},{status: 500} )
        }
        throw json({ message: err?.response?.statusText},{status: err?.response?.status})

    }
}

export default getUser