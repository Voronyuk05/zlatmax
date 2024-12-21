import filteredProducersServices from "@/services/clientServices/filteredProducers.service"
import { ISearchParametrs } from "@/types/searchParameters.types"
import { useQuery } from "@tanstack/react-query"


export const useGetProducersByAvailableProducts = (searchParams: ISearchParametrs) => {
    const {data: availableProducers, isLoading: isAvailableProducersLoading} = useQuery({
        queryKey: ['available producers', searchParams],
        queryFn: () => filteredProducersServices.getProducersByAvailableProducts(searchParams)
    })

    return {availableProducers, isAvailableProducersLoading}

}