import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: "",
    description: "",
    img: ""
}

export const globalModalSlice = createSlice({
    name: 'globalModal',
    initialState,
    reducers: {
        setGlobalModal: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.img = action.payload.img !== null ? action.payload.img : ""
        },
    },
})

// Action creators are generated for each case reducer function
export const { setGlobalModal } = globalModalSlice.actions

export default globalModalSlice.reducer