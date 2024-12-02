import { IProduct } from "../apiTypes/products.types";

export interface ILikedState {
    likedItems: {[key: number]: IProduct}
}