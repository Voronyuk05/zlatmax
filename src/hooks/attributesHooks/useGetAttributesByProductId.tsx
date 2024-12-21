import filteredAttributesServices from "@/services/clientServices/filteredAttributes.service"
import { useQuery } from "@tanstack/react-query"

export const useGetAttributesByProductId = (product_id: number | string) => {
    const {data: attributesByProductId, isLoading: isAttributesByProductIdLoading} = useQuery({
        queryKey: ['attributes by product id', product_id],
        queryFn: () => filteredAttributesServices.getAttributesByProductId(product_id)
    })

    return {attributesByProductId, isAttributesByProductIdLoading}
}