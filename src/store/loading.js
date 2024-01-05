import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { loadingState: 0 },
    reducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        }
    }
})

export const loadingAction = loadingSlice.actions
export default loadingSlice.reducer