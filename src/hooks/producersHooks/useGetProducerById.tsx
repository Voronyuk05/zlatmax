import producersServices from "@/services/apiServices/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducerById = (id: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['producer by id', id],
        queryFn: async () => await producersServices.getProducerById(id),
        select: data => data[0]
    })

    return {data, isLoading}
}