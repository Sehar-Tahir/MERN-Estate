import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  userReducer from './user/userSlice'
import {persistReducer, persistStore} from 'redux-persist'
import {storage} from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
    user: userReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducers: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export const persistor = persistStore(store)

//persist is basically used to maintain the redux states after refreshing page