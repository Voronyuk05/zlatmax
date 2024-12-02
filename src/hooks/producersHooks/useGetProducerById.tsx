import producersServices from "@/services/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducerById = (id: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['producer by id', id],
        queryFn: async () => await producersServices.getProducerById(id),
        select: data => data[0]
    })

    return {data, isLoading}
}