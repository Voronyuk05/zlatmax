import { IProduct } from "@/types/apiTypes/products.types"
import { ISearchParametrs } from "@/types/searchParameters.types"
import axios from "axios"

class ProductsServices {
    private URL = "http://localhost:4000/products"

    async getAllProducts() {
        return await axios.get<IProduct[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getProductById(id: number | string) {
        return await axios.get<IProduct[]>(`${this.URL}?product_id=${id}`).then(
            ({data}) => data
        )
    }

    async getProductsBySearchParams(searchParams: ISearchParametrs) {
        let filter: string[] = []
        filter = Object.keys(searchParams).map((key: keyof ISearchParametrs) => {
            return `${key}=${searchParams[key]}&`
        })
        
        return await axios.get<IProduct[]>(`${this.URL}?${filter.join('').replace(/ /g, '%20')}`).then(
            ({data}) => data
        )
    }

    async getProductsByChosenAttributes(attributeExcludeName: string, searchParams: ISearchParametrs) {
        const chosenAttributesObj: ISearchParametrs = {}
        const chosenAttributes = Object.entries(searchParams).filter((attribute) => attribute[0] !== attributeExcludeName)
        chosenAttributes.forEach((attribute) => {
            chosenAttributesObj[attribute[0]] = attribute[1]
        })
        
        return await this.getProductsBySearchParams(chosenAttributesObj)
    }
    
}

const productsServices = new ProductsServices()

export default productsServices