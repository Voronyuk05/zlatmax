import attributesServices from "@/services/apiServices/attributes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributesByTypeId = (typeId: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['attributes by id', typeId],
        queryFn: () => attributesServices.getAttributesByTypeId(typeId),
    })

    return {data, isLoading}
}