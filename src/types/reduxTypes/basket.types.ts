export interface IBasketState {
    basketItems: IBasketItem
}

export interface IBasketItem {
    [key: number]: {
        product: IBasketProductMark
        amount: number
    }
}

export interface IBasketProductMark {
    product_mark_id: number,
    product_id: number,
    card_img: string,
    status: string,
    article: string,
    attributes_categories?: number[]
    attributes?: IProductAttribute
    price: number
    rating: number
    imgs: string[],
}

export interface IProductAttribute {
    [key: string]:  string | number
}
