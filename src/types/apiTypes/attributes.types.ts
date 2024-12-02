import { IProduct } from "./products.types"

export interface IAttribute {
    type_id: number[],
    attribute_id: number,
    attribute_name: keyof IProduct,
    attribute_items: IAttributeItem[]
}

export interface IAttributeItem {
    attribute_item_id: number,
    attribute_item_name: string
}