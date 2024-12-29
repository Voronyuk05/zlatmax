import { ICategory } from "@/types/apiTypes/categories.types"
import axios from "axios"

class CategoriesServices {
    private URL = "http://localhost:4000/categories"

    async getAllCategories() {
        try {
            return await axios.get<ICategory[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getCategoriesById(id: number | string) {
        try {
            return await axios.get<ICategory[]>(`${this.URL}?category_id=${id}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getCategoriesByTypeId(typeId: number | string) {
        try {
            return await axios.get<ICategory[]>(`${this.URL}?type_id=${typeId}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }
    
}

const categoriesServices = new CategoriesServices()

export default categoriesServices