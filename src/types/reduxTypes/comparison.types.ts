import { IProduct } from "../apiTypes/products.types";

export interface IComparisonState {
    itemsToCompare: {[key: number]: IProduct}
}