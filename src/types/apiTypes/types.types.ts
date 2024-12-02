import { IProduct } from "./products.types";

export interface IType {
    type_id: number,
    type_name: string,
    type_special_attributes: (keyof IProduct)[]
}