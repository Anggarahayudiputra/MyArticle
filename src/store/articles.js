import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
    name:'articles',
    initialState: {
        articles: [],
        paginate: {
            current_page: 1,
            last_page:1,
            total_page: 1,
            next_page_url: null
        }

    },
    reducers: {
        setArticles(state, action) {
            state.articles = action.payload
        },
        setPaginate(state, action) {
            state.paginate = action.payload
        }
    }
})

export const articlesAction = articlesSlice.actions
export default articlesSlice.reducer