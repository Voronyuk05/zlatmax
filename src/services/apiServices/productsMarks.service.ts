import { IProductMark } from "@/types/apiTypes/productsMarks.type"
import { ISearchParametrs } from "@/types/searchParameters.types"
import axios from "axios"

class ProductsMarksServices {
    private URL = "http://localhost:4000/products_marks"

    async getAllProductsMarks() {
        return await axios.get<IProductMark[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getProductMarksByProductId(productId: number | string) {
        return await axios.get<IProductMark[]>(`${this.URL}?product_id=${productId}`).then(
            ({data}) => data
        )
    }

    async getProductMarkById(id: number | string) {
        return await axios.get<IProductMark[]>(`${this.URL}?product_mark_id=${id}`).then(
            ({data}) => data
        )
    }

    async getProductsMarksBySearchParams(searchParams: ISearchParametrs) {
        let filter: string[] = []
        filter = Object.keys(searchParams).map((key: keyof ISearchParametrs) => {
            return `${key}=${searchParams[key]}&`
        })
        
        return await axios.get<IProductMark[]>(`${this.URL}?${filter.join('').replace(/ /g, '%20')}`).then(
            ({data}) => data
        )
    }

    async getProductsMarksByChosenAttributes(attributeExcludeName: string, searchParams: ISearchParametrs) {
        const chosenAttributesObj: ISearchParametrs = {}
        const chosenAttributes = Object.entries(searchParams).filter((attribute) => attribute[0] !== attributeExcludeName)
        chosenAttributes.forEach((attribute) => {
            chosenAttributesObj[attribute[0]] = attribute[1]
        })
        
        return await this.getProductsMarksBySearchParams(chosenAttributesObj)
    }
}

const productsMarksServices = new ProductsMarksServices()

export default productsMarksServices