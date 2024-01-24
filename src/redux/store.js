import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './features/auth/authSlice'

const preloadedState = {
    userAuth: {
        user: JSON.parse(localStorage.getItem('NoobChessClientUser')) || null
    }
}

export const store = configureStore({
    reducer: {
        userAuth: authSliceReducer,
    },
    preloadedState: preloadedState
})