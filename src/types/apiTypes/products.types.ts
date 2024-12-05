
export interface IProduct  {
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
    attributes_categories?: number[]
    attributes?: IProductAttribute
    price: number
    rating: number
    description: string
    imgs: string[],
}

export interface IProductAttribute {
    [key: string]:  string | number | number[]
}

