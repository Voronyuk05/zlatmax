import { IComparisonState } from "@/types/comparison.types";
import { IProduct } from "@/types/apiTypes/products.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IComparisonState = {
    itemsToCompare: {}
}

export const comparisonSlice = createSlice({
    name: 'comparison',
    initialState: initialState,
    reducers: {
        addItemToCompare: (state, {payload}: PayloadAction<IProduct>) => {
            state.itemsToCompare[payload.id] = payload
        },
        deleteItemToCompare: (state, {payload}: PayloadAction<IProduct>) => {
            delete state.itemsToCompare[payload.id]
        }
    } 
})

export const {addItemToCompare, deleteItemToCompare} = comparisonSlice.actions
export const comparisonReducers = comparisonSlice.reducer