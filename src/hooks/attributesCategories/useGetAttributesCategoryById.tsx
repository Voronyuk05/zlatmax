import attributesCategoriesServices from "@/services/attributesCategories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributesCategoryById = (id: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['attributes category by id', id],
        queryFn: () => attributesCategoriesServices.getAttributesCategoryById(id),
        select: data => data[0]
    })

    return {data, isLoading}
}