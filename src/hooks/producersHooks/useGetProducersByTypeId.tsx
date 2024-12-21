import producersServices from "@/services/apiServices/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducerByTypeId = (typeId: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['producer by type id', typeId],
        queryFn: async () => await producersServices.getProducersByTypeId(typeId),
        select: data => data
    })

    return {data, isLoading}
}