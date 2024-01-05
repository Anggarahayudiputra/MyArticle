import { json } from "react-router-dom"
import axios from "../api/axios"
const getArticle = async (title, id) => {
    try {
        const query = title ? `?title=${title}` : `?id=${id}`
        const response = await axios.get(`/article${query}`)
        return response
    } catch (err) {
        console.log('err', err)
        if (!err?.response) {
            throw json({ message: err?.message},{status: 500} )
        }
        throw json({ message: err?.response?.statusText},{status: err?.response?.status})
    }
}

export default getArticle