import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IBasketItem } from "@/types/reduxTypes/basket.types"

export const selectLikedItems = (state: RootState) => state.liked.likedItems
export const selectLikedProducts = createSelector(
    [selectLikedItems],
    (items) => {
        const products = Object.values(items)
        return products
    }
)

export const selectBasketItems = (state: RootState) => state.basket.basketItems
export const selectBasketProducts = createSelector(
    [selectBasketItems],
    (items: IBasketItem) => {
        const products = Object.values(items).map(({product}) => product)
        return products
    }
)

export const selectBasketItemsSum = createSelector(
    [selectBasketItems], 
    (items: IBasketItem) => {
        const totalSum = Object.values(items).reduce((sum, item) => sum + item.product.price, 0);
        return totalSum
    }
)

export const selectComparisonItems = (state: RootState) => state.comparison.itemsToCompare

export const selectComparisonProducts = createSelector(
    [selectComparisonItems],
    (items) => {
        const products = Object.values(items)
        return products
    }
)