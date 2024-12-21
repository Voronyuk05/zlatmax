import producersServices from "@/services/apiServices/producers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducerByName = (name: string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['producer by name', name],
        queryFn: async () => await producersServices.getProducerByName(name),
        select: data => data[0]
    })

    return {data, isLoading}
}