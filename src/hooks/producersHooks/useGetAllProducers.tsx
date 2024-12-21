import producersServices from "@/services/apiServices/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducers = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all producers'],
        queryFn: () => producersServices.getAllProducers()
    })

    return {data, isLoading}
}