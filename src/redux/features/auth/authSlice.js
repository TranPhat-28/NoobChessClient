import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        addUserAuth: (state, action) => {
            state.user = action.payload
        },
        removeUserAuth: (state) => {
            state.user = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUserAuth, removeUserAuth } = authSlice.actions

export default authSlice.reducer