import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wonSide: "",
    endgameType: ""
}

export const endgameInfoSlice = createSlice({
    name: 'endgameInfo',
    initialState,
    reducers: {
        addEndgameInfo: (state, action) => {
            state.wonSide = action.payload.wonSide;
            state.endgameType = action.payload.endgameType;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addEndgameInfo } = endgameInfoSlice.actions

export default endgameInfoSlice.reducer