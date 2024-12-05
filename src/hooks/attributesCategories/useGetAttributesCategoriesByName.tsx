import attributesCategoriesServices from "@/services/attributesCategories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributesCategoryByName = (name: string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['attributes category by name', name],
        queryFn: () => attributesCategoriesServices.getAttributesCategoryByName(name),
        select: data => data[0]
    })

    return {data, isLoading}
}