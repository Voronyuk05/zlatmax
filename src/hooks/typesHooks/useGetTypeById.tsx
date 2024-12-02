import typesServices from "@/services/types.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTypeById = (id: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['type by id', id],
        queryFn: () => typesServices.getTypeById(id),
        select: (data) => data[0]
    })

    return {data, isLoading}
}