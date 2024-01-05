import { useDispatch } from "react-redux"
import { userAction } from "../../store/user"
import { json, redirect } from "react-router-dom"
import axios from "../../api/axios"
import { getToken } from "../../utils/Auth"

export default function Logout() {
    const dispatch = useDispatch()
    dispatch(userAction.setUser(null))
}

export async function loader() {
    const token = getToken()
    try {
        const response = await axios.post('/logout', {}, {
            headers: {
                Authorization: 'Bearer ' +token
            }
        })

        console.log(response)
        localStorage.removeItem('expiration')
        localStorage.removeItem('token')
    } catch (err) {
        throw json({message: 'Logut Failed', status: 500})
    }
    return redirect('/')
}