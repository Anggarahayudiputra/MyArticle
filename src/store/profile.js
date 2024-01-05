import { createSlice } from "@reduxjs/toolkit";

const init = {
        isActive: true,
        articles: {
            active: [],
            inActive: [],
        },
        showCheckbox: {
            active: false,
            inActive: false,   
        },
        selected: {
            active: [],
            inActive: [],
        },
        paginate: {
            active: {
                current_page: 1,
                last_page:1,
                total_page: 1,
                next_page_url: null
            },
            inActive: {
                current_page: 1,
                last_page:1,
                total_page: 1,
                next_page_url: null
            },   
        },
    }

const profileSlice = createSlice({
    name:'profile',
    initialState: init,
    reducers: {
        setIsActive: (state) => {
            state.isActive = !state.isActive
        },
        setActiveArticles: (state, action) => {
            state.articles.active = action.payload
        },
        setInActiveArticles: (state, action) => {
            state.articles.inActive = action.payload
        },
        setShowCheckbox: (state, action) => {
            if (action.payload.type === 'active') {
                state.showCheckbox.active = action.payload.value
            }
            if (action.payload.type === 'inActive') {
                state.showCheckbox.inActive = action.payload.value
            }
        },
        setActiveSelected: (state, action) => {
            state.selected.active = action.payload
        },
        setInActiveSelected: (state, action) => {
            state.selected.inActive = action.payload
        },
        setActivePaginate: (state, action) => {
            state.paginate.active = action.payload
        },
        setInActivePaginate: (state, action) => {
            state.paginate.inActive = action.payload
        },
        reset: (state) => {
            state.initialState = init
        }
    }
})

export const profileAction = profileSlice.actions
export default profileSlice.reducer