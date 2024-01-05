import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import articlesReducer from './articles'
import tagsReducer from './tags'
import profileReducer from './profile'
import dropdownReducer from "./dropdown"
import loadingReducer from "./loading"

const store = configureStore({
    reducer: {
        user: userReducer,
        articles: articlesReducer,
        tags: tagsReducer,
        profile: profileReducer,
        dropdown: dropdownReducer,
        loading: loadingReducer,
    }
})

export default store