import typesServices from "@/services/apiServices/types.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTypeById = (id: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['type by id', id],
        queryFn: () => typesServices.getTypesById(id),
        select: (data) => data[0]
    })

    return {data, isLoading}
}