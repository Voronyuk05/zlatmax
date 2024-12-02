import { IType } from "@/types/apiTypes/types.types"
import axios from "axios"

class TypesServices {
    private URL = "http://localhost:4000/types"

    async getAllTypes() {
        return await axios.get<IType[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getTypeById(id: number) {
        return await axios.get<IType[]>(`${this.URL}?type_id=${id}`).then(
            ({data}) => data
        )
    }

    async getTypeByName(name: string) {
        return await axios.get<IType[]>(`${this.URL}?type_name=${name}`).then(
            ({data}) => data
        )
    }
}

const typesServices = new TypesServices()

export default typesServices