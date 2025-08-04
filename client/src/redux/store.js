import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './user/userSlice'

export const store = configureStore({
    reducers: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})