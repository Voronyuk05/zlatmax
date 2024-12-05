

export interface IAttribute {
    type_id: number[],
    attribute_id: number,
    attribute_name: string,
    attribute_items?: IAttributeItem[]
}

export interface IAttributeItem {
    attribute_item_id: number,
    attribute_item_name: string
}