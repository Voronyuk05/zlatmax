import { IProducer } from "@/types/apiTypes/producers.types"
import axios from "axios"

class ProducersServices {
    private URL = "http://localhost:4000/producers"

    async getAllProducers() {
        try {
            return await axios.get<IProducer[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProducerById(id: number | string) {
        try {
            return await axios.get<IProducer[]>(`${this.URL}?producer_id=${id}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProducerByName(name: string) {
        try {
            return await axios.get<IProducer[]>(`${this.URL}?producer_name=${name}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getProducersByTypeId(typeId: number | string) {
        try {
            return await axios.get<IProducer[]>(`${this.URL}?type_id=${typeId}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Unexpected error')
            }
        }
    }
}

const producersServices = new ProducersServices()

export default producersServices