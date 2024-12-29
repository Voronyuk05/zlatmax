import { ISearchParametrs } from '@/types/searchParameters.types';
import productsMarksServices from '../apiServices/productsMarks.service';
import productsServices from '../apiServices/products.service';
import producersServices from '../apiServices/producers.service';


class FilteredProducersServices {

    async getProducersByAvailableProducts(searchParams: ISearchParametrs) {
        const producersData = await producersServices.getAllProducers()

            const availableProducersPromise = producersData.map(async ({type_id, producer_id, producer_name, producer_description, producer_img}) => {
                const filteredProducts = await productsServices.getProductsByChosenAttributes('producer_id', searchParams)
                const filteredPorudctsMarks = await productsMarksServices.getProductsMarksByChosenAttributes('producer_id', searchParams)
                
                const availableProducts = filteredProducts.filter(({product_id}) => {
                    return filteredPorudctsMarks.some(({product_id: product_mark_id}) => product_id === product_mark_id)
                })
                
                const isProducerAvailable = availableProducts.some(({ producer_id: product_producer_id }) => product_producer_id === producer_id)
    
                if (isProducerAvailable) {
                    return {
                        type_id: type_id,
                        producer_id: producer_id,
                        producer_name: producer_name,
                        producer_description: producer_description,
                        producer_img: producer_img
                    }
                    
                }
            })
    
            const availableProducers = (await Promise.all(availableProducersPromise)).filter(item => item !== undefined);
    
            return availableProducers
    }
}

const filteredProducersServices = new FilteredProducersServices()

export default filteredProducersServices