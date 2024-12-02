
import { IBasketState } from "@/types/reduxTypes/basket.types";
import { IProduct } from "@/types/apiTypes/products.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBasketState = {
    basketItems: {
    }
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState: initialState,
    reducers: {
        addToBasket: (state, {payload}: PayloadAction<{product: IProduct, amount?: number}>) => {
            if (payload.product)
            state.basketItems[payload.product.id] = {product: payload.product, amount: payload.amount ? payload.amount : 1}
        },
        deleteFromBasket: (state, {payload}: PayloadAction<IProduct>) => {
            delete state.basketItems[payload.id]
        },
        increaseProductAmount: (state, {payload}: PayloadAction<number>) => {
            state.basketItems[payload].amount += 1
        },
        decreaseProductAmount: (state, {payload}: PayloadAction<number>) => {
            state.basketItems[payload].amount -= 1
        }
    }
})

export const {addToBasket, deleteFromBasket, increaseProductAmount} = basketSlice.actions
export const basketReducers = basketSlice.reducer