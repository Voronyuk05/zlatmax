import producersServices from "@/services/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducerByTypeId = (typeId: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['producer by type id', typeId],
        queryFn: async () => await producersServices.getProducersByTypeId(typeId),
        select: data => data
    })

    return {data, isLoading}
}