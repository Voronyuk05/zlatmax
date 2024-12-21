import { IProducer } from "@/types/apiTypes/producers.types"
import axios from "axios"

class ProducersServices {
    private URL = "http://localhost:4000/producers"

    async getAllProducers() {
        return await axios.get<IProducer[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getProducerById(id: number | string) {
        return await axios.get<IProducer[]>(`${this.URL}?producer_id=${id}`).then(
            ({data}) => data
        )
    }

    async getProducerByName(name: string) {
        return await axios.get<IProducer[]>(`${this.URL}?producer_name=${name}`).then(
            ({data}) => data
        )
    }

    async getProducersByTypeId(typeId: number | string) {
        return await axios.get<IProducer[]>(`${this.URL}?type_id=${typeId}`).then(
            ({data}) => data
        )
    }
}

const producersServices = new ProducersServices()

export default producersServices