import { ICategory } from "@/types/apiTypes/categories.types"
import axios from "axios"

class CategoriesServices {
    private URL = "http://localhost:4000/categories"

    async getAllCategories() {
        return await axios.get<ICategory[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getCategoriesById(id: number | string) {
        return await axios.get<ICategory[]>(`${this.URL}?category_id=${id}`).then(
            ({data}) => data
        )
    }

    async getCategoriesByTypeId(typeId: number | string) {
        return await axios.get<ICategory[]>(`${this.URL}?type_id=${typeId}`).then(
            ({data}) => data
        )
    }
    
}

const categoriesServices = new CategoriesServices()

export default categoriesServices