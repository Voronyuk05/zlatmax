import producersServices from "@/services/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducers = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all producers'],
        queryFn: () => producersServices.getAllProducers()
    })

    return {data, isLoading}
}