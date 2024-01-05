import { json } from "react-router-dom"
import axios from "../api/axios"
const getArticles = async (search, tag, page) => {
    try {
        const searchValue = search ? `?search=${search}` : null
        const tagValue = tag ? (searchValue ? `&tag=${tag}` : `?tag=${tag}`) : null
        const pageValue = page ? (searchValue || tagValue ? `&page=${page}` : `?page=${page}`) : null
        const query = `${searchValue || ''}${tagValue || ''}${pageValue || ''}`

        const response = await axios.get(`/articles${query}`)
        return response
    } catch (err) {
        console.log('err', err)
        if (!err?.response) {
            throw json({ message: err?.message},{status: 500} )
        }
        throw json({ message: err?.response?.statusText},{status: err?.response?.status} )
    }
}

export default getArticles