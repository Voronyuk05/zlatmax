import { IType } from "@/types/apiTypes/types.types"
import axios from "axios"

class TypesServices {
    private URL = "http://localhost:4000/types"

    async getAllTypes() {
        try {
            return await axios.get<IType[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getTypesById(id: number | string) {
        try {
            return await axios.get<IType[]>(`${this.URL}?type_id=${id}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getTypeByName(name: string) {
        try {
            return await axios.get<IType[]>(`${this.URL}?type_name=${name}`).then(
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

const typesServices = new TypesServices()

export default typesServices