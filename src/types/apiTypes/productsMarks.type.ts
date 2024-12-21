export interface IProductMark {
    product_mark_id: number,
    product_id: number,
    card_img: string,
    status: string,
    article: string,
    attributes_categories?: number[]
    attributes?: IProductAttribute
    price: number
    rating: number
    published_at: string
    imgs: string[],
}

export interface IProductAttribute {
    [key: string]:  string | number
}
