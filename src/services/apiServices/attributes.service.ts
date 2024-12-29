import { IAttribute } from '../../types/apiTypes/attributes.types';
import axios from "axios"

class AttributesServices {
    private URL = "http://localhost:4000/attributes"

    async getAllAttributes() {
        try {
            return await axios.get<IAttribute[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getAttributeById(id: number | string) {
        try {
            return await axios.get<IAttribute[]>(`${this.URL}?attribute_id=${id}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getAttributeByName(name: string) {
        try {
            return await axios.get<IAttribute[]>(`${this.URL}?attribute_name=${name}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getAttributesByTypeId(typeId: number | string) {
        try {
            return await axios.get<IAttribute[]>(`${this.URL}?type_id=${typeId}`).then(
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

const attributesServices = new AttributesServices()

export default attributesServices 