import { IAttribute } from '../types/apiTypes/attributes.types';
import axios from "axios"

class AttributesServices {
    private URL = "http://localhost:4000/attributes"

    async getAllAttributes() {
        return await axios.get<IAttribute[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getAttributesById(id: number) {
        return await axios.get<IAttribute[]>(`${this.URL}?attribute_id=${id}`).then(
            ({data}) => data
        )
    }

    async getAttributesByName(name: string) {
        return await axios.get<IAttribute[]>(`${this.URL}?attribute_name=${name}`).then(
            ({data}) => data
        )
    }

    async getAttributesByTypeId(typeId: number) {
        return await axios.get<IAttribute[]>(`${this.URL}?type_id=${typeId}`).then(
            ({data}) => data
        )
    }
}

const attributesServices = new AttributesServices()

export default attributesServices