import { createSlice } from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
    name:'dropdown',
    initialState: {
        show: false,
        id: null
    },
    reducers: {
        setShow(state, action) {
            state.show = action.payload
        },
        setId(state, action) {
            state.id = action.payload
        }
    }
})

export const dropdownAction = dropdownSlice.actions
export default dropdownSlice.reducer