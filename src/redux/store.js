import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './features/auth/authSlice'
import endgameInfoReducer from './features/endgameInfo/endgameInfoSlice'
import globalModalReducer from './features/globalModal/globalModalSlice'

const preloadedState = {
    userAuth: {
        user: JSON.parse(localStorage.getItem('NoobChessClientUser')) || null
    }
}

export const store = configureStore({
    reducer: {
        userAuth: authSliceReducer,
        endgameInfo: endgameInfoReducer,
        globalModal: globalModalReducer
    },
    preloadedState: preloadedState
})