import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {tags: []},
    reducers: {
        setTags(state, action) {
            state.tags = action.payload
        }
    }
})

export const tagsAction = tagsSlice.actions
export default tagsSlice.reducer