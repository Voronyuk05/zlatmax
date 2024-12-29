import { IAttributesCategory } from '../../types/apiTypes/attributesCategories.types';
import axios from "axios"

class AttributesCategoriesServices {
    private URL = "http://localhost:4000/attributes_categories"

    async getAllAttributesCategories() {
        try {
            return await axios.get<IAttributesCategory[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getAttributesCategoryById(id: number | string) {
        try {
            return await axios.get<IAttributesCategory[]>(`${this.URL}?attribute_id=${id}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getAttributesCategoryByName(name: string) {
        try {
            return await axios.get<IAttributesCategory[]>(`${this.URL}?attribute_name=${name}`).then(
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

const attributesCategoriesServices = new AttributesCategoriesServices()

export default attributesCategoriesServices