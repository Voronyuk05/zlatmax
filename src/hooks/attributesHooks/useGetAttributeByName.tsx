import attributesServices from "@/services/apiServices/attributes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributeByName = (name: string) => {
    const {data: attributeByNameData, isLoading: isAttributeByNameLoading} = useQuery({
        queryKey: ['attributes by name', name],
        queryFn: () => attributesServices.getAttributeByName(name),
        select: data => data[0]
    })

    return {attributeByNameData, isAttributeByNameLoading}
}