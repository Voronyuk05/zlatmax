import { IAttributesCategory } from '../../types/apiTypes/attributesCategories.types';
import axios from "axios"

class AttributesCategoriesServices {
    private URL = "http://localhost:4000/attributes_categories"

    async getAllAttributesCategories() {
        return await axios.get<IAttributesCategory[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getAttributesCategoryById(id: number | string) {
        return await axios.get<IAttributesCategory[]>(`${this.URL}?attribute_id=${id}`).then(
            ({data}) => data
        )
    }

    async getAttributesCategoryByName(name: string) {
        return await axios.get<IAttributesCategory[]>(`${this.URL}?attribute_name=${name}`).then(
            ({data}) => data
        )
    }
}

const attributesCategoriesServices = new AttributesCategoriesServices()

export default attributesCategoriesServices