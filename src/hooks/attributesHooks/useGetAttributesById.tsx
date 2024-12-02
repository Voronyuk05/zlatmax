import attributesServices from "@/services/attributes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributesById = (id: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['attributes by id', id],
        queryFn: () => attributesServices.getAttributesById(id),
        select: data => data[0]
    })

    return {data, isLoading}
}