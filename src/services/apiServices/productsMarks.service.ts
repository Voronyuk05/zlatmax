import { IProductMark } from "@/types/apiTypes/productsMarks.type"
import { ISearchParametrs } from "@/types/searchParameters.types"
import axios from "axios"

class ProductsMarksServices {
    private URL = "http://localhost:4000/products_marks"

    async getAllProductsMarks() {
        try {
            return await axios.get<IProductMark[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProductMarksByProductId(productId: number | string) {
        try {
            return await axios.get<IProductMark[]>(`${this.URL}?product_id=${productId}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProductMarkById(id: number | string) {
        try {
            return await axios.get<IProductMark[]>(`${this.URL}?product_mark_id=${id}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProductsMarksBySearchParams(searchParams: ISearchParametrs) {
        try {
            let filter: string[] = []
            filter = Object.keys(searchParams).map((key: keyof ISearchParametrs) => {
                return `${key}=${searchParams[key]}&`
            })
            
            return await axios.get<IProductMark[]>(`${this.URL}?${filter.join('').replace(/ /g, '%20')}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProductsMarksByChosenAttributes(attributeExcludeName: string, searchParams: ISearchParametrs) {
        try {
            const chosenAttributesObj: ISearchParametrs = {}
            const chosenAttributes = Object.entries(searchParams).filter((attribute) => attribute[0] !== attributeExcludeName)
            chosenAttributes.forEach((attribute) => {
                chosenAttributesObj[attribute[0]] = attribute[1]
            })
            
            return await this.getProductsMarksBySearchParams(chosenAttributesObj)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Unexpected error')
            }
        }
    }
}

const productsMarksServices = new ProductsMarksServices()

export default productsMarksServices