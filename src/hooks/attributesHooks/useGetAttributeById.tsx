import attributesServices from "@/services/apiServices/attributes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributeById = (id: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['attributes by id', id],
        queryFn: () => attributesServices.getAttributeById(id),
        select: data => data[0]
    })

    return {data, isLoading}
}