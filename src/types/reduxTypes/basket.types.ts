export interface IBasketState {
    basketItems: IBasketItem
}

export interface IBasketItem {
    [key: number]: {
        product: IBasketProduct
        amount: number
    }
}

export interface IBasketProduct  {
    id: number
    card_img: string
    name: string
    type_id: number
    category_id: number
    status: string
    brand: string
    series: string
    article: string
    producer_id: number
    price: number
    rating: number
    description: string
    imgs: string[]
}

