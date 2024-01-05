import { json } from "react-router-dom"
import axiosPrivate from "../api/axios"
const getWritterArticles = async (status, id, page) => {
    try {
        const response = await axiosPrivate.get(`/writter-articles?status=${status}&writter_id=${id}&page=${page || 1}`)
        return response
    } catch (err) {
        console.log('err', err)
        if (!err?.response) {
            throw json({ message: err?.message},{status: 500} )
        }
        throw json({ message: err?.response?.statusText},{status: err?.response?.status})
    }
}

export default getWritterArticles