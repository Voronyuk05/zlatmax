import attributesCategoriesServices from "@/services/attributesCategories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttributesCategories = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all attributes categories'],
        queryFn: () => attributesCategoriesServices.getAllAttributesCategories()
    })

    return {data, isLoading}
}