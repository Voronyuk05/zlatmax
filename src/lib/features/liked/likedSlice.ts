import { ILikedState } from "@/types/liked.types";
import { IProduct } from "@/types/apiTypes/products.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILikedState = {
    likedItems: {}
}

export const likedSlice = createSlice({
    name: 'liked',
    initialState: initialState,
    reducers: {
        addToLiked: (state, {payload}: PayloadAction<IProduct>) => {
            state.likedItems[payload.id] = payload
        },
        deleteFromLiked: (state, {payload}: PayloadAction<IProduct>) => {
            delete state.likedItems[payload.id]
        }
    }
})

export const {addToLiked, deleteFromLiked} = likedSlice.actions
export const likedReducers = likedSlice.reducer