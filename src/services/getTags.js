import { json } from "react-router-dom"
import axios from "../api/axios"

const getTags = async (limit) => {
    try {
        const response = await axios.get(`/tags${limit ? `?limit=${limit}` : '' }`)
        return response
    } catch (err) {
        console.log(err)
        if (!err?.response) {
            throw json({ message: err?.message},{status: 500} )
        }
        throw json({ message: err?.response?.statusText},{status: err?.response?.status})
    }
}

export default getTags